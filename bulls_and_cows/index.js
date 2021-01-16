function BullsAndCows (props = {}){
    this._props = props;
    // console.log(this._string)
    this.createField()
    this.startGame = document.querySelector('.button__start');
    this.startGame.addEventListener('click',this.start.bind(this));
    this._currentTurn = 0;
}
// Generate field
BullsAndCows.prototype.randomNumber = function (){
    return Math.round(Math.random() * (10000 - 100)) + 100;
}

BullsAndCows.prototype.randomNumberToString = function() {
    do {
        this._string = `${this.randomNumber().toString().padStart(4, '0')}`;
    } while(!this.verification(this._string));
}
 
BullsAndCows.prototype.render = function() {
    if (this._props.container){
        this._props.container.innerText = this._string;
        console.log(this._string)
    }
}

BullsAndCows.prototype.verification = function (check){
    // console.log(check);
    for (let i=0; i<4; i++){
        for(let j=i+1; j<4; j++){
            if (check[i]===check[j]){
                return false;
            }
        }
    }
    return true;
}

BullsAndCows.prototype.checkBullsAndCows = function (usernumber) {
    let bulls = 0;
    let cows = 0;
    for (let i=0; i<4; i++){
        for (let j=0; j<4; j++){
            if (usernumber[i]===this._string[j]){
                if (i===j) {continue}
                cows++
            }
        }
        if (usernumber[i]===this._string[i]){
            bulls++
        }
        
    }
    console.log('быки =', bulls, 'коровы =',cows)
    this.drow(bulls, cows);
}

BullsAndCows.prototype.drow = function (bullsQuantity, cowsQuantity){
    let drawBulls = document.querySelector('.bull_'+this._currentTurn);
    let drawCows = document.querySelector('.cow_'+this._currentTurn);
    drawBulls.innerHTML = bullsQuantity;
    drawCows.innerHTML = cowsQuantity;
}

BullsAndCows.prototype.start = function() {
    this.fieldClean();
    this.randomNumberToString();
    this.render();
    this._currentTurn = 0;
    this.createInputNumber();
}

BullsAndCows.prototype.createField = function () {
    for (let i=0; i<10; i++){
        let row = document.createElement('tr');
        row.className = 'lines';
        let columnTurn = document.createElement('td');
        columnTurn.className = 'turn';
        columnTurn.innerHTML = i+1;
        let columnNumber = document.createElement('td');
        columnNumber.className = 'number_'+(i);
        let columnBull = document.createElement('td');
        columnBull.className = 'bull_'+(i);
        let columnCow = document.createElement('td');
        columnCow.className = 'cow_'+(i);
        row.append(columnTurn);
        row.append(columnNumber);
        row.append(columnBull);
        row.append(columnCow);
        let createTable = document.querySelector('.bulls_and_cows_table');
        createTable.append(row);
    }
}

BullsAndCows.prototype.createInputNumber = function (){
    let cellNumberTd = document.querySelector('.number_'+this._currentTurn);
    let createInput = document.createElement('input')
    createInput.setAttribute('size',2);
    createInput.setAttribute('maxlength',4)
    // createInput.setAttribute('pattern','[0-9]{4}') // Разобраться с данным свойством немного позже. 
    createInput.addEventListener('keypress', (event) => {
        if (event.keyCode ===13) {
            event.preventDefault()
            if (this.verification(createInput.value)) {
                createInput.setAttribute('disabled','disabled')
                this.checkBullsAndCows(createInput.value);
                this._currentTurn++;
                if (this._currentTurn===10){
                    alert('Ты нубас')

                } else {
                    this.createInputNumber();
                }
            } else {
                alert('У вас повторяються цыфры. \n"1234" => Правильно, \n"1123" =>  Не верно. В данном случае дважди повторилось "1 и 1"')
            }
        }
    });
    cellNumberTd.append(createInput)
}



BullsAndCows.prototype.fieldClean = function() {

}

//------
const bullsAndCowsGame = new BullsAndCows ({
    container: document.querySelector('.random__number')
})



