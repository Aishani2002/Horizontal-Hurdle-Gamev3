var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var form, player, game;
var players;

var player1,player2,player3,player4;
var player1img,player2img,player3img,player4img;
var ground,track;

function preload(){
player1img = loadImage("images/player1.png");
player2img = loadImage("images/player2.png");
player3img = loadImage("images/player3.png");
player4img = loadImage("images/player4.png");
track = loadImage("images/track.jpg");

}
function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState===2){
    game.end();
  }
}
