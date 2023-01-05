class Player {
  constructor() {
    this.index = 0;
    this.name = null;
    this.positionX = 0;
    this.positionY = 0;
    this.score = 0;
  }
  getPlayerCount() {
    db.ref("playerCount").on("value", (a) => {
      playerCount = a.val();
    });
    console.log(playerCount);
  }
  updatePlayerCount(cnt) {
    db.ref("/").update({ playerCount: cnt });
  }
  static getPlayerInfo() {
    db.ref("players").on("value", (a) => {
      allPlayers = a.val();
    });
  }
  updatePlayer(){
    if(this.index==1){
      this.positionX = width / 2 - 150
      this.positionY = 900
    }
    else{
      this.positionX = width / 2 + 120
      this.positionY = 900
    }
    db.ref("Player"+this.index+"/").update({
      name:this.name,
      positionX:this.positionX,
      positionY:this.positionY
    })
  }
}

// class Player {
//   constructor() {
//     this.name = null;
//     this.index = null;
//     this.positionX = 0;
//     this.positionY = 0;
//     this.rank = 0;
//     this.score = 0;
//   }
//   getCount() {
//     database.ref("playerCount").on("value", (a) => {
//       playerCount = a.val();
//     });
//   }
//   updateCount(count) {
//     database.ref("/").update({ playerCount: count });
//   }
//   addPlayer() {
//     if (this.index == 1) {
//       this.positionX = width / 2 - 250;
//       this.positionY = 100;
//     } else {
//       this.positionX = width / 2 + 250;
//       this.positionY = 100;
//     }
//     database.ref("players/Player" + this.index).update({
//       name: this.name,
//       positionX: this.positionX,
//       positionY: this.positionY,
//       rank: this.rank,
//       score: this.score,
//     });
//   }
//   static getPlayerInfo() {
//     database.ref("players").on("value", (a) => {
//       allPlayers = a.val();
//     });
//   }
//   update() {
//     database
//       .ref("players/Player" + this.index)
//       .update({
//         positionX: this.positionX,
//         positionY: this.positionY,
//         rank: this.rank,
//         score: this.score,
//       });
//   }
//   getDistance() {
//     database.ref("players/Player" + this.index).on("value", (a) => {
//       var data = a.val();
//       this.positionX = data.positionX;
//       this.positionY = data.positionY;
//     });
//   }
// }
