function Body (props={}){
    this._props = props;
    this._floor = this._props.container.querySelectorAll('.flor_wrap')
    for (let i=0; i<this._floor.length; i++){
        this._floor[i].addEventListener('click',() => this.addMan(this._floor[i]))
    }
    
    const elevatorA = new Elevator ({
        container: document.querySelector('.lift_a_wrap')
    }, {
        thName: "Первый лифт",
        checkClass: 'lift_a',
        location: 7,
        cabin: this.drawCabin(1)
    });
    
    const elevatorB = new Elevator ({
        container: document.querySelector('.lift_b_wrap')
    }, {
        thName: "Второй лифт",
        checkClass: 'lift_b',
        location: 5
    });
    
    const elevatorC = new Elevator ({
        container: document.querySelector('.lift_c_wrap')
    }, {
        thName: "Третий лифт",
        checkClass: 'lift_c'
    });
    
    elevatorA.move(7, 3, this.drawCabin(1));
    
    elevatorB.move(5, 10, this.drawCabin(3));
    
    elevatorC.move(0, 10, this.drawCabin(3));
    
}

Body.prototype.addMan = function(floor) {
    // console.log(floor);
    let addOnFloor = floor.querySelector('.waiting_people_floor10');
    let count = addOnFloor.querySelectorAll('img').length;
    if (count < 5){
        addOnFloor.append(this.addManDrow());
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








