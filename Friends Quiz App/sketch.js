var questions, index, score, b1, b2, b3, b4, q,
    q_img, q_images = [], namefeild, submit_btn, playerName,
    start_img, end_img, endBlock, retry, retry_img, db, 
    playerCount, score_color, player;

function preload(){
    q_img = loadImage("quiz.jpg");
    for(var i = 1; i <= 35; i++){
        q_images.push(loadImage(i + ".PNG"))
    }
    start_img = loadImage("frontPage.PNG");
    end_img = loadImage("end.jpg");
    endBlock = loadImage("block.PNG");
    retry_img = loadImage("retry.png");
}

function setup(){
    createCanvas(1200,600)
    db = firebase.database();
    questions = [
        ["First off, What was the name of this beautiful girl that Joey met in England?", "Gina", "Jenny", "Felicity", "Robin", 3],
        ["What was the name of Rachel’s prom date who stood her up?", "Alex", "Chip", "Roy", "Jack", 2],
        ["What was the first name of Emily’s godmother?", "Helen","Waltham","Helena","Andrea",4],
        ["What was the name of Rachel’s colleague who was about to go to \nParis instead of her?","Nancy","Kim","Sarah","Lara",1],
        ["How many times did Roy, Monica’s prom date, watch Star Wars?","370 times","317 times","173 times","170 times",2],
        ["On which floor did Rachel work when she was working at Ralph Lauren?","Level 15", "Level 10", "Level 20", "Level 16", 2],
        ["What was the name of Emily’s neighbor who she thought was \neavesdropping on her call with Ross?","Kimberly","Mrs. Newman","Ms. Charles","Robin",2],
        ["What were Monica and Rachel looking for in the storage room?","Pancake Iron","Iron","Curling Iron","Waffle Iron",4],
        ["What was the tasty treat that the duck and the chicken were supposed\n to find in the contest?","Chocolate","Won Ton","Nutter Butter","Beans",3],
        ["What had happened to Chandler’s old tennis rackets?","He had lost them","Joey had lost them","Ross had given them to Carol","Joey had broken them",4],
        ["Drake tried to save this character from death in Days of Our Lives. \nWhat was her first name?","Hope","Jack","Bradey","Lara",1],
        ["This old man gave Phoebe her briefcase when she wanted to escape\n the hospital. Why was he in the hospital?","kidney","liver","gallbladder","heart",3],
        ["What was the name of the boat that joey bet on in the auction?","Caitlyn 24","Catalina 22","Caitlyn 22","Catalina 24",2],
        ["There are some posters in Monica’s room, written in Russian. How many\n of them are there?","4","3","2","1",2],
        ["When did Monica first hear the story of her parents’ engagement?","When she was in 5th grade","When she was in 6th grade","When she was in high school","When she was in middle school",1],
        ["Rachel’s license was expired when she was caught by the police.\n How many years had passed since she took the photo for her license?","10 years","12 years","20 years","15 years",1],
        ["What was the supply manager’s name who wanted to kill himself?","Jerry","Jack","Barry","Earl",4],
        ["How many states did Ross write down in Chandler’s game?","50","56","40","49",4],
        ["When did Greg and Jenny agree to get together with Monica and \nChandler?","January 15th","Saturday","Sunday","January 10th",1],
        ["What table was Mona sitting at when she was in Monica and Chandler’s \nwedding?","5","2","9","6",3],
        ["What was the first name of Ben’s new teacher in kindergarten?","Jenny Boon","Jenny Boan","Kelly Boon","Kelly Boan",1],
        ["What grade did Ursula’s fiance teach in school?","5th grade","3rd grade","2nd grade","4th gtade",3],
        ["What was Ross’s rank in the Vanilla Ice look-alike contest Chandler and\n him attended in college?","1st","4th","2nd","3rd",2],
        ["At what age did Monica start to tell time?","5","8","9","13",4],
        ["What was the name of Rachel’s OB-GYN doctor?","Dr.Long","Dr.Tam","Dr.Lang","Dr.Ernest",1],
        ["How many kids was Chandler planning to have when he was thinking \nabout the future?","1","4","3","2",2],
        ["There was a poster in Chandler and Joey’s apartment that had\n “My Guinness” on it. Where was that poster hanged on?","On the bathroom door","In Joey's room","In Chandler's room","Next to the TV",1],
        ["On which floor was Ross’s book placed in the library?","6th","1st","5th","3rd",3],
        ["What was Wendy’s job title in the office?","Vice President","Regional Vice President","Office Manager","Office Assistant",2],
        ["What was the song that Monica sang in the bar where Mike was playing?","Lady in red","Delta Dawn","Careless Whisper","I will always love you",2],
        ["How many Nobel Prizes did Charlie’s ex-boyfriend, Albie, had?","2","0","3","1",4],
        ["What was this guy’s name that admired Ross in his conference?","Cornell","Jarvis","Ryan","Charlie",2],
        ["What was Rachel’s hotel room number when they were staying in \nBarbados?","1104","1209","1202","1224",3],
        ["This woman gave Ross his last tan spray that he also scrwed up! \nWhat was her name?","Glenda","Linda","Belinda","Melinda",1],
        ["What toy did Joey choose for the toy contest in Emma’s birthday party?","Bear","Rabit","Dog","Robot",4]];
    
    b1 = createSprite(280,220,30,30);
    b1.visible = false;
    b2 = createSprite(280,290,30,30);
    b2.visible = false;
    b3 = createSprite(280,360,30,30);
    b3.visible = false;
    b4 = createSprite(280,430,30,30);
    b4.visible = false;

    
    namefeild = createInput("Enter Name Here");
    namefeild.position(450, 450);
    namefeild.size(300, 50);
    namefeild.style("color", "black");
    namefeild.style('background-color', "#9A6DD8");
    namefeild.style('font-size', '25px');
    namefeild.style("font-family","Comic Sans MS");
    submit_btn = createButton("Start");
    submit_btn.position(500, 500);
    submit_btn.style('font-size', '30px');
    submit_btn.size(200,50);
    submit_btn.style("font-family", "Comic Sans MS");
    submit_btn.style("color", "black");
    submit_btn.style('background-color', "#7A25EE");
    
    namefeild.hide()
    submit_btn.hide();

    retry = createSprite(1120, 50 , 20 , 20);
    retry.addImage(retry_img);
    retry.scale = 0.4;
    retry.visible = false;

    score_color = "yellow";

    db.ref("FriendsQuiz/playersPlayed").on("value",function(a){playerCount = a.val();});
    db.ref("FriendsQuiz/gameState").on("value",function(d){index = d.val();})
    player = new Player();
    player.index = -1;
    
}

