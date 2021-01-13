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
