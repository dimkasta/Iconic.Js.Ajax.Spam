class IconicJsSpam {
    public debug: boolean;
    public serial: number;
    public pending: number;
    public xhr;

    constructor(debug: boolean) {
        this.debug = debug;
        this.pending = 0;
    }

    public getNewSerial = function() {
        //get and return new serial based on msecs
        this.serial = Date.now();
        return this.serial;
    }
    
    public increasePending = function() {
        this.pending++;
    }
    
    public decreasePending = function () {
        this.pending--;
    }
}