function getDialogID(receiver,appendix){
    if(appendix != null)
        return 'dialog-' + $.trim(receiver.toLowerCase()) + '-' + appendix;
    else
        return 'dialog-' + $.trim(receiver.toLowerCase());
}
function constructMessageDisplay(jmsg){
    var html = '<div>html</div>';
    return $(html);
}
function dialogAddMessage(receiver,jmsg){
    var theframe = $( '#' + getDialogID(receiver) + ' iframe[name=dialog]' );

    showDialog(receiver);

    theframe.contents().find('body').append( constructMessageDisplay(jmsg) );

    theframe.contents().scrollTop( theframe.contents().height() );
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
            buttons: [{text:'speak', click:function(){ dialogAddMessage('test', {'sender':'lucifer'} ); }}],
            minWidth: 400,
            minHeight: 400,
          })
        $('<iframe>',{
            width: '95%',
            height: '85%',
            name: 'dialog',
        }).appendTo(bDialogID);
        $('<textarea>',{
            height: '20%',
            width: '95%',
        }).appendTo(bDialogID);
    }
    
    $('#' + dialogID).dialog('open');
}
