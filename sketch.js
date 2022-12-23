
var bg_img;
var boy_running, zombie_img;
var obstacle1,obstacle2,obstacle3;
var obstGrp,treasureGrp;
var candy_img ,candy_img1,candy_img2, power_img;
var PLAY = 1;
var END = 0;
var gameState = PLAY ;
var restart_Img;
var gameOver_Img;
var coin_Img;
var boy_collided;
var score = 0 ; 

 function preload () {
 
    bg_img = loadImage ("images/bg.png");
    boy_running = loadAnimation ("images/boy1.png","images/boy2.png","images/boy3.png","images/boy4.png","images/boy5.png","images/boy6.png")
    zombie_img = loadAnimation ("images/zombie1.png","images/zombie2.png","images/zombie3.png","images/zombie4.png","images/zombie5.png","images/zombie6.png")
    obstacle1 = loadImage ("images/obstacle1.png");
    obstacle2 = loadImage ("images/obstacle2.png");
    obstacle3 = loadImage ("images/obstacle3.png");
    candy_img = loadImage ("images/candy1.png");
    candy_img1 = loadImage ("images/candy2.png");
    candy_img2 = loadImage ("images/candy5.png");
   // power_img = loadImage ("images/powerup.png");
    restart_Img = loadImage ("images/restartImg.png");
    gameOver_Img = loadImage ("images/Gameover.png");
    coin_Img = loadImage ("images/coin.png");
    boy_collided = loadImage ("images/boy13.png","images/boy14.png","images/boy15.png")

}

function setup(){

    createCanvas (600,400);

    //imageMode (CENTRE);
    bg = createSprite(800,200);
    bg.addImage(bg_img);
    bg.velocityX = -2;


    boy_run= createSprite (160,355);
    boy_run.addAnimation ("running",boy_running);
    boy_run.addAnimation("collide",boy_collided);
    //boy_run.debug= true;

    ground = createSprite (400,380,800,20);
    ground.visible = false ;
    ground.velocityX = -2 ;
    ground.x = ground.width/2 ; 

    zombie = createSprite (70,300);
    zombie.addAnimation("chase",zombie_img);

gameOver = createSprite (300,200);
gameOver.addImage(gameOver_Img);
gameOver.scale = 0.4 ; 
gameOver.visible = false ; 

restart = createSprite (300,150);
restart.addImage(restart_Img);
restart.scale = 0.1 ; 
restart.visible = false ; 

    obstGrp= new Group ();
    treasureGrp = new Group ();

   
}


function draw ()  {

background(0);



if (gameState=== PLAY){

if (ground.x < 0){
  ground.x = ground.width/2 ; 

}

if ( bg.x<-120){
    bg.x=800
}

if (keyDown("space") && boy_run.y >= 100  ){
  console.log ("jump");
    boy_run.velocityY= -15;
}

boy_run.velocityY = boy_run.velocityY +0.8
//boy_run.collide(ground);


spawnObstacles();
spawnTreasure();

if (treasureGrp.isTouching(boy_run)){
  score = score + 10 ;
  treasureGrp.destroyEach ();
}

if (obstGrp.isTouching(boy_run)){
  boy_run.changeAnimation("collide");
  gameState = END;
}

} 
else if (gameState == END){
  gameOver.visible = true;
  restart.visible = true;

// console.log("end");
 obstGrp.setVelocityXEach(0);
 treasureGrp.setVelocityXEach(0);

 bg.velocityX = 0;
 zombie.velocityX = 0;

 obstGrp.setLifetimeEach(-1);
treasureGrp.setLifetimeEach(-1);

ground.velocityX = 0 ;

if (mousePressedOver(restart)){
  reset() ; 
}

}

boy_run.collide(ground);

drawSprites ();

textSize (30);
text ("score : " + score ,400,100);
}

function spawnObstacles () {
    if(frameCount%100 == 0){
   obstacle= createSprite (800,315);
   obstacle.velocityX = -4 ;
   obstacle.scale=0.3;
 obstacle.lifetime = 200;
 //obstacle.debug= true;

 obstacle.depth = zombie.depth;
   zombie.depth = zombie.depth + 1;

   var rand = Math.round(random(1,2,3));
 
   switch (rand) {

case 1:
 obstacle.addImage(obstacle1);
 obstacle.scale=0.4;
 break;

 case 2:
 obstacle.addImage(obstacle2);
 obstacle.scale=0.3;
 break;

 case 3:
 obstacle.addImage(obstacle3);
 obstacle.scale=0.4;
 break;

 default: break
   }

   obstGrp.add(obstacle);
    }


}

function spawnTreasure () {
if (frameCount%120 == 0){
candy = createSprite (810,80);
candy.velocityX= -4;
candy.scale=0.2;
candy.lifetime = 200 ;

var rand= Math.round(random(1,2,3));

switch (rand) {

    case 1:
      candy.addImage(candy_img);
      candy.scale=0.3;
      break;

    case 2:
      candy.addImage(candy_img1);
      candy.scale=0.3;
      break;

    case 3:
      candy.addImage(candy_img2);
      candy.scale=0.3;
      break;

      default : break
}
    treasureGrp.add(candy);
}

}

function reset () {
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstGrp.destroyEach();
  treasureGrp.destroyEach();
  
  boy_run.changeAnimation("running");
  
  score = 0;


}


