var db, gameState, game, player, form, playerCount, cars,
    allPlayers
    
function preload() {
  backgroundImage = loadImage("background.png");
  car1Img = loadImage("car1.png");
  car2Img = loadImage("car2.png");
  trackImg = loadImage("track.jpg")
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  cars = []
  db = firebase.database();
  gameState = 0
  game = new Game();
  game.getGameState()
  game.start()
}

function draw() {
  background(backgroundImage);
  if(playerCount == 2){
    game.updateGameState(1)
  }
  if(gameState == 1){
    game.play()
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
