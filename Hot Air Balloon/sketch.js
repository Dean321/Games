var a, db,a_pos, b_img, bg;

function preload(){
    bg = loadImage("bg.jpg");
    b_img = loadAnimation("1.png","2.png","3.png","4.png","5.png");
}

function setup(){
    createCanvas(1200, 800);
    a = createSprite(400, 400, 30, 30);
    a.addAnimation("fly",b_img);
    db = firebase.database();
    a_pos = db.ref('Position');
    a_pos.on("value", readPos, showErrorMsg);
    db.ref('size').on("value", function(data){
        a.scale = data.val().h;
    }, function(){})
}

function draw(){
    background(bg);
    a.setVelocity(0, 0);
    if(keyDown("up")){
        writePos(0, -5);
        changeHeight(-0.01);
    }
    if(keyDown("down")){
        writePos(0, 5);
        changeHeight(0.01);
    }
    if(keyDown("left")){writePos(-5, 0);}
    if(keyDown("right")){writePos(5, 0);}
    
    drawSprites();
}

function readPos(data){
    pos = data.val();
    a.x = pos.x;
    a.y = pos.y;
}

function writePos(x, y){
    db.ref('Position').set({
        'x': a.x+x,
        'y': a.y+y
    })
    
}

function showErrorMsg(){
    console.log("Error in writing to the database");
}

function changeHeight(p){
    console.log("changeHeight")
    var e = a.scale+p
    if(e>=0.5 && e<=2){
        db.ref("size").set({
            "h": e
        });
    }
    
}