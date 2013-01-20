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

    this.constructDatetimeDisplay = function(showtime){
        this.zfiller = function(src,len){
            return ("0000" + src).slice(-len);
        }

        var nowtime = new Date();
        var cmptime = new Date();
        cmptime.setTime(showtime * 1000);

        var pureTime = this.zfiller(cmptime.getHours(),2)
                     + ':' + this.zfiller(cmptime.getMinutes(),2)
                     + ':' + this.zfiller(cmptime.getSeconds(),2);

        if(cmptime.getDate() == nowtime.getDate() && cmptime.getMonth() == nowtime.getMonth() && cmptime.getFullYear() == nowtime.getFullYear())    
            return pureTime;
        else
            return this.zfiller(cmptime.getFullYear(),4)
                   + '-' + this.zfiller(cmptime.getMonth() + 1,2)
                   + '-' + this.zfiller(cmptime.getDate(),2) + ' ' + pureTime;
    }

    this.constructMessageDisplay = function(message,msgid){
        var outerdiv = $('<div>').css({   
                        'word-wrap': 'break-word',
                        'width': '98%',
                        'padding': '2px',
                       });
        var prompting = $('<div>').css({
                        'font-weight': 'bold',
                       });
        if(message.time != undefined){
            var usertext = $('<div>').text(message.text);
            var showtime = message.time;
        } else {
            var usertext = $('<div>').text(message);
            var showtime = Math.round(new Date().getTime()/1000);
        }

        usertext.html( usertext.html().replace(new RegExp("\n",'g'),"<br />") );

        if(msgid != undefined){
            outerdiv.attr('id','local-' + msgid);
            prompting.text('我  ' + this.constructDatetimeDisplay(showtime) )
                     .css({
                        'color': '#11aa11',
                     });
        } else {
            prompting.text(this.buddy + '  ' + this.constructDatetimeDisplay(showtime) )
                     .css({
                        'color': '#0000cc',
                     });
        }

        outerdiv.append(prompting)
                .append(usertext);
        return outerdiv;
    };

    this.onTextareaKeypress = function(e){
        if(e.ctrlKey)
            if(e.which == 10 || e.which == 13)
                new dialog(e.data).say();
    }
    
    this.close = function(){
        $(this.bDialogID).remove();
    }

    this.show = function(){
        var buddyID = this.buddyID;
        this.btnSpeakCallback = function(){
            new dialog(buddyID).say();
        }
        this.btnCloseCallback = function(){
            new dialog(buddyID).close();
        }

        if($(this.bDialogID).size() == 0){
            $('<div>',{
                id: this.dialogID,
                title: '与 ' + $.trim(this.buddy.toLowerCase()) + ' 的聊天',
            }).appendTo('body')
              .dialog({
                close: this.close,
                autoOpen: false,
                buttons: [{text:'关闭', click: this.btnCloseCallback, },
                          {text:'发送(<Ctrl>+<Enter>)', click: this.btnSpeakCallback, },],
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
                width: '98%',
                id: this.dialogID + '-textarea',
            }).css({
                resize: 'none',
                position: 'absolute',
                left: '0',
                bottom: '0',
                height: '20%',
            }).appendTo(this.bDialogID)
              .bind('keypress', this.buddyID, this.onTextareaKeypress );
        }
        
        $(this.bDialogID)
            .dialog('open');
    };
}
