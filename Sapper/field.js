function Field (props = {}) {

    this._props = props;
}

Field.prototype.fieldInit = function() {
    for (let i=0; i<=63; i++){
        let squere = document.createElement('div');
        squere.className='cross__board-item';
        squere.setAttribute("data-index", i );
        /*let bomb = document.createElement('img');
        bomb.className='bomb';
        bomb.setAttribute("src", "../Sapper/img/bomb.svg" );
        squere.append(bomb);*/
        this._props.container.append(squere);
    }
}

Field.prototype.fieldClean = function() {
    let arr = document.querySelectorAll('.cross__board-item')
    arr.forEach(function(cell){
        cell.classList.remove("safeCell") // Мы убираем данный клас кажды раз когда заново создаем новую игру.
        cell.removeAttribute("count")
        cell.classList.remove('red_bomb')
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild); // Очищаем поля от картинок бомб.
        }        
    })
}

Field.prototype.createRandomForBombs = function(max) { // С помощью push добавили в масив переменные.
    let arr = []; // создал пустой масив
    for (let i=0; i<max; i++){
        let bompIndex = this.randomFieldIndex();  // Сгенерировали индекс ячейки для бомбы.
        // console.log(bompIndex);
        if (arr.includes(bompIndex)){
            //console.log(bompIndex)
            i--;
        } else {
            arr.push(bompIndex) // Добавили значения инфдексов в масив. 
        }
    }
    return arr
}

Field.prototype.randomFieldIndex = function() {
    return Math.round(Math.random() * 63);
}

Field.prototype.drawGrass = function (cell) {
    let grass = document.createElement('img');
    grass.className='grass';
    grass.setAttribute("src", "../Sapper/img/grass.svg" );
    cell.appendChild(grass);
    cell.classList.toggle("safeCell")
}

Field.prototype.drawBomb = function (cell) {
    let bomb = document.createElement('img');
    bomb.className='bomb';
    bomb.setAttribute("src", "../Sapper/img/bomb.svg" );
    cell.appendChild(bomb); 
}

Field.prototype.drawNeigbourNumber = function (cell) {
    let count = document.createElement('div');
    count.className = 'count';
    count.innerHTML = cell.getAttribute('count');
    cell.appendChild(count);
    cell.classList.toggle("safeCell")
}
