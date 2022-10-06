var ghost, ghost_jump, ghost_climb, 
    windowImg, windowpane, windowGroup,
    i1, i2, tower, gameState, paneGroup,
    gameOverImg, gameOver, bgSound, gameOverSound,
    flag, logo
function preload(){
    ghost_jump = loadAnimation("ghost-jumping.png")
    ghost_climb = loadAnimation("ghost-standing.png")
    windowImg = loadImage("door.png")
    windowpane = loadImage("climber.png")
    tower = loadImage("tower.png")
    gameOverImg = loadImage("GameOver.png")
    gameOverSound = loadSound("GameOver.mp3")
    bgSound = loadSound("Background.mp3")
    
}

function setup(){
    createCanvas(600, 800)
    i1 = 0
    i2 = -height 
    ghost = createSprite(width/2, height/2)
    ghost.addAnimation("climb", ghost_climb)
    ghost.addAnimation("jump", ghost_jump)
    ghost.scale = 0.4
    // ghost.debug = true
    ghost.setCollider("rectangle",0,0,150,280)
    windowGroup = new Group()
    paneGroup = new Group()
    gameState = 0
    bgSound.play()
    flag = 0
    gameOver = createSprite(width/2, height/2)
    gameOver.addImage(gameOverImg)
    gameOver.visible = false
}

function draw(){
    background(0)
    image(tower, 0, i1, width, height)
    image(tower, 0, i2, width, height)
    
    if(gameState==0){
        flag = 0
        i1+=3
        i2+=3
        if(i1>height){
            i1=-height+i2
        }
        if(i2>height){
            i2=-height+i1
        }
        ghost.velocityX=0
        ghost.changeAnimation("climb");
        if(keyDown("left")){
            ghost.velocityX=-3
            ghost.changeAnimation("jump");
            ghost.mirrorX(ghost.mirrorX() * -1);
        }
        if(keyDown("right")){
            ghost.velocityX=3
            ghost.changeAnimation("jump");
            ghost.mirrorX(ghost.mirrorX() * -1);
        }
        if(keyDown("up")){
            ghost.velocityY=-8
        }
        ghost.velocityY+=0.2
        drawWindows()
        ghost.collide(windowGroup)
        if(ghost.y>height){
            gameState = 1
        }
    }
    else{
        windowGroup.destroyEach()
        paneGroup.destroyEach()
        if(flag==0){
            bgSound.stop()
            gameOverSound.play()
            flag = 1
        }
        gameOver.visible = true
    }
    drawSprites()
}

function drawWindows(){
    if(frameCount % 100 == 0){
        var x = Math.round(random(110,width-110))
        
        var w = createSprite(x, -165)
        w.addImage(windowImg)
        
        var p = createSprite(x, -100)
        p.addImage(windowpane)
        
        w.velocityY=3
        p.velocityY=3
        
        p.lifetime=height/3+100
        w.lifetime=height/3+100
        
        p.depth = ghost.depth
        w.depth = ghost.depth
        ghost.depth += 1

        windowGroup.add(p)
        paneGroup.add(w)
        // p.debug = true
    }
}