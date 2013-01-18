function dialog(buddy, buddyID){
    this.dialogID = 'dialog-' + $.trim(buddy.toLowerCase());
    this.bDialogID = '#' + this.dialogID;
    this.buddy = buddy;
    this.buddyID = buddyID;

    this.say = function(){
        var message = $.trim( $(this.bDialogID + ' textarea' ).val());
        if(message == '' || message.length > 500)
            return;

        var msgid = messageCenter.push(this.buddyID, message);
        this.addDisplay(message, msgid);

        $(this.bDialogID + ' textarea').val('');
    };

    this.addDisplay = function(message,msgid){
        this.show();
        var theframe = $( this.bDialogID + '-iframe' );
        theframe.contents().find('body').append( this.constructMessageDisplay(message,msgid) );
        theframe.contents().scrollTop( theframe.contents().height() );
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
