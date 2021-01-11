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
    });
    this._updateIntervalId = setInterval (this.render.bind(this), 1000)
}

Timer.prototype.render = function () {
    if (this._props.container){
        this._props.container.innerText = this.getTimeAsString()
    }
}

const timer1 = new Timer({
    container: document.querySelector('.cross__timer')
});

console.log (timer1._state);
timer1.start();
console.log (timer1._state);


