function Sapper(props = {}) {
    this._props = props;
    this._fullField = new Field({
        container: this._props.container.querySelector('.cross__board')
    })
    //console.log(this._fullField)
    this._fullGameTimer = new Timer({
        container: this._props.container.querySelector('.cross__timer')
    })
    this._actionsEl = {
        start: this._props.container.querySelector('.actions__start'),
        pause: this._props.container.querySelector('.actions__pause'),
        // reset: this._props.container.querySelector('.actions__reset')
    };
    this._actionsEl.start.addEventListener('click', this.start.bind(this));
    this._actionsEl.pause.addEventListener('click', this.pause.bind(this));
    this._actionsEl.pause.setAttribute("disabled", "disabled")
    // this._actionsEl.reset.addEventListener('click', this.reset.bind(this));
}

Sapper.prototype.bomb = function() {

}

Sapper.prototype.start = function() {
    this._fullGameTimer.start()
    this.checkPause()
    this._actionsEl.pause.removeAttribute("disabled")
    this._fullField.fieldInit()
    this._cell = this._props.container.querySelectorAll('.cross__board-item')
    // console.log('start')
    console.log(this._cell.length)
};

Sapper.prototype.pause = function() {
    this._fullGameTimer.pause()
    this.checkPause()
    // console.log('pause')
}

Sapper.prototype.checkPause = function(){
    if (this._fullGameTimer._state.pause === true){
        this._actionsEl.pause.innerHTML = "Resume";
    }
    else{
        this._actionsEl.pause.innerHTML = "Pause"
    }
}
// Sapper.prototype.reset = function() {
//     console.log("reset");
//     this._fullGameTimer.start()
//}



