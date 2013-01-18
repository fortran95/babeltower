function getDialogID(receiver,appendix){
    if(appendix != null)
        return 'dialog-' + $.trim(receiver.toLowerCase()) + '-' + appendix;
    else
        return 'dialog-' + $.trim(receiver.toLowerCase());
}
function dialogAddMessage(receiver,jmsg){
    var theframe = $( '#' + getDialogID(receiver) + ' iframe[name=dialog]' );

    showDialog(receiver);

    theframe.contents().find('body').append($('<div>hello</div>'));
}
function showDialog(receiver){
    var dialogID = getDialogID(receiver);
    var bDialogID = '#' + dialogID;

    if($(bDialogID).size() == 0){
        $('<div>',{
            id: dialogID,
            title: '与 ' + $.trim(receiver.toLowerCase()) + ' 的聊天',
        }).appendTo('body')
          .dialog({
            close: function(){ $(this).remove(); },
            autoOpen: false,
            buttons: [{text:'speak', click:function(){ dialogAddMessage('test','hello'); }}],
          })
        $('<iframe>',{
            width: '90%',
            height: '80%',
            name: 'dialog',
        }).appendTo(bDialogID);
    }
    
    $('#' + dialogID).dialog('open');
}
