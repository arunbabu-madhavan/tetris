class TetrisManager{
    constructor(document){
        this.document = document;
        this.instances= new Set;
    this.template = this.document.getElementById("player-template");

    // const playerElements = document.querySelectorAll('.player');
    
    // // [...playerElements].forEach((element,index) => {
    // // const tetris = new Tetris(element,keycodes);
    // // this.instances.push(tetris);
    // // });
    
}

    createPlayer(){
        const element = this.document
                            .importNode(this.template.content,true)
                            .children[0];

        const tetris = new Tetris(element,keycodes);
        this.instances.add(tetris);

        this.document.body.querySelector(".game").appendChild(tetris.element);

        return tetris;
    }

    removePlayer(tetris){
        this.instances.delete(tetris);
        this.document.body.querySelector(".game").removeChild(tetris.element);
    }

    sortPlayers(tetri){
        tetri.forEach(tetris => {
            this.document.body.querySelector(".game").appendChild(tetris.element) ;
        });
    }
}