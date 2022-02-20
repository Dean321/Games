
var plinkos, particles, divisions, score,
    myWorld, myEngine, box1, box2, box3,
    deadParticles;


function setup(){
    createCanvas(600, 850);
    ellipseMode(RADIUS);
    rectMode(CENTER);
    plinkos = [];
    particles = [];
    divisions = [];
    deadParticles = [];
    score = 0;
    myEngine = Matter.Engine.create();
    myWorld = myEngine.world;
    var p, c;
    for(var i = 50; i<590; i+=90){
        switch(i){
            case 50:c="#DAF7A6";break;
            case 140:c="#FFC300";break;
            case 230:c="#FF5733";break;
            case 320:c="#C70039";break;
            case 410:c="#900C3F";break;
            case 500:c="#581845";break;
        }
        p = Matter.Bodies.circle(i, 50, 20, {isStatic:true});
        Matter.World.add(myWorld, p);
        plinkos.push([p,c]);
        p = Matter.Bodies.circle(i+40, 120, 20, {isStatic:true});
        Matter.World.add(myWorld, p);
        plinkos.push([p,c]);
        p = Matter.Bodies.circle(i, 190, 20, {isStatic:true});
        Matter.World.add(myWorld, p);
        plinkos.push([p,c]);
        p = Matter.Bodies.circle(i+40, 260, 20, {isStatic:true});
        Matter.World.add(myWorld, p);
        plinkos.push([p,c]);
        p = Matter.Bodies.circle(i, 330, 20, {isStatic:true});
        Matter.World.add(myWorld, p);
        plinkos.push([p,c]);
        p = Matter.Bodies.circle(i+40, 400, 20, {isStatic:true});
        Matter.World.add(myWorld, p);
        plinkos.push([p,c]);
    }
    box1 = Matter.Bodies.rectangle(10, 590, 10, 300, {isStatic:true});
    box2 = Matter.Bodies.rectangle(590, 590, 10, 300, {isStatic:true});
    box3 = Matter.Bodies.rectangle(300, 740, 590, 10, {isStatic:true});
    Matter.World.add(myWorld, [box1, box2, box3]);

    for(var i=80; i<570; i+=100){
      var d = Matter.Bodies.rectangle(i, 590, 10, 300, {isStatic:true}); 
      Matter.World.add(myWorld, d);
      divisions.push(d);
    }

}

function draw(){
    background("#DA93FF");
    Matter.Engine.update(myEngine);
    for(var i=0; i<plinkos.length; i++){
        noStroke();
        fill(plinkos[i][1]);
        ellipse(plinkos[i][0].position.x, plinkos[i][0].position.y, 20);
    }

    rect(box1.position.x, box1.position.y, 10, 300);
    rect(box2.position.x, box2.position.y, 10, 300);
    rect(box3.position.x, box3.position.y, 590, 10);

    for(var i = 0; i<divisions.length; i++){
        rect(divisions[i].position.x, divisions[i].position.y, 10, 300);
    }

    fill(0);
    rect(295, 770, 220, 40);
    fill(255);
    textSize(30);
    text("PLAY PLINKO", 200, 780);
    fill(0);
    textSize(13);
    text("Rules\n1.Throw balls from the top to score more points(Hint: Left-mouse click)\n2. Enjoying Playing", 20, 790);
    fill("#8A12C8");
    rect(520, 820, 155, 40);
    fill(255);
    textSize(30);
    stroke("#8A12C8");
    strokeWeight(3);
    text(score, 450, 830);

    for(var i=0; i<particles.length; i++){
        ellipse(particles[i].position.x, particles[i].position.y, 10);
    }
    for(var i=0;i<deadParticles.length;i++){
        ellipse(deadParticles[i].position.x, deadParticles[i].position.y, 10);
    }
    

    fill(0);
    stroke(0);
    text(50, 30,462);
    text(250, 108, 462);
    text(1050, 195, 462);
    text(450, 305, 462);
    text(25, 410, 462);
    text(550, 510, 462);
    calculateScore();
    
}

function mousePressed(){
    if(mouseY < 50){
        var p = Matter.Bodies.circle(mouseX, 0, 10, {density: 1, friction: 1, restitution: 0});
        Matter.World.add(myWorld, p);
        particles.push(p);
    }
    
}

function calculateScore(){
    for(var i=0; i<particles.length; i++){
        if(particles[i].position.y > 580){
            var a = particles[i].position.x;
            if(a > 10 && a < 80){score += 50;}
            else if(a > 81 && a < 175){score += 250;}
            else if(a > 176 && a < 275){score += 1050;}
            else if(a > 276 && a < 377){score += 450;}
            else if(a > 378 && a < 475){score += 250;}
            else if(a > 476 && a < 580){score += 250;}
            deadParticles.push(particles[i]);
            particles.splice(i,1);
        }
    }
}