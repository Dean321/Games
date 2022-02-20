var hours, minutes, seconds,
    hours_angle, minutes_angle, seconds_angle, 
    tick, alarm;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  
  push();
  rectMode(CENTER);
  noStroke();
  fill("#E6B0AA");
  rect(200,200,400);
  
  fill("#F5CBA7");
  rect(200,200,375);
  fill("#F9E79F");
  rect(200,200,350);
  fill("#A9DFBF");
  rect(200,200,325);
  fill("#A9CCE3");
  rect(200,200,300);
  fill("#E6B0AA");
  rect(200,200,275);
  
  fill("#F5CBA7");
  rect(200,200,250);
  fill("#F9E79F");
  rect(200,200,225);
  fill("#A9DFBF");
  rect(200,200,200);
  fill("#A9CCE3");
  rect(200,200,175);
  fill("#E6B0AA");
  rect(200,200,150);
  
  fill("#F5CBA7");
  rect(200,200,125);
  fill("#F9E79F");
  rect(200,200,100);
  fill("#A9DFBF");
  rect(200,200,75);
  fill("#A9CCE3");
  rect(200,200,50);
  fill("#E6B0AA");
  rect(200,200,25);
  pop();
  
  translate(200, 200);
  rotate(-90);
  
  hours = hour();
  minutes = minute();
  seconds = second();

  seconds_angle = map(seconds, 0, 60, 0, 360);
  minutes_angle = map(minutes, 0, 60, 0, 360);
  hours_angle = map(hours%12, 0, 12, 0, 360);
  
  push();
  rotate(seconds_angle);
  stroke("#1ABC9C");
  strokeWeight(10);
  line(0, 0, 100, 0);
  pop();
  
  push();
  rotate(minutes_angle);
  stroke("#8E44AD");
  strokeWeight(10);
  line(0, 0, 75, 0);
  pop();
  
  push();
  rotate(hours_angle);
  stroke("#DE3163");
  strokeWeight(10);
  line(0, 0, 50, 0);
  pop();
  
  stroke(0);
  point(0,0);
  
  noFill();
  strokeWeight(10);
  stroke("#1ABC9C");
  arc(0,0,300,300,0,seconds_angle);
  stroke("#8E44AD");
  arc(0,0,280,280,0,minutes_angle);
  stroke("#DE3163");
  arc(0,0,260,260,0,hours_angle);

}