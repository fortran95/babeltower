function dialog(buddy, buddyID){
    this.dialogID = 'dialog-' + $.trim(buddy.toLowerCase());
    this.bDialogID = '#' + this.dialogID;
    this.buddy = buddy;
    this.buddyID = buddyID;

    this.say = function(){
        var message = $.trim( $(this.bDialogID + ' textarea' ).val());
        if(message == '' || message.length > 500)
            return;
        var msgid = messageCenter.push(this.buddyID, message); // TODO make use of this!
        // TODO put to dialogbox.
        $(this.bDialogID + ' textarea').val('');
    };

    this.addDisplay = function(jmsg){
        var theframe = $( $this.bDialogID + '-iframe' );
        this.show();
        theframe.contents().find('body').append( constructMessageDisplay(jmsg) );
        theframe.contents().scrollTop( theframe.contents().height() );
    };

    this.constructMessageDisplay = function(jmsg){
        var html = '<div>html</div>';
        return $(html);
    };

    this.show = function(){
        var buddy = this.buddy;
        var buddyID = this.buddyID;
        this.speakCallback = function(){
            new dialog(buddy, buddyID).say();
        }

        if($(this.bDialogID).size() == 0){
            $('<div>',{
                id: this.dialogID,
                title: '与 ' + $.trim(this.buddy.toLowerCase()) + ' 的聊天',
            }).appendTo('body')
              .dialog({
                close: function(){ $(this).remove(); },
                autoOpen: false,
                buttons: [{text:'speak', click: this.speakCallback, }],
                minWidth: 400,
                minHeight: 400,
              });

            $('<iframe>',{
                width: '99%',
                height: '85%',
                id: this.dialogID + '-iframe',
            }).appendTo(this.bDialogID)
              .css({
                position: 'absolute',
            }).position({
                my: 'left top',
                at: 'left top',
                of: this.bDialogID,
                collision: 'none',
                within: $(this.bDialogID),
            });

            $('<textarea>',{
                width: '98%',
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
