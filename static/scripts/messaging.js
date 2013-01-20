function aes_encrypt(plaintext,key){return Aes.Ctr.encrypt(plaintext, key, 256);}
function aes_decrypt(ciphertext,key){return Aes.Ctr.decrypt(ciphertext, key, 256);}

var messageCenter = {};

messageCenter.sendingQueue = [];
messageCenter.sentQueue = [];
messageCenter.IDCounter = 0;
messageCenter.pullFailCount = 0;

messageCenter.confirmSent = function(msgid){
    for(i=0;i<messageCenter.sentQueue.length;i++)
        if(messageCenter.sentQueue[i].id == msgid){
            delete messageCenter.sentQueue[i];
            messageCenter.sentQueue = messageCenter.sentQueue.slice(0,i).concat(messageCenter.sentQueue.slice(i+1,messageCenter.sentQueue.length));
            return;
        }
}
messageCenter.confirmDead = function(msgid){
    for(i=0;i<messageCenter.sentQueue.length;i++)
        if(messageCenter.sentQueue[i].id == msgid){
            messageCenter.sentQueue[i].dead = true;
            return;
        }
}

messageCenter.querySent = function(msgid){
    for(i=0;i<messageCenter.sentQueue;i++)
        if(messageCenter.sentQueue[i].id == msgid)
            return false;
    return true;
}

messageCenter.push = function(receiver,message){
    var myID = messageCenter.IDCounter++;
    messageCenter.sendingQueue.push({        
        'receiver': receiver,
        'text': message,
        'id': myID,
        'dead': false,
    })
    return myID;
}

messageCenter.pop = function(){
    var message = messageCenter.sendingQueue.shift();
    if(message != undefined){
        var ciphertext = aes_encrypt(message.text,secret);
        var hmac = (new jsSHA(message.receiver + ciphertext, "TEXT")).getHMAC(secret,"TEXT","SHA-1","HEX");

        messageCenter.sentQueue.push(message);
        $.post('push.php',{
            'token': token,
            'ciphertext': ciphertext,
            'receiver': message.receiver,
            'check': hmac,
        },function(j){
            if(j.type == 'success')
                if(j.data.check == hmac){
                    messageCenter.confirmSent(message.id);
                    return;
                }
            messageCenter.confirmDead(message.id);
        },'json');
    }
    return messageCenter.sendingQueue.length;
}

messageCenter.pull = function(){
    $.post('pull.php', {'token':token}, messageCenter.pullHandler, 'json');
}
messageCenter.pullHandler = function(j){
    if(j.type != 'success'){
        if(j.error != null){
            switch(j.error.code){
                case(-1):
                    tokenValid = false;
                    loginSetInfo('会话过期，或被服务器中止。','error');
                    break;
                default:
                    break;
            }
        }
    } else {
        if(j.data.pulled != null){
            $.each(j.data.pulled, function(i,jmsg){
                var checkstr = new jsSHA(jmsg.send + jmsg.time + jmsg.text, "TEXT").getHMAC(secret,"TEXT","SHA-1","HEX");
                if( checkstr != jmsg.check ){
                    alert('one message cannot pass check and dropped.');
                    return;
                }
                if( d = new dialog(jmsg.send) ){
                    message = aes_decrypt(jmsg.text, secret);
                    d.addDisplay({'text':message,'time':jmsg.time});
                } // TODO for Foreigners, add solution here.
            });
        }
    }
    messageCenter.pullFailCount = 0;
}
