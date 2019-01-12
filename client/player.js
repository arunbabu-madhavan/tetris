class Player{
    constructor(arena,playerElement)
    {
        this.element = playerElement;
        this.arena = arena;
        this.dropCounter = 0;
        this.DROP_SLOW = 1000;
        this.DROP_FAST = 50;
        this.gameOver = false;
        this.events = new Events();
        
        this.dropInterval = this.DROP_SLOW; //milliseconds
        
        this.pos={x:0,y:0}; //current piece position
        this.matrix=null; // current piece
        this.nextMatrix=this.createPiece(pieces[pieces.length * Math.random() | 0]); //next piece
        this.score= 0;

        this.reset();
        this.events.emit('score',this.score);
    }

    move(direction){
        this.pos.x += direction;
        if(this.arena.collide(this)){
            this.pos.x -= direction;
            return;
        }
        this.events.emit('pos',this.pos);
    }

    fall(){
        while(!this.arena.collide(this))
            this.pos.y++;

        this.pos.y--;
        drop();
    }

    /* drops the piece  */
    drop() {
        this.pos.y++;
        this.dropCounter =0;
        if(this.arena.collide(this)){
            this.pos.y--;
            this.arena.merge(this);
            this.pos.y = 0; 
            this.reset();
            this.arena.sweep();
            this.events.emit('score',this.score);
            return;
        }
        
        this.events.emit('pos',this.pos);
      
    }
  
    /*Function to rotate the piece */
    rotate (dir){
        const pos = this.pos.x;
        this._rotateMatrix(this.matrix,dir);

        let offset = 1;
        // Check for collision across walls after rotation
        while(this.arena.collide(this)){
            this.pos.x +=offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            console.log(offset);
            if(offset>this.matrix[0].length){
                this._rotateMatrix(this.matrix,-dir);
                this.pos.x = pos;
                return;
            }
        }

        this.events.emit('matrix',this.matrix);
    }

    _rotateMatrix(matrix, dir){
    
    for(let y=0;y<matrix.length;++y){
        for(let x=0;x<y;++x){
            [
                matrix[x][y],
                matrix[y][x],
            ] =
            [
                matrix[y][x],
                matrix[x][y],
            ]
        }
    }

    if(dir > 0){
        matrix.forEach(row => row.reverse());
    }
    else
    {
        matrix.reverse();
    }
}

    /* Position new piece */
    reset(){ 
        this.matrix = this.nextMatrix;
        this.nextMatrix = this.createPiece(pieces[pieces.length * Math.random() | 0]);
        this.pos.y = 0
        this.pos.x = (this.arena.matrix[0].length/2 | 0) - (this.matrix[0].length/2 | 0);

        if(this.arena.collide(this)){ // Game over

            this.gameOver = true;
            // this.arena.clear();
            // this.score = 0;
            // this.events.emit('score',this.score);
          
    }
    this.events.emit('matrix',this.matrix);
    this.events.emit('nextMatrix',this.nextMatrix);
    this.events.emit('pos',this.pos);
    }
    




/* Creates the matrix for piece*/
createPiece(type){
    if(type === 'T'){
        return [ [0,0,0],
                 [7,7,7],
                 [0,7,0],
               ];
    }
    if(type === 'O'){
        return [ [6,6],
                 [6,6]
               ];
    }
    if(type === 'J'){
        return [ [0,5,0],
                 [0,5,0],
                 [5,5,0],
               ];
    }
    if(type === 'L'){
        return [ [0,4,0],
                 [0,4,0],
                 [0,4,4],
               ];
    }
    if(type === 'I'){
        return [ [0,1,0,0],
                 [0,1,0,0],
                 [0,1,0,0],
                 [0,1,0,0],
               ];
    }
    if(type === 'S'){
        return [ [0,3,3],
                 [3,3,0],
                 [0,0,0],
      ];
    }
    if(type === 'Z'){
        return [ [2,2,0],
                 [0,2,2],
                 [0,0,0],
      ];
    }
}


    update(deltaTime){
        this.dropCounter +=deltaTime;
        if(this.dropCounter > this.dropInterval){
            this.drop();
        }
    }
}