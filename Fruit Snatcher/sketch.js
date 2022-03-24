
var apple, orange, banana, basket, carrot, grapes,
    pear, play, db, gameState=0, bg, playButton, input,
    playerCount=0, player, edges, fruitgrp, reset_btn, reset_img;

function preload(){
    apple = loadImage("apple.png");
    orange = loadImage("orange.png");
    banana = loadImage("banana.png");
    carrot = loadImage("carrot.png");
    grapes = loadImage("grapes.png");
    pear = loadImage("pear.png");
    play = loadImage("play.png");
    basket = loadImage("basket.png");
    bg = loadImage("images.jpg");
    reset_img = loadImage("retry.png");
}

function setup(){
    createCanvas(600, 400);
    db = firebase.database();
    getPlayerCount();
    getGameState();
    edges = createEdgeSprites();
    fruitgrp = new Group();
    namefeild = createInput("Enter Name Here");
    namefeild.position(width/2-80, height/2);
    namefeild.hide();
    button = createSprite(width/2+10 , height/2 + 50);
    button.addImage(play);
    button.visible = false;
    button.scale = 0.5;
    reset_btn = createSprite(width/2, 80)
    reset_btn.addImage(reset_img);
    reset_btn.scale=0.2;
    reset_btn.visible = false;
}

function draw(){
    background(0);
    image(bg, 0, 0, width, height)
    fill(0)
    rect(width/2-140, 20, 280, 40)
    textSize(30);
    fill(255)
    stroke(255)
    strokeWeight(3)
    text("FRUIT SNATCHER", width/2 - 130, 50);
    console.log(gameState, playerCount)
    if(gameState == 0){
        if(player!=undefined)
        player.sprite.visible=false;
        reset_btn.visible=false;
        namefeild.show();
        button.visible = true;
        if(mouseIsOver(button) && mouseWentDown("leftButton")){
            player=new Player();
            player.name = this.namefeild.value();
            playerCount+=1;
            updatePlayerCount();
            player.index = playerCount;
            player.updatePlayerName();
            namefeild.hide();
            button.visible = false;
            if(playerCount==2){
                gameState = 1
            }
            else{
                gameState = 1.5;
            }
            
        }
    }
    if(gameState == 1.5){
        textSize(45);
        stroke("red");
        fill("red");
        strokeWeight(3);
        text("Waiting for 2nd Player", 100, height/2);
        if(playerCount == 2){
            gameState = 1;
        }
    }
    drawSprites();
    if(gameState == 1){
        updateGameState()
        player.sprite.visible = true;
        player.sprite.collide(edges);
        if(keyDown("left")){
            db.ref("players/player"+player.index).update({"x":player.sprite.x-5});
        }
        if(keyDown("right")){
            db.ref("players/player"+player.index).update({"x":player.sprite.x+5});
        }
        player.sprite.collide(fruitgrp, callback);
        player.getPlayerX();
        createFruits();
        drawScores();
        reset_btn.visible=true;
        if(mouseIsOver(reset_btn) && mouseWentDown("leftButton")){
            resetEverything()
        }
    }
    
    
}

function updatePlayerCount(){
    db.ref("/").update({"playerCount":playerCount});
}

function getPlayerCount(){
    db.ref("playerCount").on("value",function(d){playerCount = d.val();});
}

function getGameState(){
    db.ref("gameState").on("value", function(d){gameState = d.val();});
}

function updateGameState(){
    db.ref("/").update({"gameState":gameState});
}

function createFruits(){
    if(frameCount % 75 == 0){
        var fruit = createSprite(Math.round(random(30,width-30)), 0);
        fruit.velocityY = 3;
        fruit.lifetime = height/3 + 50;
        var r = Math.round(random(1,6));
        switch(r){
            case 1: fruit.addImage(carrot);break;
            case 2: fruit.addImage(apple);break;
            case 3: fruit.addImage(orange);break;
            case 4: fruit.addImage(banana);break;
            case 5: fruit.addImage(grapes);break;
            case 6: fruit.addImage(pear);break;
        }
        fruit.scale = 0.3;
        fruitgrp.add(fruit);
    }
}

function callback(s1,s2){
    s2.remove();
    player.score+=1;
    player.updatePlayerScore();
}

function drawScores(){
    textSize(30)
    fill(255)
    stroke(255)
    strokeWeight(2)
    text(player.name.substr(0,7), player.sprite.x - 50, player.sprite.y+10);

    var s1, s2;
    db.ref("players/player1/score").on("value", function(d){s1=d.val();});
    db.ref("players/player2/score").on("value", function(d){s2=d.val();});
    
    text(40)
    fill("red")
    stroke("red")
    strokeWeight(3)
    text(s1, 50, 50);
    text(s2, width-100, 50);

}

function resetEverything(){
    playerCount = 0;
    gameState = 0;
    db.ref("/").update({"gameState":0, "playerCount":0});
    db.ref("players/player1").update({"name":"","score":0,"x":0,"y":0});
    db.ref("players/player2").update({"name":"","score":0,"x":0,"y":0});
    player.sprite.visible=false;
    fruitgrp.destroyEach();
    
}