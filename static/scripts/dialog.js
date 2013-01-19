function dialog(buddyID){
    this.buddy = userData.names[buddyID];
    if(this.buddy == undefined)
        return false;

    this.dialogID = 'dialog-' + buddyID;
    this.bDialogID = '#' + this.dialogID;
    this.buddyID = buddyID;

    this.say = function(){
        var message = $.trim( $(this.bDialogID + '-textarea' ).val());
        if(message == '' || message.length > 500)
            return;

        var msgid = messageCenter.push(this.buddyID, message);
        this.addDisplay(message, msgid);

        $(this.bDialogID + '-textarea').val('');
    };

    this.addDisplay = function(message,msgid){
        this.show();
        var theframe = $( this.bDialogID + '-content' );
        theframe.append( this.constructMessageDisplay(message,msgid) );
//        theframe.scrollTop( theframe.contents().height() );
    };

    this.constructMessageDisplay = function(message,msgid){
        if(msgid != undefined)
            var html = '<div id="local-' + msgid + '">'
                     + '<strong>我</strong><br />'
                     + message + '</div>';
        else
            var html = '<div>'
                     + '<strong>' + this.buddy + '</strong><br />'
                     + message + '</div>';
        return $(html);
    };

    this.show = function(){
        var buddyID = this.buddyID;
        this.speakCallback = function(){
            new dialog(buddyID).say();
        }

        if($(this.bDialogID).size() == 0){
            $('<div>',{
                id: this.dialogID,
                title: '与 ' + $.trim(this.buddy.toLowerCase()) + ' 的聊天',
            }).appendTo('body')
              .dialog({
                close: function(){ $(this).remove(); },
                autoOpen: false,
                buttons: [{text:'speak', click: this.speakCallback, },],
                minWidth: 400,
                minHeight: 400,
              });

            $('<div>',{
                id: this.dialogID + '-pane',
            }).appendTo(this.bDialogID)
              .css({
                position: 'absolute',
                float: 'left',
                overflow: 'auto',
                width: '99%',
                background: '#F00',
            }).position({
                my: 'left top',
                at: 'left top',
                of: this.bDialogID,
                collision: 'none',
                within: $(this.bDialogID),
            });

            $('<div>',{
                id: this.dialogID + '-content',
            }).appendTo(this.bDialogID + '-pane')
              .css({
                width: '100%',
                background: '#0F0',
            });

            $('<textarea>',{
                width: '98%',
                id: this.dialogID + '-textarea',
            }).css({
                resize: 'none',
                position: 'absolute',
                top: $(this.bDialogID + '-iframe').css('height'),
                left: $(this.bDialogID + '-iframe').css('left'),
            }).appendTo(this.bDialogID);
        }
        
        $(this.bDialogID)
            .dialog('open');
    };
}
