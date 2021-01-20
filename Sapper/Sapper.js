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
        slider: this._props.container.querySelector('#size')
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
    this._counter = 0;
    this._actionsEl.slider.addEventListener("input",()=>{
        this._actionsEl.slider.setAttribute('title',this._actionsEl.slider.value)
        this._props.container.querySelector('#text').value = this._actionsEl.slider.value;
    })
}

Sapper.prototype.start = function() {
    this._counter = 0;
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
    if (this._fullGameTimer._state.started === false){
        alert('Please, press "Start new game".')
        return 
    }
    if (this._fullGameTimer._state.pause === true){
        alert('Resume the game')
        return  // Принудительное завершение функции. Все что ниже игнорируеться. 
    }
    if (cell.classList.contains("safeCell")){ // Если класс safeCell есть то в данную ячейку мы больше ничего не добавляем. 
        return 
    }

    //else второй вариант для паузы всех ячеек.
    this.draw(cell, !this._bombs.includes(parseInt(cell.getAttribute("data-index"))));
     // alert(cell.getAttribute("data-index"));
}

Sapper.prototype.checkNeighbours = function () {
    this._bombs.forEach(index => {
        let arrNeigbours = [index - 9, index - 8,index - 7, index - 1,index + 9, index + 8,index + 7, index + 1]
        arrNeigbours.forEach(indexNeighbour => {
            if (indexNeighbour >= 0 && indexNeighbour <= 63
                && !this.checkLeftBorderNeighbour(index, indexNeighbour) && !this.checkRightBorderNeighbour(index, indexNeighbour)){
                this.checkNeighboursCount(indexNeighbour);
            }
        })

    });
}

Sapper.prototype.checkNeighboursCount = function (neighbour) {
    let cell = document.querySelector('.cross__board-item[data-index="'+neighbour+'"]') // to do сделать с помощью селектора по атрибуту
    // console.log("neighbour="+cells[index-9]);
    if (cell.getAttribute('count') === null){
        cell.setAttribute('count',0);
    }
    cell.setAttribute('count', parseInt(cell.getAttribute('count'))+1)
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

Sapper.prototype.draw = function(cell, grass) {
    if (grass === true){
        if (cell.getAttribute('count') === null){
            this.grassEmptyNeighbours(cell);
        } else {
            this._fullField.drawNeigbourNumber(cell);
            this._counter++;
        } 
        if (this._counter === (64-this._bombs.length)){
            alert ('You win!')
            this.endGame();
        }
    } else {
        cell.classList.add('red_bomb')
        this._bombs.forEach(index => {
            // let allBombs = document.querySelectorAll('.cross__board-item') // to do селектор по атрибуту.
            let bomb = document.querySelector('.cross__board-item[data-index="'+index+'"]') // .cross__board-item[data-index="27"]
            this._fullField.drawBomb(bomb);
            
            // console.log("Was: ", allBombs[index]);
            // console.log("Is: ", bomb);
        })
        alert ("You lose!");
        this.endGame();
    }
}

Sapper.prototype.grassEmptyNeighbours = function(cell){
    this._fullField.drawGrass(cell);
    this._counter++;
    let index = parseInt(cell.getAttribute('data-index'));
    
    // Draw EmptyGrass
    let arrGrassNeigbours = [index-1, index+1, index-8, index+8];
    for (let i=0; i<arrGrassNeigbours.length; i++){
        if (arrGrassNeigbours[i]< 0 || arrGrassNeigbours[i]>63 || this.checkLeftBorderNeighbour(index,arrGrassNeigbours[i]) 
        || this.checkRightBorderNeighbour(index,arrGrassNeigbours[i])){
            continue
        }
        let cellNeigbour = document.querySelector('.cross__board-item[data-index="'+arrGrassNeigbours[i]+'"]') // to do селектор по атрибуту. - FIXED
        if (!this._bombs.includes(arrGrassNeigbours[i]) 
        && cellNeigbour.getAttribute('count') === null){
            if (cellNeigbour.firstChild) {
                continue;
            }
            this.grassEmptyNeighbours(cellNeigbour);
        }
    }
    //Draw Grass with count > 0
    let arrNeigbours = [index - 9, index - 8,index - 7, index - 1,index + 9, index + 8,index + 7, index + 1]
    arrNeigbours.forEach(indexNeighbour => {
        if (indexNeighbour >= 0 && indexNeighbour <= 63
            && !this.checkLeftBorderNeighbour(index, indexNeighbour) && !this.checkRightBorderNeighbour(index, indexNeighbour)){
            let cellNeighbour = document.querySelector('.cross__board-item[data-index="'+indexNeighbour+'"]') //to do селектор по атрибуту.  - FIXED
            if (!this._bombs.includes(indexNeighbour) && cellNeighbour.getAttribute('count') !== null 
                && !cellNeighbour.firstChild){
                this._fullField.drawNeigbourNumber(cellNeighbour); 
                this._counter++;   
            }
        }
    })
}

Sapper.prototype.endGame = function(){
    this._fullGameTimer.pause();
    this._actionsEl.pause.setAttribute("disabled", "disabled")
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



