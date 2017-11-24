/// <reference path="index.d.ts" />
class IconicJsSpamPost {
    public serial: number;

    constructor(jsSpamService: IconicJsSpam, url, method, formData, debug: boolean, successCallback, updateCallback, errorCallback) {
        // get new serial
        this.serial = jsSpamService.getNewSerial();

        // starting ajax request to " + url);

        // increase pending number
        jsSpamService.increasePending();

        //trigger update callback, to notify for initializing new request
        updateCallback();

        let self = this;

        // if existing xhr request, abort it
        if(jsSpamService.xhr) {
            jsSpamService.xhr.abort();
        }

        //start a new ajax request and assign the xhr to the service
        jsSpamService.xhr = $.ajax({
            url: url,
            type: method,
            data: formData,
            success: function (data, status, xhr) {
            }
        })
            .done(function(data) { //if ok
                // if this serial is equal to the serial stored as last
            if (self.serial == jsSpamService.serial) {
                // no other requests were issued. Return this.
                successCallback(data, self);
            }
            else { //if not
                // There are other requests issued after this one. Ignore it.

            }
        }).fail(function(jqxhr, textStatus, error){ //if failed
            if(error == "abort") { //if aborted
                //the request was aborted
            }
            else{
                //the request failed, call the callback
                errorCallback();
            }
        }).always(function(data){ //afterwards, always
            // decrease pending
            jsSpamService.decreasePending();
            // call the update callback
            updateCallback();
        });
    }
}