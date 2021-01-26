function Elevator (props={}, description={}){
    this._props = props;
    this._description = description;
    this.initFloors();
    this._listOfStates = new Map([['inMove', 0], ['manIn', 1], ['manOut', 2], ['freeElevator', 3], ['notFullElevator', 4]]);
    this.setFreeElevator();
}



Elevator.prototype.initFloors = function(){
    let createTable = document.createElement('table');
    createTable.className = (this._description.checkClass) ? this._description.checkClass : ''
    this._props.container.append(createTable);
    let createNameTr = document.createElement('tr');
    let createNameTh = document.createElement('th');
    createNameTh.innerHTML = (this._description.thName) ? this._description.thName : 'Lift';
    createTable.append(createNameTr);
    createNameTr.append(createNameTh);

    this.location = (this._description.location) ? this._description.location : 0;

    for (let i=10; i>=0; i--) {
        let createLiftTunnelTr = document.createElement('tr');
        let createLiftTunnelTd = document.createElement('td');
        createLiftTunnelTd.setAttribute('data-index',i)
        if (this.location != i) {
            createLiftTunnelTd.className = "mine";
        } /*else {
            if (this._description.cabin) {
                createLiftTunnelTd.append(this._description.cabin)
            }
        }*/
        createTable.append(createLiftTunnelTr);
        createLiftTunnelTr.append(createLiftTunnelTd);
    }
}

Elevator.prototype.move = function( targetFloor, cabin, unload) {
    let currentFloor = this.location;
    this.setInMove();
    let delta = (currentFloor > targetFloor) ? -1 : 1;
    let i=0;
    for (; i + currentFloor != targetFloor; i += delta){
        // console.log("animation ", i+currentFloor, " -> ", currentFloor+i+delta)
        setTimeout(this.render.bind(this), 1000*(Math.abs(i+delta)), currentFloor+i, currentFloor+i+delta, cabin)
    }
    (unload) ? setTimeout(this.setManOut.bind(this), 1000*(Math.abs(i+delta))): setTimeout(this.setManIn.bind(this), 1000*(Math.abs(i+delta)));
}

Elevator.prototype.render = function(currentFloor, nextFloor, cabin){
    let currentFloorEl = this._props.container.querySelector('td[data-index="'+currentFloor+'"]');
    let nextFloorEl = this._props.container.querySelector('td[data-index="'+nextFloor+'"]');
    while (currentFloorEl.firstChild){
        currentFloorEl.removeChild(currentFloorEl.firstChild)
    }
    currentFloorEl.classList.add('mine');
    nextFloorEl.append(cabin);
    nextFloorEl.classList.remove('mine');
    this.location = nextFloor;
}

Elevator.prototype.isInMove = function (){
    return this._state === this._listOfStates.get('inMove');
}

Elevator.prototype.isManIn = function(){
    return this._state === this._listOfStates.get('manIn');
}

Elevator.prototype.isManOut = function (){
    return this._state === this._listOfStates.get('manOut');
}

Elevator.prototype.isFreeElevator = function(){
    return this._state === this._listOfStates.get('freeElevator');
}

Elevator.prototype.isNotFullElevator = function(){
    return this._state === this._listOfStates.get('notFullElevator');
}

Elevator.prototype.setInMove = function (){
    this._state = this._listOfStates.get('inMove');
}

Elevator.prototype.setManIn = function (){
    this._state = this._listOfStates.get('manIn');
}

Elevator.prototype.setManOut = function (){
    this._state = this._listOfStates.get('manOut');
}

Elevator.prototype.setFreeElevator = function (){
    this._state = this._listOfStates.get('freeElevator');
}

Elevator.prototype.setNotFullElevator = function (){
    this._state = this._listOfStates.get('notFullElevator');
}

Elevator.prototype.drawManInTheCabin = function(cabin) {
    let currentCabin = this._props.container.querySelector('td[data-index="'+this.location+'"]');
    currentCabin.append(cabin);
    // console.log(currentCabin)
}

Elevator.prototype.countMansInTheCabin = function (){
    let manInTheCabin = this._props.container.querySelector('td[data-index="'+this.location+'"]');
    let allImgInCabbin = manInTheCabin.querySelectorAll('img')
    return allImgInCabbin.length
}

Elevator.prototype.cleanTheCabine = function(){
    let manInTheCabin = this._props.container.querySelector('td[data-index="'+this.location+'"]');
    while(manInTheCabin.firstChild){
        manInTheCabin.removeChild(manInTheCabin.firstChild)
    }
}