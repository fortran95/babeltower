var UI = {};

UI.initialize = function(){
    $('#loginForm,#changePwdForm').dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
    });
    $('#contactForm').dialog({
        autoOpen: false,
        modal: false,
        resizable: true,
        resize: function(){ $('#mainAccordion').accordion('refresh'); },
        minHeight: 400,
        minWidth: 300,
        position: { my: 'left top', at: 'left+50 top+50', of: 'body' },
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

    $('#buddyList').css({height: '50%'});

    $('#addTest2').click( function(){
        $.post('buddy.php?action=add',{'token':token, 'id':3},function(j){
            alert(j.type);
        },'json');
    });
};

UI.buddy = {};
UI.buddy.refresh = function(){
    // Called by userData.refresh
    $('#buddyMenuBox ul#menu').remove();

    $('<ul>',{
        id: 'menu',
    }).appendTo('#buddyMenuBox');

    for(userid in userData.names){
        $('<li>').appendTo('#buddyList ul#menu')
                 .append($('<a>',{
                            href: '#'
                         }).text(userData.names[userid])
                           .bind('click', userid, function(e){ new dialog(e.data).show(); } )
                         );
    }
    $('#buddyList ul#menu').menu();

    $('#contactForm').dialog('open');
    $('#mainAccordion').accordion('refresh');
}
