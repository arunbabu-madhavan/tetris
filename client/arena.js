class Arena{
    
/* Creates a matrix and fills with zero*/
    constructor(w,h){
       const matrix = [];
    while(h--)
    {
        matrix.push(new Array(w).fill(0));
    }
    this.matrix = matrix;
    this.events = new Events();
    }

clear(){
    this.matrix.forEach(row => row.fill(0));
    this.events.emit('matrix',this.matrix);
}


/* Check for collision with arena*/
collide(player)
{
    const [m,o] = [player.matrix,player.pos];

    for(let y=0;y<m.length;y++){
        for(let x=0;x<m[y].length;x++){
            if(m[y][x]!=0 
                && (this.matrix[o.y + y] && this.matrix[o.y + y][o.x + x]) !=0){
                    return true;
                }
        }
    }
    return false;
}


/* merge the piece with arena*/
merge(player)
{
    player.matrix.forEach((row,y)=>{
        row.forEach((value,x)=>{
            if(value !== 0){
                this.matrix[y + player.pos.y][x + player.pos.x] = value;
            }
        });
    });
    this.events.emit('matrix',this.matrix);
}

// sweep filled rows
sweep(player)
{
    let rowCounter = 1
    outer: for(let y=this.matrix.length -1; y >= 0; --y)
    {
        for(let x=0;x<this.matrix[y].length;++x){
            if(this.matrix[y][x] === 0){
                continue outer;
            }
        }
    
        const row = this.matrix.splice(y,1)[0].fill(0);
        player.score += rowCounter * 10; //update score
        rowCounter*=2;
        y++;
        this.matrix.unshift(row);
        this.events.emit('matrix',this.matrix);
    }
}


}

