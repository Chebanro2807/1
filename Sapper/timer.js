function Timer(props = {}) {

    this._props = props;
    this._state = {
        startTime: null,
        started: false,
        pause: false,
        timeShift: 0
    };
}

Timer.prototype.setState = function(addedState) {
    if (addedState) {
        this._state = {
            ...this._state,
            ...addedState
        };
    }
};

Timer.prototype.getCurrentTime = function (){
    const {startTime, timeShift} = this._state;
    //console.log("Timer ", Date.now(), "- ", startTime, "+", timeShift)
    return Math.round((Date.now() - startTime + timeShift) / 1000);
}

Timer.prototype.getTimeAsString = function() {
    const currentTime = this.getCurrentTime();
    const ss = currentTime % 60;
    const mm = Math.floor(currentTime / 60);

    return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
};


Timer.prototype.start = function() {
    this.setState({
        startTime: Date.now(),
        started: true,
        pause: false,
        timeShift: 0
    });
    clearInterval (this._updateIntervalId);
    this._updateIntervalId = setInterval (this.render.bind(this), 1000)
}

Timer.prototype.pause = function() {
    if (this._state.started && !this._state.pause) {
        //console.log("state 1");
        this.setState ({
            startTime: null,
            started: false,
            pause: true,
            timeShift: this.getCurrentTime ()*1000
        });
        clearInterval (this._updateIntervalId);
    }
    else {
        //console.log("state 2 ", this._state.timeShift);
        this.setState ({
            startTime: Date.now (),
            started: true,
            pause: false 
        });
        this._updateIntervalId = setInterval (this.render.bind(this), 1000)
    }
};

Timer.prototype.render = function () {
    if (this._props.container){
        this._props.container.innerText = this.getTimeAsString()
    }
}


// Timer.prototype.reset = function() {
//     this.setState({
//         startTime: null,
//         started: false,
//         pause: false,
//         timeShift: 0
//     });
//     console.log(this._state);
//     clearInterval(this._updateIntervalId);
// };

