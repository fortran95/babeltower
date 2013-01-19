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
        theframe.scrollTop( theframe.css('height') );
    };

    this.constructMessageDisplay = function(message,msgid){
        if(msgid != undefined)
            var html = '<div id="local-' + msgid + '" style="word-wrap: break-word; width: 100%">'
                     + '<strong>我</strong><br />'
                     + message + '</div>';
        else
            var html = '<div style="word-wrap: break-word; width: 100%">'
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
                id: this.dialogID + '-content',
            }).appendTo(this.bDialogID)
              .css({                
                position: 'absolute',
                top: '0',
                bottom: '22%',
                left: '0',
                right: '0',
                width: '100%',
                overflow: 'auto',
            });

            $('<textarea>',{
                width: '99%',
                id: this.dialogID + '-textarea',
            }).css({
                resize: 'none',
                position: 'absolute',
                left: '0',
                bottom: '0',
                height: '20%',
            }).appendTo(this.bDialogID);
        }
        
        $(this.bDialogID)
            .dialog('open');
    };
}
