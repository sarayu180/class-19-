var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  doorsGroup=new Group()
  climbersGroup = new Group()
  invisibleBlocksGroup = new Group()

  ghost = createSprite (300,300,10,10)
  ghost.addImage(ghostImg)
  ghost.scale = 0.3

  spookySound.loop()



  
}

function draw() {
  background(200);

  if(gameState==="play") {
    if(tower.y > 400){
      tower.y = 300
    }

  if(keyDown("left_arrow")) {
    ghost.x=ghost.x-3
 
  }

  if(keyDown("right_arrow")) {
    ghost.x=ghost.x+3

  }

  if(keyDown("space")) {
    ghost.velocityY = -5
     
  }

  ghost.velocityY = ghost.velocityY+0.6

  if (climbersGroup.isTouching(ghost)) {
    ghost.velocityY = 0

  }

  if(invisibleBlocksGroup.isTouching(ghost) || ghost.y>600) {
    ghost.destroy()
    gameState="end"
     
  }

  spawnDoors()
    
  drawSprites()

  }

  if(gameState==="end"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("Game Over",230,300)
  }
  
 
}

function spawnDoors(){
if(frameCount%240===0){
  door = createSprite(300,-50)
  door.addImage(doorImg)
  door.velocityY=1
  door.x = Math.round(random(130,450))
  door.lifetime = 600
  doorsGroup.add(door)
  door.depth = ghost.depth
  ghost.depth = ghost.depth+1

  climber = createSprite(300,20)
  climber.addImage(climberImg)
  climber.velocityY = 1
  climber.x= door.x
  climber.lifetime = 600
  climbersGroup.add(climber)

  invisibleBlock = createSprite(300,20)
  invisibleBlock.width = climber.width
  invisibleBlock.height = 1
  invisibleBlock.debug = true
  invisibleBlock.x = climber.x
  invisibleBlock.velocityY = 1
  invisibleBlock.lifetime =  600
  invisibleBlocksGroup.add(invisibleBlock)


}

}
