var dog_stand_img, dog_eat_img, dog,
    happyDog, database, foodS, foodStock,f,
    time, time_text;

function preload(){
  dog_stand_img = loadImage("images/dogImg.png");
  dog_eat_img = loadImage("images/dogImg1.png");
  milk_img = loadImage("images/milk.png");
}

function setup() {
  createCanvas(1000, 500);
  time = new Date();
  time_text = ""
  dog = createSprite(850, 250);
  dog.addImage(dog_stand_img);
  dog.scale = 0.2;
  database = firebase.database();
  // f = new Food();
  database.ref('food').on("value",function(data){foodStock = data.val();});
  database.ref("lastFeedTime").on("value",function(data){time_text = data.val();}, function(){time_text = ""});
  var addMilk = createButton('Add Milk');
  addMilk.position(940, 180);
  addMilk.mousePressed(function(){
    console.log(25)
    foodStock += 1;
    database.ref("/").update({"food": foodStock});
    dog.addImage(dog_stand_img);
    console.log(29)
  });

  var feedMilk = createButton('Feed Milk');
  feedMilk.position(850, 180);
  feedMilk.mousePressed(function(){
    foodStock -= 1;
    dog.addImage(dog_eat_img);
    time = new Date();
    time_text = time.toLocaleDateString()+"\t"+time.toLocaleTimeString()
    database.ref("/").set({"food":foodStock, "lastFeedTime":time_text});
  });

}

function draw() {  
  background(46, 139, 87);
  var y = 100, x = 50;
  for(var i = 0; i < foodStock; i++){
      if(i > 0 && i % 10 == 0){
          x = 50;
          y += 50;
      }  
      image(milk_img, x, y, 25,45);
      x += 30;
        
  }
  drawSprites();
  push();
  textSize(25);
  fill(0);
  strokeWeight(1.5);
  stroke(0);
  textFont("Georgia");
  if(time_text)
  text(time_text, 350, 65);
  
  fill(255);
  strokeWeight(1.5);
  stroke(0);
  textSize(30);
  textFont("Georgia");
  text("Ⓕⓔⓔⓓ Ⓑⓡⓤⓝⓞ ⓢⓞⓜⓔ Ⓜⓘⓛⓚ🥛🥛🥛", 200, 450);
  pop();
  
  
}


