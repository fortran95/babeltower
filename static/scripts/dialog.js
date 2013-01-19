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
        theframe.scrollTop( theframe[0].scrollHeight );
    };

    this.constructMessageDisplay = function(message,msgid){
        var outerdiv = $('<div>').css({   
                        'word-wrap': 'break-word',
                        'width': '98%',
                        'padding': '2px',
                       });
        var prompting = $('<div>').css({
                        'font-weight': 'bold',
                       });
        var usertext = $('<div>').text(message);
        if(msgid != undefined){
            outerdiv.attr('id','local-' + msgid);
            prompting.text('我')
                     .css({
                        'color': '#11aa11',
                     });
        } else {
            prompting.text(this.buddy)
                     .css({
                        'color': '#0000cc',
                     });
        }

        outerdiv.append(prompting)
                .append(usertext);
        return outerdiv;
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
                top: '3px',
                bottom: '22%',
                padding: '2px',
                left: '1px',
                right: '1px',
                width: '98%',
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
