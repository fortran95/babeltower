function aes_encrypt(plaintext,key){return Aes.Ctr.encrypt(plaintext, key, 256);}
function aes_decrypt(ciphertext,key){return Aes.Ctr.decrypt(ciphertext, key, 256);}

var messageCenter = {};

messageCenter.sendingQueue = [];
messageCenter.sentQueue = [];
messageCenter.IDCounter = 0;

messageCenter.confirmSent = function(msgid){
    for(i=0;i<messageCenter.sentQueue.length;i++)
        if(messageCenter.sentQueue[i].id == msgid){
            delete messageCenter.sentQueue[i];
            messageCenter.sentQueue = messageCenter.sentQueue.slice(0,i).concat(messageCenter.sentQueue.slice(i+1,messageCenter.sentQueue.length));
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
            messageCenter.confirmSent(message.id);
        },'json');
    }
    return messageCenter.sendingQueue.length;
}
