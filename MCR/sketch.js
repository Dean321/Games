var db, gameState=0, player, playerCount=null, form, game,
    cars = [], car1, car2, c1_img, c2_img, track_img

function preload(){
    c1_img = loadImage("car1.png");
    c2_img = loadImage("car2.png");
    track_img = loadImage("track.png")
}

function setup() {
    createCanvas(displayWidth, displayHeight);
    db = firebase.database();
    game = new Game();
    game.getGameState();
    game.start();
}


function draw(){
    
    if(playerCount==2){
        gameState = 1;
    }
    if(gameState==1){
        game.updateGameState();
        game.play();
        drawSprites()
    }
}