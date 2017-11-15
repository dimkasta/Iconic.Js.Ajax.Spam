var IconicJsSpamRequest = (function () {
    function IconicJsSpamRequest(jsSpamService, url, debug, successCallback, updateCallback, errorCallback) {
        this.serial = jsSpamService.getNewSerial();
        jsSpamService.increasePending();
        updateCallback();
        var self = this;
        if (jsSpamService.xhr) {
            jsSpamService.xhr.abort();
        }
        jsSpamService.xhr = $.getJSON(url, function (data, status, xhr) { })
            .done(function (data) {
            if (self.serial == jsSpamService.serial) {
                successCallback(data, self);
            }
            else {
            }
        }).fail(function (jqxhr, textStatus, error) {
            if (error == "abort") {
            }
            else {
                errorCallback();
            }
        }).always(function (data) {
            jsSpamService.decreasePending();
            updateCallback();
        });
    }
    return IconicJsSpamRequest;
}());
var IconicJsSpam = (function () {
    function IconicJsSpam(debug) {
        this.getNewSerial = function () {
            this.serial = Date.now();
            return this.serial;
        };
        this.increasePending = function () {
            this.pending++;
        };
        this.decreasePending = function () {
            this.pending--;
        };
        this.debug = debug;
        this.pending = 0;
    }
    return IconicJsSpam;
}());
var IconicJsSpamPost = (function () {
    function IconicJsSpamPost(jsSpamService, url, formData, debug, successCallback, updateCallback, errorCallback) {
        this.serial = jsSpamService.getNewSerial();
        jsSpamService.increasePending();
        updateCallback();
        var self = this;
        if (jsSpamService.xhr) {
            jsSpamService.xhr.abort();
        }
        jsSpamService.xhr = $.post(url, formData, function (data, status, xhr) { })
            .done(function (data) {
            if (self.serial == jsSpamService.serial) {
                successCallback(data, self);
            }
            else {
            }
        }).fail(function (jqxhr, textStatus, error) {
            if (error == "abort") {
            }
            else {
                errorCallback();
            }
        }).always(function (data) {
            jsSpamService.decreasePending();
            updateCallback();
        });
    }
    return IconicJsSpamPost;
}());
