const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
var player, playerimage
var ground,virusImage,virus,virusGroup,boosterGroup;
var gamestate=0

function preload(){
  playerimage=loadAnimation("player/player1.png","player/player2.png","player/player3.png","player/player4.png","player/player5.png",
  "player/player6.png","player/player7.png","player/player8.png")
  boosterImage1=loadImage("player/immunity1.png")
  boosterImage2=loadImage("player/immunity1.png")
  
virusImage1=loadImage("player/virus1.png")
virusImage2=loadImage("player/virus2.png")



}


function setup(){
    var canvas = createCanvas(windowWidth,windowHeight);

    engine = Engine.create();
    world = engine.world;
 player=createSprite(100,height-40,10,10)
 player.addAnimation("player",playerimage)
 player.scale=1
 gameover=createSprite(width/2,height/2-50,20,20)
 restart=createSprite(width/2,height/2,20,20)
ground=createSprite(width/2,height,width,10)
virusGroup=createGroup()
boosterGroup=createGroup()
}


function draw(){
    background(0);
    if(gamestate===0)
    {
    gameover.visible=false
    restart.visible=false
    if(keyDown("SPACE"))
    {
      player.velocityY=-10
    }
    player.velocityY+=1
    player.collide(ground)
corona()
immunity()
if(player.isTouching (virusGroup)&&player.scale>1){
  player.scale-=0.01
}
if (player.isTouching(boosterGroup)&&player.scale<2){
  player.scale+=0.1
}
if (player.isTouching (virusGroup)&&player.scale===1)
{
gamestate=1
}
    }

    if (gamestate===1)
    {
      gameover.visible=true
      restart.visible=true
      player.collide(ground)
      virusGroup.setVelocityXEach(0)
      boosterGroup.setVelocityXEach(0)
      virusGroup.setLifetimeEach(-1)
      boosterGroup.setLifetimeEach(-1)
    if (mousePressedOver(restart)){
    virusGroup.destroyEach()
    boosterGroup.destroyEach()
      gamestate=0
      
    }
    }
    
drawSprites()
}


function corona()
{
  if(frameCount%70===0){
    virus=createSprite(width-30,height-60,20,20)
    var r=Math.round(random(1,2))
   if(r===1){
     virus.addImage(virusImage1)
     virus.scale=0.15
   }
  else {
    virus.addImage(virusImage2)
    virus.scale=0.2
  }
    virus.velocityX=-7
    virus.lifetime=width-30/7
    virusGroup.add(virus)
  }
}

function immunity()
{
  if(frameCount%100===0){
    booster=createSprite(width+10,Math.round(random(height-400,height-200)),20,20)
   var r=Math.round(random(1,2))
   if(r===1){
     booster.addImage(boosterImage1)
     booster.scale=0.1
   }
  else {
    booster.addImage(boosterImage2)
    booster.scale=0.1
  }
    booster.velocityX=-5
    booster.lifetime=width+10/5
    boosterGroup.add(booster)
  }
}