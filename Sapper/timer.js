function Timer(props = {}) {

    this._props = props;
    this._state = {
        startTime: null,
        started: false,
        pause: false,
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
    return Math.round((Date.now() - this._state.startTime) / 1000);
}

Timer.prototype.getTimeAsString = function() {
    const currentTime = this.getCurrentTime();
    const ss = currentTime % 60;
    const mm = Math.floor(currentTime / 60);

    return `${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
};


Timer.prototype.start = function() {
    this.setState({
        startTime: Date.now (),
        started: true,
        pause: false,
    });
    this._updateIntervalId = setInterval (this.render.bind(this), 1000)
}

Timer.prototype.pause = function() {
    if (this._state.started) {
        this.setState ({
            pause: true
        });
        clearInterval (this._updateIntervalId);
    }
};

Timer.prototype.render = function () {
    if (this._props.container){
        this._props.container.innerText = this.getTimeAsString()
    }
}

Timer.prototype.reset = function() {
    this.setState({
        startTime: null,
        started: true,
        pause: false,
        timeShift: 0
    });

    clearInterval(this._upadateIntervalId);
};

const timer1 = new Timer({
    container: document.querySelector('.cross__timer')
});

timer1.start();

