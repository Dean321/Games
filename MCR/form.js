class Form{
    constructor(){
        this.namefeild = createInput("Enter Name Here");
        this.msg = createElement("h3");
        this.button = createButton("Enter");
    }
    hide(){
        this.namefeild.hide();
        this.msg.hide();
        this.button.hide();
    }
    startpage(){
        var title = createElement("h1");
        title.html("Welcome To Deltona")
        title.position(width/2 - 50, 50);
        this.namefeild.position(width/2, 150);
        this.button.position(width/2 + 30, 200);
        this.button.mousePressed(()=>{
            this.namefeild.hide();
            this.button.hide();
            var name = this.namefeild.value();
            console.log(name);
            player.name = name;
            playerCount += 1;
            player.index = playerCount;
            player.updatePlayerCount();
            title.hide();
            this.msg.html("Welcome "+name);
            this.msg.position(width/2, height/2);
            player.updatePlayerName();
        });
    }
    stopPage(){

    }
}