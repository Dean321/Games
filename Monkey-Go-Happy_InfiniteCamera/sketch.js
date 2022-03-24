var monkey_running, monkey_jumping, monkey_collided, monkey, bg, x, y, z, flag, score,
    invisible_ground, b1g, b2g, b3g, b5g, b1, b2, b3, b5, obstaceImage, obstacleGroup,
    gameState, win, loose, condition, retry_img, retry_btn

function preload(){
    monkey_running = loadAnimation("Monkey/Run/Run1.png", "Monkey/Run/Run2.png", "Monkey/Run/Run3.png", "Monkey/Run/Run4.png", "Monkey/Run/Run5.png", "Monkey/Run/Run6.png", "Monkey/Run/Run7.png");
    monkey_jumping = loadAnimation("Monkey/Jump/Jump1.png", "Monkey/Jump/Jump2.png", "Monkey/Jump/Jump3.png", "Monkey/Jump/Jump4.png", "Monkey/Jump/Jump5.png", "Monkey/Jump/Jump6.png");
    monkey_collided = loadAnimation("Monkey/Collided.png");
    bg = loadImage("bg.png");
    b1 = loadImage("Bananas/Banana_1.png");
    b2 = loadImage("Bananas/Banana_2.png");
    b3 = loadImage("Bananas/Banana_3.png");
    b5 = loadImage("Bananas/Banana_5.png");
    obstaceImage = loadAnimation("Obstacles/CarnivorousClosed.png", "Obstacles/CarnivorousOpened.png");
    win = loadImage("Monkey/wins.png");
    loose = loadImage("Monkey/lost.png");
    retry_img = loadImage("retry.png");
}

function setup(){
    createCanvas(1200, 800);
    monkey = createSprite(0, 600, 20, 20);
    monkey.addAnimation("runs", monkey_running);
    monkey.addAnimation("jumps", monkey_jumping);
    monkey.addAnimation("die", monkey_collided);
    monkey.scale = 1;
    x = -width;
    y = 0;
    z = width;
    index = 1;
    flag =- 1;
    score = 0;
    invisible_ground = createSprite(monkey.x,700,100,10);
    invisible_ground.visible = false;
    b1g = new Group();
    b2g = new Group();
    b3g = new Group();
    b5g = new Group();
    obstacleGroup = new Group();
    gameState = "PLAY";
    scoreCheck = 0;
    condition = "";
    retry_btn = createSprite(camera.position.x+450, height-40);
    retry_btn.addImage(retry_img);
    retry_btn.scale = 0.5;
    retry_btn.visible = false;
}

function draw(){
    camera.position.x = monkey.x
    camera.position.y = 400
    background(0);
    image(bg, x, 0, width, height)
    image(bg, y, 0, width, height)
    image(bg, z, 0, width, height)
    if(flag==0){
        index+=3;
        flag=1
    }
    if(monkey.x>width*index && monkey.x<width*(index+1)){x = z+width;}
    if(monkey.x>width*(index+1) && monkey.x<width*(index+2)){y=x+width;}
    if(monkey.x>width*(index+2) && monkey.x<width*(index+3)){
        z=y+width;
        flag=0;
    }
    retry_btn.x = camera.position.x+450;
    if(gameState == "START"){

    }
    else if(gameState == "PLAY"){
        monkey.velocityX = 0;
        if (keyDown("right")) {monkey.velocityX=5;}
        if (monkey.y > 580) {
            monkey.changeAnimation("runs")
          }
          if (keyDown("space") && monkey.y > 450) {
            monkey.velocityY = -14;
            monkey.changeAnimation("jumps")
          }
        monkey.velocityY += 0.5;
        
        
        bananas();
        drawObstacles();
        if (monkey.overlap(b1g, removeBlocks)) {
            score += 1;
            scoreCheck = 0;
        } else if (monkey.overlap(b2g, removeBlocks)) {
            score += 2;
            scoreCheck = 0;
        } else if (monkey.overlap(b3g, removeBlocks)) {
            score += 3;
            scoreCheck = 0;
        } else if (monkey.overlap(b5g, removeBlocks)) {
            score += 5;
            scoreCheck = 0;
        }
        if(score % 10 == 0 && scoreCheck == 0){
            monkey.scale += 0.3
            scoreCheck = 1;
        }
        if(monkey.collide(obstacleGroup)){
            condition = "LOST";
            gameState = "END";
        }
        if(monkey.scale >=3.4){
            condition = "WIN";
            gameState = "END";
        }
    
    }
    else if(gameState == "END"){
        monkey.setVelocity(0,0);
        monkey.changeAnimation("die");
        textSize(40);
        strokeWeight(3);
        fill("red");
        stroke("red");
        monkey.scale = 1;
        if(condition == "LOST"){
            text("YOU LOST. TRY AGAIN", camera.position.x-150, 250);
            image(loose, camera.position.x-450, 100)
        }
        else{
            text("YOU WIN. WELL DONE", camera.position.x-150, 250);
            image(win, camera.position.x-450, 100)
        }
        retry_btn.visible = true;
        if(mouseIsOver(retry_btn) && mouseWentDown("leftButton")){
            monkey.x = width;
            obstacleGroup.destroyEach();
            b1g.destroyEach();
            b2g.destroyEach();
            b3g.destroyEach();
            b5g.destroyEach();
            score = 0;
            x = -width;
            y = 0;
            z = width;
            index = 1;
            flag =- 1;
            monkey.changeAnimation("runs");
            gameState = "PLAY";
        }
        
    }
    invisible_ground.x = monkey.x;
    monkey.collide(invisible_ground);
    drawSprites();
    noStroke();
    textSize(30);
    fill("white")
    text("Press Spacebar to jump\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\tFoodCount: " + score+"\nPress right-arrow key to move forward", monkey.x-500, 30);
}

function bananas(){
    if (frameCount % 80 == 0) {
        var banana = createSprite(camera.position.x + width, Math.round(random(200, height - 150)), 10, 10);
        var rn = Math.round(random(1, 4));
        switch (rn) {
          case 1:
            banana.addImage(b1);
            b1g.add(banana);
            break;
          case 2:
            banana.addImage(b2);
            b2g.add(banana);
            break;
          case 3:
            banana.addImage(b3);
            b3g.add(banana);
            break;
          case 4:
            banana.addImage(b5);
            b5g.add(banana);
            break;
        }
        banana.scale = 0.3;
        banana.rotationSpeed = 2;
        banana.lifetime = width / 3;
      }
}

function removeBlocks(s1, s2){
    s2.remove();
}

function drawObstacles() {
    if (frameCount % 300 == 0) {
      var obstacle = createSprite(camera.position.x + width, height - 165, 10, 10);
      obstacle.addAnimation("eater", obstaceImage);
      obstacle.scale = 1.5;
      obstacle.lifetime = width / 2;
      obstacleGroup.add(obstacle);
    }
  }
  