

class ConnectionManager
{
    constructor(tetrisManager)
    {
        this.conn = null;
        this.peers = new Map;
        this.tetrisManager = tetrisManager;
        this.localTetris = [...tetrisManager.instances][0];
    }

    connect(address)
    {
        this.conn = new WebSocket(address);

        this.conn.addEventListener('open',()=>{
            console.log('connection established');
            this.initSession();
            this.watchEvents();
        });

        this.conn.addEventListener('message',event => {
            console.log('Recieved message',event.data);
            this.receive(event.data);
        });
    }

    send(data){
        const msg = JSON.stringify(data);
        this.conn.send(msg);
    }

    initSession(){
        const sessionId =  window.location.hash.split('#')[1];
        const state = this.localTetris.serialize();
        if(sessionId){
            this.send({
                        type:'join-session',
                        id:sessionId,
                        state
                    })
        }
        else{
            this.send({type:'create-session',  state});
        }
    }

    updateManager(peers){
        const me = peers.you;
        const clients = peers.clients.filter(client=> me!=client.id);
      
        clients.forEach(client=> {
            if(!this.peers.has(client.id)){
                const tetris = this.tetrisManager.createPlayer();
                this.peers.set(client.id,tetris);
                tetris.unserialize(client.state);
            }
        });

        [...this.peers.entries()].forEach(([id,tetris]) => {
            if(!clients.some(client =>client.id  === id)){
                this.tetrisManager.removePlayer(tetris);
                this.peers.delete(id);
            }
        });

        const playerTetri = peers.clients.map(client => 
            this.peers.get(client.id) || this.localTetris);

        this.tetrisManager.sortPlayers(playerTetri);
    } 

    receive(msg){
        const data = JSON.parse(msg);
        if(data.type === 'session-created'){
            window.location.hash = data.id;
        }
        else if(data.type === 'session-broadcast'){
            this.updateManager(data.peers);
        }
        else if(data.type === 'state-update'){
            this.updatePeer(data.clientId,data.fragment,data.state);
        }
    }

    updatePeer(id, fragment, [prop,value]){
        if(!this.peers.has(id)){
            console.log('client does not exist');
            return;
        }

        const tetris = this.peers.get(id);
        tetris[fragment][prop] = value;

        if(prop === 'score')
        {
            tetris.updateScore(value); 
        }
       
            tetris.draw();
        
    }

    watchEvents()
    {
        const local = this.localTetris;
        const player = local.player;

        ['pos','score','matrix','nextMatrix'].forEach(prop =>{
            player.events.listen(prop,value =>{
                this.send({
                    type:'state-update',
                    fragment:'player',
                    state:[prop,value]
                });
            });
        });

        const arena = local.arena;

        ['matrix'].forEach(prop =>{
            arena.events.listen(prop,value =>{
                this.send({
                    type:'state-update',
                    fragment:'arena',
                    state:[prop,value]
                });
            });
        });


    }
}