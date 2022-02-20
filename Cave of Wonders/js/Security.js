class Security {

    constructor(){

        this.access1 = createInput("Code1")
        this.access1.position(360, 270);
        this.access1.style('background', 'white');  

        this.button1 = createButton('Check');
        this.button1.position(580,270);
        this.button1.style('background', 'lightgrey');    

        this.lbl1 = createElement("h3");
        this.lbl1.html("U B A");
        this.lbl1.position(360, 200);
        this.lbl1.style("color","cyan")

        this.msg1 = createElement("h5");
        this.msg1.html("Who is Aladdin's best friend and partner in crime?");
        this.msg1.style("color","white")
        this.msg1.position(360, 220)

        this.access2 = createInput("Code2")
        this.access2.position(1160,370);
        this.access2.style('background', 'white');  

        this.button2 = createButton('Check');
        this.button2.position(1370,370);
        this.button2.style('background', 'lightgrey');
        
        this.lbl2 = createElement("h3");
        this.lbl2.html("G B H A A A R");
        this.lbl2.position(1160, 300);
        this.lbl2.style("color","cyan")

        this.msg2 = createElement("h5");
        this.msg2.html("What is the town that Aladdin lives in called?");
        this.msg2.style("color","white")
        this.msg2.position(1160, 320)

        this.access3 = createInput("Code3")
        this.access3.position(460,670);
        this.access3.style('background', 'white');  

        this.button3 = createButton('Check');
        this.button3.position(670,670);
        this.button3.style('background', 'lightgrey');

        this.lbl3 = createElement("h3");
        this.lbl3.html("A J A R F ");
        this.lbl3.position(460, 600);
        this.lbl3.style("color","cyan")

        this.msg3 = createElement("h5");
        this.msg3.html("What is the name of the Sultan's most trusted advisor?");
        this.msg3.style("color","white")
        this.msg3.position(460, 620)
        
    }

    display(){

        this.button1.mousePressed(() => {
            if(system.authenticate(accessCode1,this.access1.value())){
                score++;
            }
            this.lbl1.hide();
            this.msg1.hide();
            this.button1.hide();
            this.access1.hide();
            locker[0]=1;
        });

        this.button2.mousePressed(() => {
            if(system.authenticate(accessCode2,this.access2.value())){
                score++;
            }
            this.lbl2.hide();
            this.msg2.hide();
            this.button2.hide();
            this.access2.hide();
            locker[1]=1;
        });

        this.button3.mousePressed(() => {
            if(system.authenticate(accessCode3,this.access3.value())){
                score++;
            }
            this.lbl3.hide();
            this.msg3.hide();
            this.button3.hide();
            this.access3.hide();
            locker[2]=1;
        });

    }
}