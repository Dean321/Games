var fixedRect, movingRect;
function setup() {
  createCanvas(400,400,20,20);
  fixedRect = createSprite(200,200,150,50); 
  movingRect = createSprite(200, 196, 50, 150);
  flag = 0;
}
 
function draw() {
  background("lightblue");  
  fixedRect.x = mouseX;
  fixedRect.y = mouseY;
  f = fixedRect.x-movingRect.x ;
  g = movingRect.x-fixedRect.x;
  h = fixedRect.x+(fixedRect.width/2+movingRect.width/2);
  if(movingRect.x-fixedRect.x < fixedRect.width/2+movingRect.width/2
    && fixedRect.x-movingRect.x < fixedRect.width/2+movingRect.width/2
    && movingRect.y-fixedRect.y < fixedRect.width/2+movingRect.width/2
    && fixedRect.y-movingRect.y < fixedRect.width/2+movingRect.width/2
    ){
    flag="R";
    fixedRect.shapeColor = "red";
    movingRect.shapeColor = "red";
  }
  else{
    fixedRect.shapeColor = "green";
    movingRect.shapeColor = "green";
  }
  text(movingRect.x+" "+movingRect.y+" "+fixedRect.x+" "+fixedRect.y, 300,350);
  
  text(f+" "+g+"\t"+h,300,300);
  drawSprites();
}
