class Form{
  constructor(){
    this.title = createImg("title.png")
    this.title.class("title")
    this.input = createInput("Enter your name")
    this.input.class("input")
    this.playBtn = createButton("START")
    this.playBtn.class("playBtn")
    this.greeting = createElement("h2")
    this.greeting.class("greeting")
  }
  display(){
    console.log("form display")
    this.title.position(width/10, 50)
    this.input.position(width/2 - 100, height/2 - 100)
    this.playBtn.position(width/2 - 40, height/2-20)
    this.greeting.position(width/3, height/2 - 100)
    this.playBtn.mousePressed(()=>{
      playerCount+=1
      player.index = playerCount
      player.name = this.input.value()
      this.input.hide()
      this.playBtn.hide()
      this.greeting.html(`
            Hello ${player.name}
            </br>wait for another player to join...`)
      player.updatePlayerCount(playerCount)
      
    })
  }
  hide(){
    this.title.hide()
    this.input.hide()
    this.playBtn.hide()
    this.greeting.hide()
  }

}


// class Form {
//   constructor() {
//     this.input = createInput().attribute("placeholder", "Enter your name");
//     this.playButton = createButton("PLAY");
//     this.titleImg = createImg("title.png", "game title");
//     this.greeting = createElement("h2");
//   }
//   setElementsPosition() {
//     this.titleImg.position(120, 50);
//     this.input.position(width / 2 - 150, height / 2 - 80);
//     this.playButton.position(width / 2 - 105, height / 2 - 20);
//     this.greeting.position(width / 2 - 300, height / 2 - 100);
//   }
//   setElementStyle() {
//     this.titleImg.class("gameTitle");
//     this.input.class("customInput");
//     this.playButton.class("customButton");
//     this.greeting.class("greeting");
//   }
//   display() {
//     this.setElementsPosition();
//     this.setElementStyle();
//   }
//   hide() {
//     this.greeting.hide();
//     this.playButton.hide();
//     this.input.hide();
//   }

//   handleMousePressed() {
//     this.playButton.mousePressed(() => {
//       this.input.hide();
//       this.playButton.hide();
//       var message = `
//       Hello ${this.input.value()}
//       </br>wait for another player to join...`;
//       this.greeting.html(message);
//       playerCount+=1
//       player.name = this.input.value();
//       player.index = playerCount
//       player.addPlayer();
//       player.updateCount(playerCount)
//       player.getDistance()
//     });
//   }

//   display() {
//     this.setElementsPosition();
//     this.setElementStyle();
//     this.handleMousePressed();
//   }
// }
