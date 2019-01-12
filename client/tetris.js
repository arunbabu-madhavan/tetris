class Tetris
{
    constructor(element,controlKeyCodes){
        
        this.KEY_CODES = controlKeyCodes;
        this.controls = new Controls(this);
        this.element = element;
        
        this.canvas = element.querySelector(".tetris");
       
        this.canvasnxt = element.querySelector(".nextPiece");
        this.contextnxt = this.canvasnxt.getContext('2d');
        this.context = this.canvas.getContext('2d');
        /* Create Arena*/
        this.arena = new Arena(12,20);
        /* Player */
        this.player = new Player(this.arena,element);
        this.player.events.listen('score',score => {
            this.updateScore(score);
        });
        
        this.colors = [
            null,
            "#F538FF",
            "#FF8E0D",
            "#F7CFDD",
            "#0DFF72",
            "#3877FF",
            "#F9F234",
            "#E71873"
        
        ]


        
    this.canvas.height=400;
    this.context.scale(20,20);
    this.contextnxt.scale(30,30);
    this.canvasnxt.fillStyle = "#000";
    this.contextnxt.fillRect(0,0,this.canvasnxt.width,this.canvasnxt.height);

    this.context.fillStyle = "#000";
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);

  
    if(hastouch)
    {
        this.touchControls = new TouchControls(this.canvas,this.context);
    }

let lastTime =0;

/* Updates the convas */
    this.update = (time = 0) =>{
        const deltaTime = time - lastTime;
        lastTime = time;

        this.player.update(deltaTime);
        if(!this.player.gameOver)
            this.draw();
        requestAnimationFrame(this.update);
    }

}

run()
{
    this.update();
}

serialize()
{
    return{
        arena:{
            matrix:this.arena.matrix,
        },
        player:{
            matrix:this.player.matrix,
            nextMatrix:this.player.nextMatrix,
            pos:this.player.pos,
            score:this.player.score,
        }
    }
}

unserialize(state)
{
   this.arena = Object.assign(state.arena);
   this.player = Object.assign(state.player);
   this.updateScore(this.player.score);
   this.draw();
}


updateScore(score){
    this.element.querySelector(".score").innerHTML = score;
    this.element.querySelector(".scoret").innerHTML = score;
}

/* Draw next piece */
drawNext(player){
    
    this.contextnxt.fillStyle = "#000";
    this.contextnxt.fillRect(0,0,this.canvasnxt.width,this.canvasnxt.height);
    
    this.drawMatrix(this.player.nextMatrix,{x:1,y:1},this.contextnxt);
   
}

/* draw function to draw the current piece and arena */
draw(){
    
    this.context.fillStyle = "#000";
    this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
    
    this.drawMatrix(this.arena.matrix,{x:0,y:0},this.context);
    this.drawMatrix(this.player.matrix,this.player.pos,this.context);
    this.drawNext(this.player);
    if(hastouch)
        touchControls.draw(this.context,controls);
}

/* Draws the matrix */
drawMatrix(matrix,offset,context){
    matrix.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value !=0 )
            {
                context.fillStyle = this.colors[value];            
                context.fillRect(x + offset.x 
                            ,y + offset.y 
                            ,1,1);
        }
        });
    });
}

movePlayer(){
    if(this.controls.keys["left"])
    {
        this.player.move(-1);
    }
    else if(this.controls.keys["right"])
    {
        this.player.move(+1);
    }
    else if(this.controls.keys["down"])
    {
        this.player.drop();
    }
    else if(this.controls.keys["rotate"])
    {
        this.player.rotate(-1);
    }
    else if(this.controls.keys["fall"])
    {
        this.player.fall();
    }
}

}