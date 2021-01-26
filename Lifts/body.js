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
        // console.log(this._floorsArr);
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
            this.deleteFromFloorAddToTheCabin(elevator.location,elevator);
            // console.log('лифт сдесь', elevator.location)
            // console.log("Входят");
        } else if (elevator.isManOut()) {
            this.manOnTheStreet(elevator);
        } else if (elevator.isFreeElevator()) {
            if (this._floorsArr.length == 0) {
                return
            }
            elevator.move(this._floorsArr[0],this.drawCabin(0),false)
            this._floorsArr.shift()
            // console.log('shift:',this._floorsArr)
        } else if (elevator.isNotFullElevator()) {
            for (let i=0; i<this._floorsArr.length; i++){
                if (this._floorsArr[i]<elevator.location){
                    elevator.move(this._floorsArr[i],this.drawCabin(elevator.countMansInTheCabin()),false)
                    // To do delete this._floorsArr[i] from this._floorsArr
                    return
                }
            }
            elevator.move(0,this.drawCabin(elevator.countMansInTheCabin()),true)
        } else {
            // error
        }
    });
}

Body.prototype.deleteFromFloorAddToTheCabin = function(currentFloor,elevator) {
        
        let checkManOnFloor = document.querySelector('.flor_wrap[data-index="'+currentFloor+'"]');
        let manOnTheFloor = checkManOnFloor.querySelector('.waiting_people_floor10');
        let allImg = manOnTheFloor.querySelectorAll('img')
        if (allImg.length === 0){
            elevator.setFreeElevator();
            return
        }
        // console.log(manOnTheFloor)
 
        let liftLmit = 4;

        if (allImg.length + elevator.countMansInTheCabin() <= liftLmit){ // Если все Люди с єтажа вмещаются в Лифт
            
            elevator.drawManInTheCabin(this.drawCabin(allImg.length + elevator.countMansInTheCabin())) // Рисуем человечко в лифте
            while (manOnTheFloor.firstChild) {
                manOnTheFloor.removeChild(manOnTheFloor.firstChild); // Очищаем челвоечек с этажа ВСЕХ
            }
            // console.log(elevator.drawManInTheCabin(this.drawCabin(allImg.length))) // ЧТО ЗА ДИБИЛИЗМ?
        } else { // ИНАЧЕ ПЕРЕКИДІВАЕМ ТЕХ, КТО ВЛЕЗЕТ
            for (let i=0; i<liftLmit-elevator.countMansInTheCabin(); i++){
                console.log(i)
                manOnTheFloor.removeChild(allImg[i]);
            }
            elevator.drawManInTheCabin(this.drawCabin(liftLmit))
            if (!this._floorsArr.includes(currentFloor)) {
                this._floorsArr.push(currentFloor);
            }
        }

        if (liftLmit === elevator.countMansInTheCabin()) {
            elevator.move(0 ,this.drawCabin(liftLmit),true)
        } else {
            elevator.setNotFullElevator();
        }
}

Body.prototype.manOnTheStreet = function (elevator){
    let street = document.querySelector('.street');
    let count = elevator.countMansInTheCabin();
    for (let i=0; i<count; i++){
        street.append(this.addManDrow())
    }
    elevator.cleanTheCabine();
    elevator.setFreeElevator();

    setTimeout(this.cleanTheStreet.bind(this), 2500)
}

Body.prototype.cleanTheStreet = function() {
    let street = document.querySelector('.street');
    while(street.firstChild) {
        street.removeChild(street.firstChild)
    }
}









