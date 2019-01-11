class TetrisManager{
    constructor(document){
        this.document = document;
        this.instances=[];
       
    const playerElements = document.querySelectorAll('.player');
  
    [...playerElements].forEach((element,index) => {
    const tetris = new Tetris(element,keycodes);
    this.instances.push(tetris);
    });
    
}
}