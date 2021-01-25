function Body (props={}){
    this._props = props;
    this._floor = this._props.container.querySelectorAll('.flor_wrap')
    for (let i=0; i<this._floor.length; i++){
        this._floor[i].addEventListener('click',() => this.addMan(this._floor[i]))
    }
    
    elevatorA = new Elevator ({
        container: document.querySelector('.lift_a_wrap')
    }, {
        thName: "Первый лифт",
        checkClass: 'lift_a',
        location: 7
    });
    
    elevatorB = new Elevator ({
        container: document.querySelector('.lift_b_wrap')
    }, {
        thName: "Второй лифт",
        checkClass: 'lift_b',
        location: 5
    });
    
    elevatorC = new Elevator ({
        container: document.querySelector('.lift_c_wrap')
    }, {
        thName: "Третий лифт",
        checkClass: 'lift_c'
    });

    this._elevators = [elevatorA, elevatorB, elevatorC]
    this._floorsArr = [];

}

Body.prototype.addMan = function(floor) {
    // console.log(floor);
    let addOnFloor = floor.querySelector('.waiting_people_floor10');
    let count = addOnFloor.querySelectorAll('img').length;
    if (count < 5){
        addOnFloor.append(this.addManDrow());
        if (!this._floorsArr.includes(floor.getAttribute('data-index'))) {
            this._floorsArr.push(floor.getAttribute('data-index'));
        }
        console.log(this._floorsArr);
    }
    else alert("Сдесь живет всего 5 человек.")
}

Body.prototype.addManDrow = function (){
    let drawMan = document.createElement('img');
    drawMan.setAttribute("src","../Lifts/icons/man.svg",)
    drawMan.className = 'waiting_people';
    return drawMan;
}

Body.prototype.drawCabin = function (countMan){
    let cabin = document.createElement('div')
    cabin.classList = 'cabin';
    for (i=0; i<countMan; i++){
        cabin.append(this.addManDrow());
    }
    return cabin
}

Body.prototype.controller = function (){
    this._updateIntervalId = setInterval (this.checkStates.bind(this), 1000)
}

Body.prototype.checkStates = function () {
    this._elevators.forEach(elevator => {
        if (elevator.isInMove()){
            // console.log(elevator._description.thName, " is moving to ")
        } else if (elevator.isManIn())  {
            // console.log("Входят");
        } else if (elevator.isFreeElevator()) {
            elevator.move(10, this.drawCabin(0))
        }
    });
}







