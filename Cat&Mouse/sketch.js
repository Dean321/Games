var bg_img,
    cat1_img, cat2_img, cat,
    rat1_img, rat2_img, rat

function preload(){
  bg_img = loadImage("bg.PNG");
  cat1_img = loadImage("t1.png");
  cat2_img = loadImage("t2.png");
  rat1_img = loadImage("j1.png");
  rat2_img = loadImage("j2.png");
}

function setup() {
  createCanvas(800,800);
  cat = createSprite(590,490);
  cat.addImage(cat1_img);
  cat.scale = 0.7;
  rat = createSprite(-60,490);
  rat.addImage(rat1_img);
  rat.mirrorX(-1);
  rat.scale = 0.5;
  rat.velocityX=3;
  
}
 
function draw() {
  background(0);  
  image(bg_img, 0, 0, width, height);
  if(cat.x-rat.x<=cat.width/2+rat.width/2){
    rat.velocityX=0;
    rat.x = 450;
    rat.addImage(rat2_img);
    rat.mirrorX(1);
    rat.scale = 0.4;
    cat.addImage(cat2_img);
    cat.scale = 0.6;
  }
  drawSprites();
}