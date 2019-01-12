class TouchControls{
    constructor(tetris){
        this.tetris = tetris;
        tetris.canvas.addEventListener('touchstart',this.trackTouch,true);
        tetris.canvas.addEventListener('touchmove',this.trackTouch,true);
        tetris.canvas.addEventListener('touchend',this.trackTouch,true);
      
    }


    drawButton(txt,on,x,y,width){
        this.tetris.context.globalAlpha = on ? 0.9:0.6;
        this.tetris.context.fillStyle = '#ccc';
      
        var boxWidth = width;
        this.tetris.context.fillRect(x,y,boxWidth,1);
        this.tetris.context.fillStyle = "#FFF";
        this.tetris.context.textAlign ="center";
        this.tetris.context.globalAlpha = 1
        this.tetris.context.font = "bold " + (1) + "px bungee";
        
        this.tetris.context.fillText(txt,x+boxWidth/2 ,y + 0.8);
    }
    
    draw = function(context,ctrl){
        context.save();
        this.drawButton("\u25C0", ctrl.keys['left'],0,20,3.8);
        this.drawButton("\u25C9", ctrl.keys['rotate'],4,20,4);
        
        this.drawButton("\u25B6", ctrl.keys['right'],8.2,20,3.8);
        // this.drawSquare(ctx,unitWidth + gutterWidth,yLoc,"\u25C9",Game.keys['fire'],true);
    
        context.restore();
    }

    trackTouch = function(e){

    e.preventDefault();
    var touch,x;

    this.tetris.controls.keys['left'] =false;
    this.tetris.controls.keys['right'] =false;

    for(var i =0;i<e.targetTouches.length;i++)
    {
        touch = e.targetTouches[i];
       
        x= ((touch.pageX - this.tetris.canvas.offsetLeft)/this.tetris.canvas.width )* (this.tetris.canvas.width/3);
       
          if(x <= this.tetris.canvas.width*1/3)
          {
            this.tetris.controls.keys['left'] = true;
            this.tetris.movePlayer();
          }

          if(x > canvas.width*2/3) 
          {
            this.tetris.controls.keys['right'] = true;
            this.tetris.movePlayer();
          }
                 

    }

    for(var i =0;i<e.changedTouches.length;i++)
    {
          touch = e.changedTouches[i];
          x= ((touch.pageX -this.tetris.canvas.offsetLeft)/canvas.width )* (this.tetris.canvas.width/3);
       
          if(e.type=='touchstart' || e.type =='touchend')
          {
              if(x > this.tetris.canvas.width*1/3 && x < this.tetris.canvas.width*2/3)
              {
                this.tetris.controls.keys['rotate'] = e.type=='touchstart';  
                  if(this.tetris.controls.keys['rotate'])
                  this.tetris.movePlayer();
              }
          }    
        
    }
}

}

