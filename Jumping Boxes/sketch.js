var ball, a, b, c, d, edges, temp,
    go, d_img, t_img, s_img, di_img,
    d_sn, di_sn, s_sn, t_sn, sc_img,
    context;

function preload(){
  d_img = loadImage("delicious.png");
  d_sn = loadSound("delicious.mp3");
  t_img = loadImage("Tasty.png");
  t_sn = loadSound("tasty.mp3");
  di_img = loadImage("divine.png");
  di_sn = loadSound("divine.mp3");
  s_img = loadImage("sweet.png");
  s_sn = loadSound("sweet.mp3");
  sc_img = loadImage("sugarRush.png")
}

function setup() {
  createCanvas(850, 800);
  context = new AudioContext();
  a = createSprite(110, 780, 200, 20);
  a. shapeColor = "#F90409";
  b = createSprite(320, 780, 200, 20);
  b. shapeColor = "#11F904 ";
  c = createSprite(530, 780, 200, 20);
  c. shapeColor = "#04E6F9";
  d = createSprite(740, 780, 200, 20);
  d. shapeColor = "#F1FA1E ";
  ball = createSprite(width/2, 0, 30, 30);
  ball.shapeColor = "#FF6200";
  ball.setVelocity(8,12);
  edges = createEdgeSprites();
  temp = "yellow";
  go = createSprite(width/2, height/2);
  go.addImage(sc_img);

}
 
function draw() {
  if(touches.length>0){
    context.resume();
  }
  background("#F59FCE");  
  ball.bounceOff(edges);
  
  if(ball.bounceOff(a)){
    ball.shapeColor = a.shapeColor;
    go.addImage(di_img);
    stopMusic();
    di_sn.play();
  }
  if(ball.bounceOff(b)){
    ball.shapeColor = b.shapeColor;
    go.addImage(d_img);
    stopMusic();
    d_sn.play();
  }
  if(ball.bounceOff(c)){
    ball.shapeColor = c.shapeColor;
    go.addImage(s_img);
    stopMusic();
    s_sn.play();
  }
  if(ball.bounceOff(d)){
    ball.shapeColor = d.shapeColor;
    go.addImage(t_img);
    stopMusic();
    t_sn.play();
  }
  drawSprites();
  textSize(30);
  text("Tap on the screen for Music to play on box jumping",100,40);
}

function stopMusic(){
  if(di_sn.isPlaying())
  di_sn.stop();
  if(d_sn.isPlaying())
  d_sn.stop();
  if(s_sn.isPlaying())
  s_sn.stop();
  if(t_sn.isPlaying())
  t_sn.stop();
}
