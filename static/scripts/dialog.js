function getDialogID(buddy,appendix){
    if(appendix != null)
        return 'dialog-' + $.trim(buddy.toLowerCase()) + '-' + appendix;
    else
        return 'dialog-' + $.trim(buddy.toLowerCase());
}
function constructMessageDisplay(jmsg){
    var html = '<div>html</div>';
    return $(html);
}
function dialogAddMessage(buddy,jmsg){
    var theframe = $( '#' + getDialogID(buddy) + ' iframe[name=dialog]' );

    showDialog(buddy);

    theframe.contents().find('body').append( constructMessageDisplay(jmsg) );

    theframe.contents().scrollTop( theframe.contents().height() );
}
function showDialog(buddy){
    var dialogID = getDialogID(buddy);
    var bDialogID = '#' + dialogID;

    if($(bDialogID).size() == 0){
        $('<div>',{
            id: dialogID,
            title: '与 ' + $.trim(buddy.toLowerCase()) + ' 的聊天',
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
