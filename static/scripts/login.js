
function loginDo(username,password){
    var nowtime = Math.round(new Date().getTime()/1000);

    var passwordSHA1 = (new jsSHA(password, "TEXT")).getHash("SHA-1","HEX");
    var hmac = (new jsSHA(passwordSHA1, "TEXT")).getHMAC(username + nowtime, "TEXT", "SHA-1", "HEX");
    var checkhash = (new jsSHA(username + nowtime, "TEXT")).getHash("SHA-1","HEX");
    
    $.post('authenticate.php',{ 'username':username, 'password':hmac, 'nowtime':nowtime, 'check':checkhash },
            function(j){
                $('#loginForm input[name=password]').val('');
                if(j.type == null)
                    return;
                if(j.type != 'success'){
                    var desc = '';
                    if(j.description != null)
                        desc = j.description;
                    else if(j.error != null)
                        desc = j.error.message;
                    else
                        desc = '未知错误';
                    loginSetInfo(desc,'error');
                } else {
                    $('#loginForm').dialog('close');
                    tokenValid = true;
                    token = j.data.token;
                }
            },
           'json');
}
function loginShow(){
    pullFailCount = 0;
    tokenValid = false;
    token = '';
    $('#loginForm').dialog('open');
}
function loginSetInfo(info,type){
    $('#loginForm div[name=message]')
        .html(info)
        .removeAttr('style')
        .addClass('ui-state-' + type);
}
