class Player{
    constructor(){
        this.name = "";
        this.index = 0;
        this.distance = 0;
    }
    updatePlayerName(){
        db.ref("players/Player"+this.index).update({"name":this.name});
    }
    updatePlayerDistance(){
        db.ref("players/Player"+this.index).update({"distance":this.distance});
    }
    getPlayerDistance(){
        db.ref("players/Player"+this.index+"/distance").on("value", function(d){this.distance = d;}, function(){});
    }
    getPlayerName(){
        db.ref("players/Player"+this.index+"/name").on("value", function(d){this.name = d;}, function(){});
    }
    getPlayerCount(){
        db.ref("playerCount").on("value", function(d){playerCount = d.val();}, function(){});
    }
    updatePlayerCount(){
        db.ref("/").update({"playerCount":playerCount});
    }
    static getPlayerInfo(){
        db.ref("players").on("value",function(d){playerInfo = d.val();});
    }
}