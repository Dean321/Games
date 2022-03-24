class Player{
    constructor(){
        this.index = 0;
        this.name = "";
        this.score = 0;
        this.sprite = createSprite(30, height - 50);
        this.sprite.addImage(basket);
        this.sprite.scale = 0.5;
        this.sprite.visible = false;
        
    }

    updatePlayerName(){
        db.ref("players/player"+this.index).update({"name":this.name});
    }
    updatePlayerScore(){
        db.ref("players/player"+this.index).update({"score":this.score});
    }
    updatePlayerX(x){
        console.log("Updating X")
        db.ref("players/player"+this.index).update({"x":x});
    }
    getPlayerX(){
        //console.log("Fetching X")
        db.ref("players/player"+this.index+"/x").on("value",(d)=>{this.sprite.x = d.val();})
    }
    updatePlayerX(){
        db.ref("players/player"+this.index).update({"y":this.sprite.y});
    }
    
    
}