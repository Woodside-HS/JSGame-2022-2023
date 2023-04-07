class levelStorage{
    loadLevel1(){
        let platforms = [];
          //first level
          platforms[0] = new Platform(-100, 600, 12000, 20, "brown", false, false, 0, 0);//ground platform
          platforms[1] = new Platform(400, 500, 200, 20, "blue", false, true, 0, false, 0);//first platform
          platforms[2] = new Platform(700, 450, 200, 20, "blue", true, false, 0, false, 1);//second platform
          platforms[3] = new Platform(1450, 200, 200, 20, "blue", true, false, 0, false, 0);//top platform with enemy
          platforms[4] = new Platform(650, 250, 100, 20, "blue", false, true, 0, false, 2);//upper left platform
          platforms[5] = new Platform(900, 350, 200, 20, "blue", false, false, 0, true, 0);//trap platform
          platforms[6] = new Platform(1200, 400, 300, 20, "blue", false, false, 0, false, 3);
          platforms[7] = new Platform(1100, 500, 150, 20, "blue", false, false, 0, false, 0);
          platforms[8] = new Platform(1150, 150, 150, 20, "blue", true, true, 0, false, 0);
          platforms[9] = new Platform(1700, 150, 200, 20, "blue", false, true, 0, true, 0);
          platforms[10] = new Platform(1650, 450, 150, 20, "blue", false, false, 0, true, 0);
          platforms[11] = new Platform(1700, 275, 150, 20, "blue", false, true, 0, false, 0);
          platforms[12] = new Platform(1900, 325, 150, 20, "blue", false, true, 0, false, 1);
          platforms[13] = new Platform(2100, 350, 150, 20, "blue", false, true, 0, false, 0);
          platforms[14] = new Platform(2400, 250, 150, 20, "blue", false, true, 0, false, 2);
          platforms[15] = new Platform(2700, 300, 150, 20, "blue", false, true, 0, false, 0);
          platforms[16] = new Platform(3000, 325, 150, 20, "blue", false, true, 0, false, 3);
          platforms[17] = new Platform(3300, 350, 150, 20, "blue", false, true, 0, false, 0);
          platforms[18] = new Platform(3600, 275, 150, 20, "blue", false, true, 0, false, 0);


        return platforms;

    }

    loadLevel2(){

    }

    loadLevel3(){

    }

    loadLevel4(){

    }

    loadLevel5(){
        
    }

    loadLevel6(){
        
    }

    loadLevel7(){ //Boss Level
        
    }
    
}