var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2,
obstacle3, obstacle4;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var bg;
function preload(){

trex_running = loadAnimation("trex1.png","trex2.png");
trex_collided = loadAnimation("trex_collided.png");

groundImage = loadImage("ground2.png");

cloudImage = loadImage("cloud.png");

obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");

bg= loadImage("bg3.jpg")

}

function setup() {

canvas =  createCanvas(displayWidth-20,displayHeight-200);

trex = createSprite(50,180,20,50);
trex.addAnimation("running", trex_running);
trex.scale = 0.5;

ground = createSprite(200,180,400,20);
ground.addImage("ground",groundImage);
ground.x = ground.width/2;
ground.velocityX = -4;

invisibleGround = createSprite(200,190,400,10);
invisibleGround.visible = false;

cloudsGroup = new Group();
obstaclesGroup = new Group();


}

function draw() {

background(bg);


stroke("RED")
fill("black")
textSize(100)

if (gameState === PLAY){

score = score + Math.round(frameCount/500);

text("Score:"+ score ,300,400);

if (ground.x < 0){
ground.x = ground.width/8;
}


if(keyDown("space") && trex.y>100) {
trex.velocityY = -15;
}

trex.velocityY = trex.velocityY + 0.5

if(obstaclesGroup.isTouching(trex)){
  gameState = END;

}

spawnClouds();

spawnObstacles(); 

}

else if(gameState === END){

trex.addAnimation("running",trex_collided);

obstaclesGroup.setLifetimeEach(-1);

cloudsGroup.setLifetimeEach(-1);

ground.velocityX = 0;

trex.velocityY = 0;

obstaclesGroup.setVelocityXEach(0);

cloudsGroup.setVelocityXEach(0);

}

camera.position.x = trex.x/2;

camera.position.y = displayHeight/4; 

console.log(camera.position.y)
console.log(camera.position.x)

trex.collide(invisibleGround);

drawSprites();
}

function spawnClouds() {

if (frameCount % 100 === 0) {

var cloud = createSprite(600,10,40,10);

cloud.y = Math.round(random(10,0));

cloud.addImage(cloudImage);

cloud.scale = 0.5;

cloud.velocityX = -3;

cloud.lifetime = 1000;

cloud.depth = trex.depth;

trex.depth = trex.depth + 1;

cloudsGroup.add(cloud);

}

}

function spawnObstacles() {

if(frameCount % 120 === 0) {

var obstacle = createSprite(600,135,10,40);

obstacle.velocityX = -4;

var rand = Math.round(random(1,4));

switch(rand) {

case 1: obstacle.addImage(obstacle1);
break;

case 2: obstacle.addImage(obstacle2);
break;

case 3: obstacle.addImage(obstacle3);
break;

case 4: obstacle.addImage(obstacle4);
break;

default: break;

}

obstacle.scale = 0.5;

obstacle.lifetime = 1000;

obstaclesGroup.add(obstacle);

obstacle.setCollider("rectangle",0,0,obstacle.width/2,obstacle.height/1.5)

}
}