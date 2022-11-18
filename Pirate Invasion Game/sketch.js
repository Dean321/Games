var myEngine,
  myWorld,
  bgImg,
  tower,
  towerImg,
  cannon,
  cannonBall,
  ground,
  angle,
  cannonBalls,
  boat,
  boats,
  boatData,
  boatImg,
  brokenBoatData,
  brokenBoatImg,
  waterData,
  waterImg,
  boatAnimation,
  brokenBoatAnimation,
  waterAnimation,
  isGameOver,
  isLaughing,
  swalFlag,
  onceFlag,
  backgroundMusic,
  waterSound,
  pirateLaughSound,
  cannonExplosion,
  score;

function preload() {
  bgImg = loadImage("./assets/background.gif");
  towerImg = loadImage("./assets/tower.png");
  waterImg = loadImage("./assets/waterSplash/waterSplash.png");
  waterData = loadJSON("./assets/waterSplash/waterSplash.json");
  boatData = loadJSON("./assets/boat/boat.json");
  boatImg = loadImage("./assets/boat/boat.png");
  brokenBoatData = loadJSON("./assets/boat/broken_boat.json");
  brokenBoatImg = loadImage("./assets/boat/broken_boat.png");
  backgroundMusic = loadSound("./assets/background_music.mp3");
  waterSound = loadSound("./assets/cannon_water.mp3");
  pirateLaughSound = loadSound("./assets/pirate_laugh.mp3");
  cannonExplosion = loadSound("./assets/cannon_explosion.mp3");
}

function setup() {
  createCanvas(1200, 600);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  angleMode(DEGREES);
  imageMode(CENTER);
  myEngine = Matter.Engine.create();
  myWorld = myEngine.world;
  angle = 15;
  ground = Matter.Bodies.rectangle(width / 2, height - 5, width, 10, {
    isStatic: true,
  });
  tower = Matter.Bodies.rectangle(175, 340, 150, 320, { isStatic: true });
  Matter.World.add(myWorld, [tower, ground]);
  cannon = new Cannon(210, 130, 140, 110, angle);
  cannonBalls = [];
  boats = [];
  boatAnimation = [];
  brokenBoatAnimation = [];
  waterAnimation = [];
  for (var i = 0; i < boatData.frames.length; i++) {
    boatAnimation.push(
      boatImg.get(
        boatData.frames[i].position.x,
        boatData.frames[i].position.y,
        boatData.frames[i].position.w,
        boatData.frames[i].position.h
      )
    );
  }
  for (var i = 0; i < brokenBoatData.frames.length; i++) {
    brokenBoatAnimation.push(
      brokenBoatImg.get(
        brokenBoatData.frames[i].position.x,
        brokenBoatData.frames[i].position.y,
        brokenBoatData.frames[i].position.w,
        brokenBoatData.frames[i].position.h
      )
    );
  }
  for (var i = 0; i < waterData.frames.length; i++) {
    waterAnimation.push(
      waterImg.get(
        waterData.frames[i].position.x,
        waterData.frames[i].position.y,
        waterData.frames[i].position.w,
        waterData.frames[i].position.h
      )
    );
  }
  isGameOver = false;
  isLaughing = false;
  swalFlag = false;
  onceFlag = false;
  score = 0;
}

function draw() {
  background("lightblue");
  Matter.Engine.update(myEngine);
  image(bgImg, width / 2, height / 2, width, height);
  cannon.display();
  image(towerImg, tower.position.x, tower.position.y, 150, 320);
  for (var i = 0; i < cannonBalls.length; i++) {
    showCannonBalls(cannonBalls[i], i);
    collisionWithBoat(i);
  }
  showBoats();
  if (isGameOver && !onceFlag) {
    swalFlag = true;
    onceFlag = true;
  }
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
    backgroundMusic.setVolume(0.5);
  }

  fill("#6d4c41");
  textSize(32);
  text("Score: " + score, width - 200, 50);
  textAlign(CENTER, CENTER);
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    cannonBalls.push(cannonBall);
    cannonExplosion.play();
  }
}

function keyReleased() {
  if (keyCode === DOWN_ARROW && !isGameOver) {
    cannonBalls[cannonBalls.length - 1].shoot();
  }
}

function showBoats() {
  if (boats.length > 0) {
    if (
      boats[boats.length - 1] === undefined ||
      boats[boats.length - 1].body.position.x < width - 300
    ) {
      var offsets = [-20, -40, -60];
      var choosenOffset = random(offsets);
      boat = new Boat(width - 30, 470, 160, 190, choosenOffset, boatAnimation);
      boats.push(boat);
    }
    for (var i = 0; i < boats.length; i++) {
      if (boats[i]) {
        Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
        boats[i].display();
        boats[i].animate();
        var collision = Matter.SAT.collides(tower, boats[i].body);
        if (collision.collided && !boats[i].isBroken) {
          if (!isLaughing && !pirateLaughSound.isPlaying()) {
            pirateLaughSound.play();
            isLaughing = true;
          }
          isGameOver = true;
          gameOver();
        } else {
          boats[i];
        }
      }
    }
  } else {
    boat = new Boat(width, 470, 160, 190, -20, boatAnimation);
    boats.push(boat);
  }
}
function collisionWithBoat(id) {
  for (var i = 0; i < boats.length; i++) {
    if (cannonBalls[id] !== undefined && boats[i] !== undefined) {
      var flag = Matter.SAT.collides(cannonBalls[id].body, boats[i].body);
      if (flag.collided) {
        if (!boats[i].isBroken && !cannonBalls[id].isSink) {
          score += 5;
          boats[i].remove(i);
          i--;
        }
      }
    }
  }
}

function showCannonBalls(ball, index) {
  if (ball) {
    ball.display();
    ball.animate();
    if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
      if (!waterSound.isPlaying()) {
        waterSound.play();
      }
      ball.remove(index);
    }
  }
}

function gameOver() {
  if (swalFlag) {
    swal
      .fire({
        title: "YOU LOST!!",
        text: "Game Over. Try Again",
        imageUrl:
          "https://raw.githubusercontent.com/whitehatjr/PiratesInvasion/main/assets/boat.png",
        imageWidth: 400,
        imageHeight: 400,
        confirmButtonText: "Play Again",
      })
      .then((result) => {
        if (result.isConfirmed) {
          location.reload();
        }
      });
    swalFlag = false;
  }
}
