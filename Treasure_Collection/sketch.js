var p_img, r_img, p, x, y, a, b,
  c_img, c, b_img, b, b_grp, c_grp,
  score, gameState, edges, go_img,
    go;

function preload() {
  p_img = loadAnimation("p1.png",
    "p2.png",
    "p3.png");
  r_img = loadImage("road.jpg");
  c_img = loadAnimation("c1.png",
    "c2.png",
    "c3.png",
    "c4.png",
    "c5.png");
  b_img = loadImage("bomb.png");
  go_img = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight); // 400, 600
  a = createSprite(30, height/2, 10, height);
  a.visible = false;
  b = createSprite(width-30, height/2, 10, height);
  b.visible = false;
  p = createSprite(width/2, height-50);
  p.addAnimation("runs", p_img)
  x = 0;
  y = -height;
  b_grp = new Group();
  c_grp = new Group();
  score = 0;
  gameState = 0;
  edges = createEdgeSprites();
  go = createSprite(width/2, height/2);
  go.addImage(go_img);
  go.visible=false;
}

function draw() {
  background(220);
  if (gameState == 0) {
    bombs();
    coins();
    x += 5;
    y += 5;
    if (x >= height-4) {
      x = -height+y
    }
    if (y >= height-4) {
      y = -height+x
    }
    p.x = mouseX;
    if (p.overlap(c_grp, remove1)) {
      score += 1;
    }
    if(p.overlap(b_grp,remove1)){
      gameState = 1;
    }
    
  } else if (gameState == 1) {
    c_grp.setVelocityYEach(0);
    b_grp.setVelocityYEach(0);
    c_grp.setLifetimeEach(-1);
    b_grp.setLifetimeEach(-1);
    go.visible = true;
  }

  p.collide(b);
  p.collide(a);
  image(r_img, 0, x, width, height);
  image(r_img, 0, y, width, height);
  p.collide(edges[3]);
  drawSprites();
  fill(0);
  rect(width-95,15,50,50)
  fill(255);
  textSize(40);
  text(" "+score, width-100, 54)
}

function remove1(s1, s2) {
  s2.remove();
}

function coins() {
  if (frameCount % 200 == 0) {
    r = Math.round(random(100, width-100))
    n = Math.round(random(1,6))
    for (var i = 1; i < n; i++) {
      c = createSprite(r, -i * 80);
      c.addAnimation("coins", c_img);
      c.scale = 0.2;
      c.velocityY = 5;
      c.lifetime = width / 5 + 50;
      c.depth = p.depth;
      c_grp.add(c);
    }
  }
}

function bombs() {
  if (frameCount % 240 == 0) {
    b = createSprite(Math.round(random(100, width-120)), -60);
    b.addImage(b_img);
    b.scale = 0.4;
    b.velocityY = 5;
    b.rotationSpeed = 3;
    b.lifetime = width / 5 + 50;
    b.depth = p.depth;
    b_grp.add(b);
  }
}