class Controls{
    constructor(tetris){
        
    var ctrl = this;
    this.keys = {};

    window.addEventListener('keydown',function(e){
        if(!tetris.player.gameOver)
        {
      if(tetris.KEY_CODES[e.keyCode]){
        ctrl.keys[tetris.KEY_CODES[e.keyCode]] =  true;
        
        if(tetris.KEY_CODES[e.keyCode] == "down")
        {
            if(tetris.player.dropInterval !== tetris.player.DROP_FAST)
               { 
                tetris.movePlayer();
                tetris.player.dropInterval = tetris.player.DROP_FAST;
               }
             
        }
        else
            tetris.movePlayer();
        
        e.preventDefault();
      }   }       
    },false);


    window.addEventListener('keyup',function(e){
        if(!tetris.player.gameOver)
        {
         if(tetris.KEY_CODES[e.keyCode]){
            ctrl.keys[tetris.KEY_CODES[e.keyCode]] =  false;
            if(tetris.KEY_CODES[e.keyCode] == "down")
        {
            tetris.player.dropInterval =  tetris.player.DROP_SLOW;
        }
            tetris.movePlayer();
            e.preventDefault();
      } } 
    },false);
} 

}