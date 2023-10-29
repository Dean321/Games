class Game{
    constructor(){
        
    }
    getGameState(){
        db.ref("gameState").on("value", function(d){gameState = d.val();}, function(){});
    }
    updateGameState(){
        db.ref("/").update({"gameState":gameState});
    }
    async start(){
        if(gameState == 0){
            player = new Player();
            playerCount = await db.ref("playerCount").once("value");
            if(playerCount.exists()){
                playerCount = playerCount.val();
                form = new Form();
                form.startpage();
            }
        }
        car1 = createSprite(100, displayHeight*4);
        car1.addImage(c1_img);
        car2 = createSprite(width-200, displayHeight*4);
        car2.addImage(c2_img);
        cars = [car1, car2];
    }
    play(){
        form.hide();
        image(track_img, 0, -displayHeight*2, displayWidth, displayHeight*8);
        camera.position.x = cars[player.index-1];
            camera.position.y = cars[player.index-1];
        if(keyDown("up")){
            player.distance+=50;
            cars[player.index-1].y = displayHeight-player.distance;
            
            player.updatePlayerDistance()
            
        }
        
    }
    stop(){

    }
}