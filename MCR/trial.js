var gameState=0, playerCount, player, cars=[], car1, car2, car3, car4, playerInfo,
    textfeild, label, greeting, button, db, GST = 0, raceTrack, c1, c2, c3, c4

function preload(){
    raceTrack = loadImage("track.jpg");
    c1 = loadImage("car1.png");
    c2 = loadImage("car2.png");
    c3 = loadImage("car3.png");
    c4 = loadImage("car4.png");

}

function setup(){
    createCanvas(displayWidth, displayHeight);
    db = firebase.database();

    label = createElement("h1");
    label.position(width/2 - 200, 50);
    label.html("ARENA RACER");
    //label.hide();

    textfeild = createInput("Enter Name Here");
    textfeild.position(width/2 -170 , 250);
    textfeild.hide();

    button = createButton("START");
    button.position(width/2 - 100, 300);
    button.hide();

    greeting = createElement("h2");
    greeting.position(width/2 - 200, height/2);
    greeting.hide();
    
    db.ref("gameState").on("value", readGS);
    db.ref("playerCount").on("value", readPlayerCount);

    car1 = createSprite(520, 1000);
    car1.addImage(c1);
    car1.visible = false;
    car2 = createSprite(820, 1000);
    car2.addImage(c2);
    car2.visible = false;
    car3 = createSprite(1120, 1000);
    car3.addImage(c3);
    car3.visible = false;
    car4 = createSprite(1420, 1000);
    car4.addImage(c4);
    car4.visible = false;
    cars = [car1, car2, car3, car4];

}

function draw(){
    background(220);
    if(gameState == 0){
        if(playerCount==4){
            writeGS(1);
        }
        textfeild.show();
        button.show();
        button.mousePressed(function(){
            textfeild.hide();
            button.hide();
            var name = textfeild.value();
            playerCount+=1;
            writePlayerCount();
            player = new Player();
            player.index = playerCount;
            player.name = name;
            player.updatePlayerName();
            greeting.show();
            greeting.html("Welcome Player"+player.index+" : "+player.name);
            GST = 1;
        })
        if(GST==1){
            textfeild.hide();
            button.hide();
        }
        
    }
    else if(gameState == 1){
        car1.visible = true;
        car2.visible = true;
        car3.visible = true;
        car4.visible = true;
        console.log("80 "+cars)
        greeting.hide();
        label.hide();
        image(raceTrack, 0, -displayHeight*4, displayWidth, displayHeight*8);
        Player.getPlayerInfo();
        if(playerInfo != undefined){
            var index=0, y, x;
            for(var plr in playerInfo){
                index+=1;
                console.log(cars[index-1])
                cars[index - 1].y = displayHeight - playerInfo[plr].distance;
                if(plr == "Player" + player.index){
                    stroke("red");
                    fill("red");
                    ellipse(cars[index-1].x, cars[index-1].y, 60, 60);
                    if(player.distance<4600){
                        camera.position.x = width/2;
                        camera.position.y = cars[index-1].y
                    }
                } 
            }  
        }
        if(keyIsDown(UP_ARROW) && player.index != 0 && player.distance<5050){
            player.distance += 50;
            player.updatePlayerDistance();
        }
        if(player.distance>4600){
            greeting.show();
            greeting.html("GAME OVER");
            //gameState = 2;
        }
        drawSprites();

        
    }
    else if(gameState == 2){
            
    }
    
    fill(255);
    textSize(30);
    text(mouseX+","+mouseY, mouseX, mouseY);
    
    
    
}

function readGS(d){gameState = d.val();}

function readPlayerCount(d){playerCount = d.val();}

function writeGS(g){
    db.ref("/").update({"gameState":g});
}

function writePlayerCount(){
    db.ref("/").update({"playerCount":playerCount});
}