function draw(){
    if(player.number == 0 && player.index !=-1){
        db.ref("FriendsQuiz/").update({"gameState" : -1});
        db.ref("FriendsQuiz/playersPlayed").on("value",function(a){playerCount = a.val();});
    } 
    background(255);
    db.ref("FriendsQuiz/gameState").on("value",function(d){player.index = d.val();})
    if(player.index == -1){
        retry.visible = false;
        namefeild.show();
        submit_btn.show();
        image(start_img, 0, 0, width, height);
        submit_btn.mousePressed(function(){
           playerName = namefeild.value();
           playerCount += 1;
           player.name = playerName;
           player.number = playerCount;
           var date = new Date();
           db.ref("FriendsQuiz/"+player.number).update({name:player.name, date: date})
           db.ref("FriendsQuiz").update({playersPlayed:playerCount})
           player.index = 0
           db.ref("FriendsQuiz/").update({"gameState" : player.index});
           index=0;
           namefeild.hide();
           submit_btn.hide();           
        })
    }
    else if(index < questions.length && player.index == 0  ){
    image(q_img, 0, 0, width, height)
    fill(0);
    textSize(20);
    textFont("Lucida Conole")
    text(questions[index][0], 250, 170);
    text(questions[index][1], 310, 225);
    text(questions[index][2], 310, 295);
    text(questions[index][3], 310, 365);
    text(questions[index][4], 310, 435);

   
    if(mouseIsOver(b1) && mouseWentDown("leftButton")){checkAnswer(1);}
    if(mouseIsOver(b2) && mouseWentDown("leftButton")){checkAnswer(2);}
    if(mouseIsOver(b3) && mouseWentDown("leftButton")){checkAnswer(3);}
    if(mouseIsOver(b4) && mouseWentDown("leftButton")){checkAnswer(4);}

    drawSprites()

    fill("#A16CD7");
    noStroke()
    circle(280, 220, 30);
    circle(280, 290, 30);
    circle(280, 360, 30);
    circle(280, 430, 30);
    fill(0)
    stroke(0)
    strokeWeight(3)
    textFont("Arial")
    textSize(18);
    text("A", 275, 225);
    textSize(20);
    text("B", 275, 297);
    textSize(18);
    text("C", 273, 366);
    text("D", 275, 436);

    noStroke()
    fill(score_color)
    rect(685, 425, 110,30)
    textSize(20);
    fill(0)
    text("Score: "+player.score, 700, 447);

    if(index!=35){
        image(q_images[index], 600, 210, 350, 200);
    }
    

   }
   else if(index == questions.length){
       image(end_img, 0, 0, width, height);
       tint(100, 255);
       image(endBlock, 50, 500, 1100, 80);
       textSize(40);
       textFont("Arial");
       stroke(0);
       strokeWeight(3);
       fill(0);
       text(player.score+" / 350", 50, 50);
       textSize(50);
       fill(255);
       stroke(255);
       strokeWeight(3);
       if(player.score<250){
           text("Better Luck next time "+player.name, 300, 550);
       }
       else{
           text("Well Done "+player.name, 400, 550);
       }
       retry.visible = true;
       if(mouseIsOver(retry) && mouseWentDown("leftButton")){
            db.ref("FriendsQuiz/"+player.number).update({"score":0, "name":""})
            playerCount-=1
            db.ref("FriendsQuiz").update({"playersPlayed":playerCount})
            db.ref("FriendsQuiz/").update({"gameState":-1});
            player = new Player();
            index=-1;
       }
       drawSprites();
   }
    

}

function checkAnswer(a){
    if(a == questions[index][5]){
        player.score+=10
        db.ref("FriendsQuiz/"+player.number).update({score:player.score})
        score_color = "green";
    }
    else{
        score_color = "red";
    }
    index+=1
    
}
