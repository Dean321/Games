var o_img, b_img, b, x, y, p_img, p;

function preload(){
  o_img = loadImage("sea.png");
  b_img = loadImage("ship.PNG");
  p_img = loadImage("p.PNG");
}

function setup() {
  createCanvas(600, 400);
  b = createSprite(500,210)
  b.addImage(b_img);
  b.scale=0.6;
  x=0;
  y=-width;
  p = createSprite(b.x-45,b.y+35  );
  p.addImage(p_img);
  p.scale=0.2
  p.mirrorX(-1);
  p.visible = false;
  
}

function draw() {
  background(220);
  p.x=b.x-45;
  p.y=b.y+35;
  if(b.y<150){
    b.y=150;
  }
  image(o_img, x, 0, width, height);
  image(o_img, y, 0, width, height);
  x+=3;
  y+=3;
  if(x>=width){
    x=-width
  }
  if(y>=width){
    y=-width
  }
  if(keyDown("up")&&b.y>=150){
    b.y-=2;
  }
  if(keyDown("down")&&b.y>=150){
    b.y+=2;
  }
  if(keyWentDown("space")){
    if(p.visible)
      p.visible = false
    else
      p.visible=true;
  }
  drawSprites();

}