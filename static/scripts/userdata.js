var userData = {};

userData.ids = {};
userData.names = {};

userData.register = function(id,name){
    userData.ids[name] = id;
    userData.names[id] = name;
}

userData.loadList = function(liststr){
    j = $.parseJSON(liststr);
    for(var key in j)
        userData.register(key, Base64.decode(j[key]));
}

userData.refresh = function(){
    $.post('buddy.php?action=list',{'token':token},function(j){
        if(j.type == 'success'){
            mycheck = new jsSHA(j.data.list,'TEXT').getHMAC(secret,'TEXT','SHA-1','HEX');
            if(mycheck == j.data.check){
                liststr = aes_decrypt(j.data.list,secret);
                userData.loadList(liststr);
            }
        }
        UI.buddy.refresh();
    },'json');
}
