function aes_encrypt(plaintext,key){return Aes.Ctr.encrypt(plaintext, key, 256);}
function aes_decrypt(ciphertext,key){return Aes.Ctr.decrypt(ciphertext, key, 256);}

var messageCenter = {};

messageCenter.doPushMessage = function(receiver,message){
    var ciphertext = aes_encrypt(message,secret);
    var hmac = (new jsSHA(ciphertext, "TEXT")).getHMAC(secret,"TEXT","SHA-1","HEX");
    $.post('push.php',{
        'token': token,
        'ciphertext': ciphertext,
        'receiver': receiver,
        'check': hmac,
    },function(j){
    },'json');
}
