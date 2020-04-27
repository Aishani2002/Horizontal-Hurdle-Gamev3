class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    player1 = createSprite(100,400);
    player1.addImage("player1",player1img);
    player1.scale= 0.5;
    player2 = createSprite(100,500);
    player2.addImage("player2",player2img);
    player2.scale= 0.5;
    player3 = createSprite(100,600);
    player3.addImage("player3",player3img);
    player3.scale=0.5;
    player4 = createSprite(100,600);
    player4.addImage("player4",player4img);
    player4.scale=0.5;
    players = [player1, player2, player3, player4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background("white");
      image(track,0,-displayHeight*2,displayWidth,displayHeight*2);
      //index of the array
      var index = 0;

      //x and y position of the players
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the players a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the players in y direction
        y = displayHeight - allPlayers[plr].distance;
        players[index-1].x = x;
        players[index-1].y = y;

        if (index === player.index){
          players[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = players[index-1].y
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)

      }

    }
    if(player.distance>3860){
      gameState=2;
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }

    drawSprites();
  }

  end(){
    console.log("game ended");
    game.update(2);
  }
}
