var UI = {};

UI.initialize = function(){
    $('#loginForm,#changePwdForm').dialog({        
        autoOpen: false,
        modal: true,
        resizable: false,
    });
    $('#loginForm').dialog('option', 'buttons', [{
        click: function(){ loginDo($('#loginForm input[name=username]').val(), $('#loginForm input[name=password]').val()); },
        text: '登录',
    }]);
    $('#changePwdForm').dialog('option', 'buttons', [{
        click: function(){ alert('尚未制作，请联系作者。'); },
        text: '修改密码',
    }]);
    $('#jsDisableNotice').css({'display':'none'});
    $('button').button();

    $('#mainAccordion').accordion({
        heightStyle: 'fill',
    });

    $('#buddyList').menu();

    $('#testList').click( function(){ userData.refresh(); });
    $('#addTest2').click( function(){
        $.post('buddy.php?action=add',{'token':token, 'id':3},function(j){
            alert(j.type);
        },'json');
    });
};

UI.buddy = {};
UI.buddy.refresh = function(){
    // Called by userData.refresh
    $('#buddyList *').remove();
    for(userid in userData.names){
        $('<li>').appendTo('#buddyList')
                 .append($('<a>',{
                            href: '#'
                         }).text(userData.names[userid])
                           .bind('click', userid, function(e){ new dialog(e.data).show(); } )
                         );
    }
    $('#buddyList').menu();
}
