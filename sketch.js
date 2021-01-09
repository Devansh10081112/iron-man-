var PLAY = 1;
var END = 0;
var gameState = 1;

var ironMan, ironMan_standing;
var ironMan_logo, ironMan_logoIm;

var ground, groundImage;

var obstaclesGroup, thanosImage, lokiImage, ultronImage;

var gameOver, gameOver_Image, avengers;

var score=0;
localStorage["HighestScore"] = 0;
    
function preload(){
  ironMan_standing = loadImage("iron man standing.png");
  ironMan_logoIm = loadImage("logo.png");
  
  groundImage = loadImage("background.jpg");
  gameOver_Image = loadImage("Gameover.png");
  
  thanosImage = loadImage("obstacle- thanos.png");
  lokiImage = loadImage("obstacle- loki.png");
  ultronImage = loadImage("obstacle-ultron.png");
   
  avengers = loadSound("sound.mp3");
}

function setup() {
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  //avengers.loop();
  
  ground = createSprite(300,300,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -2;
  ground.scale = 2.5;
  
  gameOver = createSprite(300, 200)
  gameOver.addImage("gameOver", gameOver_Image);
  gameOver.scale = 0.4;
  gameOver.visible = false;
  
  ironMan_logo = createSprite(300, 450)
  ironMan_logo.addImage("ironMan_logo", ironMan_logoIm);
  ironMan_logo.scale = 0.4;
  ironMan_logo.visible = false;
  
  ironMan = createSprite(300, 300);
  ironMan.addImage("standing", ironMan_standing);
  ironMan.scale = 0.13;
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background("white");
 
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
      ground.velocityX = -2;
   
  ironMan.addImage("standing", ironMan_standing);
  
     if(keyDown("space")){
     ironMan.velocityY = -10;
     }
    
    if(keyDown("left_arrow")){
      ironMan.x = ironMan.x - 3;
    }
    
    if(keyDown("right_arrow")){
      ironMan.x = ironMan.x + 3;
    }
     
    ironMan.velocityY = ironMan.velocityY + 0.8
    
    if(ground.x < 0){
     ground.x = ground.width/2;
     }
     
   
    Enemy();
    
    
    if(obstaclesGroup.isTouching(ironMan) || ironMan.y > 600 || ironMan.y < 0 || ironMan.x > 600 || ironMan.x < 0){
        gameState = END;
    }
    
  }
  
  else if(gameState === END){
    gameOver.visible = true;
    ironMan_logo.visible = true;
   
    ground.velocityX = 0;
    
    ironMan.destroy();
  
    obstaclesGroup.destroyEach();
    if(mousePressedOver(ironMan_logo)) {
      reset();
    }
    
  }
  
  drawSprites();
  
   
  //Display score
  stroke("white");
  textSize(20);
  fill("yellow");
  text("Score : "+ score,500,30);
   
 text("HS: " + localStorage["HighestScore"], 300, 30);
}

function Enemy() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(400,200,20,20);
    obstacle.velocityX = -2;
    obstacle.y=Math.round(random(50,550));
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(thanosImage);
              break;
      case 2: obstacle.addImage(lokiImage);
              break;
      case 3: obstacle.addImage(ultronImage);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  ironMan_logo.visible = false;
  
ironMan.addImage("standing", ironMan_standing);
  
  obstaclesGroup.destroyEach();

  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  
  score = 0;
  
}