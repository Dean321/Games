class Game {
  constructor() {}
  getGameState() {
    db.ref("gameState").on("value", (a) => {
      gameState = a.val();
    });
  }
  updateGameState(gs) {
    db.ref("/").update({ gameState: gs });
  }
  start() {
    console.log("start");
    form = new Form();
    form.display();
    player = new Player();
    player.getPlayerCount();
    var car1 = createSprite(width / 2 - 150, 900);
    car1.addImage(car1Img);
    car1.scale = 0.06;
    cars.push(car1);
    var car2 = createSprite(width / 2 + 120, 900);
    car2.addImage(car2Img);
    car2.scale = 0.065;
    cars.push(car2);
  }
  play() {
    this.handlePlayerControls();
    Player.getPlayerInfo();
    form.hide();
    image(trackImg, 0, -height * 5, width, height * 6);
    var index = 0;
    if (allPlayers) {
      for (var i in allPlayers) {
        index += 1;
        var X = i.positionX;
        var Y = height - i.positionY;
        console.log(i,cars[index-1], X, Y); //965 1822
        cars[index - 1].x = X;
        cars[index - 1].y = Y;
        if (player.index == index) {
          stroke(10);
          fill("red");
          circle(X, Y, 100);
        }
      }
    }
    drawSprites();
  }
  handlePlayerControls() {
    if (keyIsDown(UP_ARROW)) {
      player.positionY += 10;
      player.update();
    }

    if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
      player.positionX -= 5;
      player.update();
    }

    if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
      player.positionX += 5;
      player.update();
    }
  }
}

// class Game {
//   constructor() {
//     this.resetTitle = createElement("h2")
//     this.resetButton = createElement("h2")
//     this.leaderboardTitle = createElement("h2")
//     this.leader1 = createElement("h2")
//     this.leader2 = createElement("h2")
//   }
//   start() {
//     form = new Form();
//     form.display();
//     player = new Player();
//     playerCount = player.getCount();

//     car1 = createSprite(width / 2 - 250, height - 100);
//     car1.addImage(car1Img);
//     car1.scale = 0.1;

//     car2 = createSprite(width / 2 + 250, height - 100);
//     car2.addImage(car2Img);
//     car2.scale = 0.1;

//     cars = [car1, car2];
//     console.log(cars);
//   }
//   getState() {
//     database.ref("gameState").on(
//       "value",
//       (a) => {
//         gameState = a.val();
//       },
//       (e) => {
//         console.log(e);
//       }
//     );
//   }
//   update(state) {
//     database.ref("/").update({ gameState: state });
//   }
//   handleElements() {
//     form.hide();
//     form.titleImg.position(120, 50);
//     form.titleImg.class("gameTitleAfterEffect");
//     this.resetTitle.html("Reset Game")
//     this.resetTitle.class("resetText");
//     this.resetTitle.position(width / 2 + 200, 40)
//     this.resetButton.class("resetButton")
//     this.resetButton.position(width / 2+230, 100)
//     this.leaderboardTitle.html("Leaderboard")
//     this.leaderboardTitle.class("resetText")
//     this.leaderboardTitle.position(width / 3 - 60, 40)
//     this.leader1.class("leadersText")
//     this.leader1.position(width / 3-50, 80)
//     this.leader2.class("leadersText")
//     this.leader2.position(width / 3-50, 130)
//   }
//   play() {
//     this.handleElements();
//     // this.handleResetButton()
//     Player.getPlayerInfo();
//     if (allPlayers != undefined) {
//       image(trackImg, 0, -height * 5, width, height * 6);
//       // this.showLeaderboard()
//       //   camera.position.x = cars[player.index - 1].y;
//       if (cars[player.index - 1].y < 10000) {
//         camera.position.y = cars[player.index - 1].y - 880;
//       }
//       var index = 0;
//       for (var plr in allPlayers) {
//         index += 1;
//         var X = allPlayers[plr].positionX;
//         var Y = height - allPlayers[plr].positionY;
//         console.log(cars); //965 1822
//         cars[index - 1].x = X;
//         cars[index - 1].y = Y;
//         if (index == player.index) {
//           stroke(10);
//           fill("red");
//           ellipse(X, Y, 100, 100);
//         }
//       }
//       this.handlePlayerControls();

//       drawSprites();
//     }
//   }
//   handlePlayerControls() {
//     if (keyIsDown(UP_ARROW)) {
//       player.positionY += 10;
//       player.update();
//     }

//     if (keyIsDown(LEFT_ARROW) && player.positionX > width / 3 - 50) {
//       player.positionX -= 5;
//       player.update();
//     }

//     if (keyIsDown(RIGHT_ARROW) && player.positionX < width / 2 + 300) {
//       player.positionX += 5;
//       player.update();
//     }
//   }
//   showLeaderboard() {
//     var leader1, leader2;
//     var players = Object.values(allPlayers);
//     /**
//      * nstead of using a for-in loop to traverse through allPlayers,
//      * we will learn another method, the Object.values(). This method
//      * returns an array of a given object's own enumerable property
//      * values, in the same order as that provided by a for-in loop.
//      */
//     if (
//       (players[0].rank === 0 && players[1].rank === 0) ||
//       players[0].rank === 1
//     ) {
//       // &emsp;    This tag is used for displaying four spaces.
//       leader1 =
//         players[0].rank +
//         "&emsp;" +
//         players[0].name +
//         "&emsp;" +
//         players[0].score;

//       leader2 =
//         players[1].rank +
//         "&emsp;" +
//         players[1].name +
//         "&emsp;" +
//         players[1].score;
//     }

//     if (players[1].rank === 1) {
//       leader1 =
//         players[1].rank +
//         "&emsp;" +
//         players[1].name +
//         "&emsp;" +
//         players[1].score;

//       leader2 =
//         players[0].rank +
//         "&emsp;" +
//         players[0].name +
//         "&emsp;" +
//         players[0].score;
//     }

//     this.leader1.html(leader1);
//     this.leader2.html(leader2);
//   }
//   handleResetButton() {
//     this.resetButton.mousePressed(() => {
//       database.ref("/").set({
//         playerCount: 0,
//         gameState: 0,
//         players: {}
//       });
//       window.location.reload();
//     });
//   }
// }
