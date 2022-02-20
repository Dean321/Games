
var outsideTheCave, insideTheCave, closingTheCave,
    gameState, canvas, x, y, system, security, code,
    score, slbl, locker, index, energy, enters, lost, 
    start, context, flames

function preload() {
  start = loadSound("first.mp3");
  enters = loadSound("enters.mp3");
  lost = loadSound("lost.mp3");

}

function setup() {
  canvas = createCanvas(1400, 800);
  flames = createImg("flames.gif");
  flames.position(width/2, -20);

  x = displayWidth / 2 - 700
  y = displayHeight / 2 - 410
  canvas.position(x, y)
  outsideTheCave = createImg("cave.gif");
  outsideTheCave.position(x , y);
  outsideTheCave.size(width, height);



  gameState = 0;
  score = 0;
  index = 0;
  security = new Security();
  system = new System();

  slbl = createElement("h2");
  slbl.style("color","yellow")
  slbl.position(900, 130);
  
  locker = [0,0,0]
  start.play();
  context = new AudioContext();
}

function draw() {
  background(0);
  if(touches.length>0){
    context.resume();
  }
  slbl.html("Score : "+score);
  if(gameState == 0){
    security.display();
    if(locker[0]==1 && locker[1]==1 && locker[2]==1){
      start.stop();
      if(score==3){
        enters.play();
        outsideTheCave = createImg("enters.gif");
        gameState = 1;
      }
      else{
        lost.play();
        outsideTheCave = createImg("lost (1).gif");
        gameState = 2;
      }
    }
  }
  else if(gameState == 1){
    outsideTheCave.position(x , y);
    outsideTheCave.size(width, height);
  }
  else if(gameState == 2){
    outsideTheCave.position(x , y);
    outsideTheCave.size(width, height);
  }
  
  drawSprites();
}