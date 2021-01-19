function Sapper(props = {}) {
    this._props = props;
    this._bombs = [] 
    this._fullField = new Field({
        container: this._props.container.querySelector('.cross__board')
    })
    //console.log(this._fullField)
    this._fullGameTimer = new Timer({
        container: this._props.container.querySelector('.cross__timer')
    })
    this._fullField.fieldInit()
    this._actionsEl = {
        start: this._props.container.querySelector('.actions__start'),
        pause: this._props.container.querySelector('.actions__pause'),
        // reset: this._props.container.querySelector('.actions__reset')
    };
    this._cells = this._props.container.querySelectorAll('.cross__board-item')
    for (let i = 0; i < this._cells.length; i++) {
        this._cells[i].addEventListener('click', () => this.checkCell(this._cells[i])); 
        // this._cells[i].addEventListener('click', this.checkCell.bind(this._cells[i])); //(2) Выбрали первый вариант из-за проблем с обращением this
    }
    this._actionsEl.start.addEventListener('click', this.start.bind(this));
    this._actionsEl.pause.addEventListener('click', this.pause.bind(this));
    this._actionsEl.pause.setAttribute("disabled", "disabled")
    // this._actionsEl.reset.addEventListener('click', this.reset.bind(this));
}

Sapper.prototype.bomb = function() {

}

Sapper.prototype.start = function() {
    this._fullField.fieldClean()
    // console.log('start')
    this._fullGameTimer.start()
    this.checkPause()
    this._actionsEl.pause.removeAttribute("disabled")

    this._bombs = this._fullField.createRandomForBombs(document.getElementById("size").value)
    console.log(this._bombs)
    this.checkNeighbours();
    
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

//(1)
Sapper.prototype.checkCell = function(cell){
    // console.log(cell.getAttribute("data-index"));
    if (this._fullGameTimer._state.pause === true){
        alert('Resume the game')
        return  // Принудительное завершение функции. Все что ниже игнорируеться. 
    }
    if (cell.classList.contains("safeCell")){ // Если класс safeCell есть то в данную ячейку мы больше ничего не добавляем. 
        return 
    }
    if (this._fullGameTimer._state.started === false){
        alert('Please, press "Start new game".')
        return 
    }
    //else второй вариант для паузы всех ячеек.
    this._fullField.draw(cell, !this._bombs.includes(parseInt(cell.getAttribute("data-index"))));


    // alert(cell.getAttribute("data-index"));
}

Sapper.prototype.checkNeighbours = function () {
    this._bombs.forEach(index => {
        let arrNeigbours = [index - 9, index - 8,index - 7, index - 1,index + 9, index + 8,index + 7, index + 1]
        arrNeigbours.forEach(indexNeighbour => {
            if (indexNeighbour >= 0 && indexNeighbour <= 63
                && !this.checkLeftBorderNeighbour(index, indexNeighbour) && !this.checkRightBorderNeighbour(index, indexNeighbour)){
                this.checkNeighboursCount (indexNeighbour);
            }
        })

    });
}

Sapper.prototype.checkNeighboursCount = function (neighbour) {
    let cells = document.querySelectorAll('.cross__board-item') // to do сделать с помощью селектора по атрибуту
    // console.log("neighbour="+cells[index-9]);
    if (cells[neighbour].getAttribute('count') === null){
        cells[neighbour].setAttribute('count',0);
    }
    cells[neighbour].setAttribute('count', parseInt(cells[neighbour].getAttribute('count'))+1)
}

Sapper.prototype.checkLeftBorderNeighbour = function (index, indexNeighbour){
    if (index % 8 === 0){
        if (index-9 === indexNeighbour || index-1 === indexNeighbour || index+7 === indexNeighbour){
            return true
        }
    }
    return false
}

Sapper.prototype.checkRightBorderNeighbour = function (index, indexNeighbour){
    if (index % 8 === 7){
        if (index-7 === indexNeighbour || index+1 === indexNeighbour || index+9 === indexNeighbour){
            return true
        }
    }
    return false
}

// (2)
// Sapper.prototype.checkCell = function(){
    
//     if (this._bombs.includes(this.getAttribute("data-index"))){
//         draw(this);
//     }
   

//     console.log(this);
//     alert(this.getAttribute("data-index"));
// }

// Sapper.prototype.reset = function() {
//     console.log("reset");
//     this._fullGameTimer.start()
//}



