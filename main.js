const canvas = document.getElementById("tetris");
// const context = canvas.getContext('2d');
const canvasnxt = document.getElementById("nextPiece");
// const contextnxt = canvasnxt.getContext('2d');
var  hastouch = ('ontouchstart' in window);
const pieces = "ILOJSZT";
const keycodes = //[ 
    { 37:'left', 39:'right', 32 :'fall', 38:'rotate', 40:'down' }
                //  { 65:'left', 68:'right', 88 :'fall', 87:'rotate', 83:'down' }
            //    ]
            ;


const tetrismanager = new TetrisManager(document);

const playerElements = document.querySelectorAll('.player');








