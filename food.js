class MilkFood{
    constructor(){

        var lastFed;
        var foodStock;
        this.image = loadImage('milk.png');

    }
   
    getFoodStock(x){
        foodStock = x ; 
    }

    updateFoodStock(lfoodStock){
        foodStock = lfoodStock;
    }


    display(){

      var x = 80, y = 70;

      imageMode(CENTER);
      image(this.image, -80, 140, 10, 10);
 
         if(foodStock!=0){
            for(var i=0; i < foodStock; i++){
                if(i%7==0){
                x = 80;
                y = y + 70;
                }
            image(this.image, x, y, 60, 60);
            x = x + 50;

          }

         }

    }

}