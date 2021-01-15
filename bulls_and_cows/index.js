function BullsAndCows (props = {}){
    this._props = props;
    // console.log(this._string)
    this.createField()
    this.startGame = document.querySelector('.button__start');
    this.startGame.addEventListener('click',this.start.bind(this));
}
// Generate field
BullsAndCows.prototype.randomNumber = function (){
    return Math.round(Math.random() * (10000 - 100)) + 100;
}

BullsAndCows.prototype.randomNumberToString = function() {
    do {
        this._string = `${this.randomNumber().toString().padStart(4, '0')}`;
    } while(!this.verification());
}
 
BullsAndCows.prototype.render = function() {
    if (this._props.container){
        this._props.container.innerText = this._string;
        console.log(this._string)
    }
}

BullsAndCows.prototype.verification = function (){
    console.log(this._string);
    for (let i=0; i<=3; i++){
        for(let j=i+1; j<=3; j++){
            if (this._string[i]===this._string[j]){
                return false;
            }
        }
    }
    return true;
}

BullsAndCows.prototype.start = function() {
    this.fieldClean();
    this.randomNumberToString();
    this.render ();
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

BullsAndCows.prototype.fieldClean = function() {

}

//------
const bullsAndCowsGame = new BullsAndCows ({
    container: document.querySelector('.random__number')
})



