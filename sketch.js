var dog, happyDog, database, foodS, foodStock;
var dogsprite,dogsprite1;
var database;
var feeddog,addfood;
var fedTime,lastFed;
var timeHour;
var milkBottle;
var gameState, readState;

function preload()
{
  bedRoom = loadImage("BedRoom.png");
  washRoom = loadImage("WashRoom.png");
  Garden = loadImage("Garden.png");

  dogIMG = loadImage("dogImg1.png");
  dogHappyIMG = loadImage("dogImg.png");


}

function setup() {
  createCanvas(900, 400);
  
  database = firebase.database();
  
	dog = createSprite(700, 200, 10,10);
  dog.addImage(dogIMG);
  dog.scale = 0.2;

  foodStock=database.ref('Food')
  foodStock.on("value", readStock);

  milkBottle = new MilkFood();
  milkBottle.updateFoodStock(foodS);

  writeStock(25);

  addFeed = createButton("Add Milk Bottles");
  addFeed.position(650, 25);
  addFeed.mousePressed(addFoods);

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  timeHour = today.getHours();

  feed = createButton("Feed Bruno");
  feed.position(780, 25);
  feed.mousePressed(feedDog);


}


function draw() {  
  background(46, 139, 87);

  milkBottle.display();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
  lastFed=data.val(); 
  });

  textSize(20);
  fill("white");
  text("Food Stock = "+ foodS ,150, 40);  


  if(lastFed>12){
    text("Last Feed: "+lastFed%12+" PM",150,80)
  }else if(lastFed==12){
    text("Last Feed: 12 PM",150,80)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",150,80)
  }else{
    text("Last Feed: "+lastFed+" AM",150,80)
  }
  

  milkBottle.updateFoodStock(foodS);

  
  if (timeHour===10 || timeHour===11 || timeHour===16 || timeHour===17){
    update("Playing");
    background(Garden);
  }
    
  if (timeHour>=22 && timeHour<=08){
    update("Sleeping");
    background(bedRoom);
  }
  
  if (timeHour>=13 && timeHour<=14){
    update("Bathing");
    background(washRoom);
  }
  
  if (timeHour===15 || timeHour===16 || timeHour===20 || timeHour===21){
    update("Hungry");
    milkBottle.display();
  }



  drawSprites();
  
}

function update(state){
  database.ref('/').update({
    gameState:state
      })
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

 if (x<=0)
 {
   x=0;
 }
 else{
   x=x-1;
 }

 database.ref('/').update({  
   Food:x
 })
}

function addFoods(){

 foodS++;
 database.ref('/').update({
   Food:foodS
 });
}


function feedDog(){

 dog.addImage(dogHappyIMG);

 if(foodS>=1){
   foodS=foodS-1
 }
   database.ref('/').update({
   Food:foodS
 });

 database.ref('/').update({  
   FeedTime:timeHour
   });

}

