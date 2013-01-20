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

    $('#talkTest').click( function(){ new dialog(2).show(); } );
    $('#talkTest2').click( function(){ new dialog(3).show(); } );
    $('#testList').click( function(){ userData.refresh(); });
    $('#addTest2').click( function(){
        $.post('buddy.php?action=add',{'token':token, 'id':3},function(j){
            alert(j.type);
        },'json');
    });
}
