function Elevator (props={}, description={}){
    this._props = props;
    this._description = description;
    this.initFloors();  
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

    let location = (this._description.location) ? this._description.location : 0;

    for (let i=10; i>=0; i--) {
        let createLiftTunnelTr = document.createElement('tr');
        let createLiftTunnelTd = document.createElement('td');
        createLiftTunnelTd.setAttribute('data-index',i)
        if (location != i) {
            createLiftTunnelTd.className = "mine";
        } else {
            if (this._description.cabin) {
                createLiftTunnelTd.append(this._description.cabin)
            }
        }
        createTable.append(createLiftTunnelTr);
        createLiftTunnelTr.append(createLiftTunnelTd);
    }
}

Elevator.prototype.move = function(currentFloor, targetFloor, cabin) {
    let delta = (currentFloor > targetFloor) ? -1 : 1;
    for (let i=0; i + currentFloor != targetFloor; i += delta){
        // console.log("animation ", i+currentFloor, " -> ", currentFloor+i+delta)
        // this.render(currentFloor+i,currentFloor+i+delta);
        setTimeout(this.render.bind(this), 1000*(Math.abs(i+delta)), currentFloor+i, currentFloor+i+delta, cabin)
    }
}

Elevator.prototype.render = function(currentFloor, nextFloor, cabin){
    let currentFloorEl = this._props.container.querySelector('td[data-index="'+currentFloor+'"]');
    let nextFloorEl = this._props.container.querySelector('td[data-index="'+nextFloor+'"]');
    /*while (currentFloorEl.firstChild){
        console.log(currentFloorEl)
        currentFloorEl.remove(currentFloorEl.firstChild)
    }*/
    currentFloorEl.classList.add('mine');
    nextFloorEl.append(cabin);
    nextFloorEl.classList.remove('mine');
}


