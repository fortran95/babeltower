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
    var theframe = $( '#' + getDialogID(buddy) + '-iframe' );

    showDialog(buddy);

    theframe.contents().find('body').append( constructMessageDisplay(jmsg) );

    theframe.contents().scrollTop( theframe.contents().height() );
}
function dialogISay(buddy,buddyID){
    var dialogID = getDialogID(buddy);
    var bDialogID = '#' + dialogID;
    var message = $.trim($(bDialogID + ' textarea').val());

    if(message == '' || message.length > 500)
        return;

    var msgid = messageCenter.push(buddyID, message); // TODO make use of this!
    // TODO put to dialogbox.

    $(bDialogID + ' textarea').val('');
}
function showDialog(buddy,buddyID){
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
            buttons: [{text:'speak', click: function(){dialogISay(buddy,buddyID);}, }],
            minWidth: 400,
            minHeight: 400,
          });

        $('<iframe>',{
            width: '99%',
            height: '85%',
            id: dialogID + '-iframe',
        }).appendTo(bDialogID)
          .css({
            position: 'absolute',
        }).position({
            my: 'left top',
            at: 'left top',
            of: bDialogID,
            collision: 'none',
            within: $(bDialogID),
        });

        $('<textarea>',{
            width: '98%',
        }).css({
            resize: 'none',
            position: 'absolute',
            top: $(bDialogID + '-iframe').css('height'),
            left: $(bDialogID + '-iframe').css('left'),
        }).appendTo(bDialogID);
    }
    
    $('#' + dialogID)
        .dialog('open');
}
