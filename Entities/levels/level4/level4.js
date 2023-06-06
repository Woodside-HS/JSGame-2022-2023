class level4 extends Level{
    constructor(id){
        super(id);   
        this.loadPlatforms();
        this.loadCoins();
        this.loadResources();
        this.loadDoors();
        this.loadEnemies();
        this.loadBackgrounds(3);         
    }


    loadPlatforms() {
        this.platforms[0] = new level4platform(150,670,100,true);
        this.platforms[19] = new level4platform(250,670,100,true,true);
        this.platforms[20] = new level4platform(350,670,100,true);
        this.platforms[1] = new level4platform(550,670,100,true);
        this.platforms[2] = new level4platform(750,620,100,true);
        this.platforms[3] = new level4platform(950,620,120,true);
        this.platforms[4] = new level4platform(1050,500,120,true);
        this.platforms[5] = new level4platform(1250,500,200,false);
        this.platforms[6] = new level4platform(1050,620,110,false);
        this.platforms[7] = new level4platform(1250,500,110,true);
        this.platforms[8] = new level4platform(1350,620,110,false);
        this.platforms[9] = new level4platform(1050,620,100,true);
        this.platforms[21] = new level4platform(1150,620,100,true);
        this.platforms[22] = new level4platform(1250,620,100,true);
        this.platforms[10] = new level4platform(1450,500,100,true);
        this.platforms[11] = new level4platform(1550,400,100,true);
        this.platforms[12] = new level4platform(2050,400,100,true);
        this.platforms[23] = new level4platform(2150,400,100,true);
        this.platforms[24] = new level4platform(2250,400,100,true);
        this.platforms[25] = new level4platform(2350,400,100,true,true);
        this.platforms[26] = new level4platform(2450,400,100,true);
        this.platforms[27] = new level4platform(2550,400,100,true,true);
        this.platforms[28] = new level4platform(2650,400,100,true);
        this.platforms[29] = new level4platform(2750,400,100,true);
        this.platforms[30] = new level4platform(2850,400,100,true,true);
        this.platforms[31] = new level4platform(2950,400,100,true);
        this.platforms[13] = new level4platform(1370,270,100,true);
        this.platforms[14] = new level4platform(1150,220,100,true);
        
        this.platforms[32] = new level4platform(3050,400,100,false);
        this.platforms[33] = new level4platform(3050,300,100,false);
        this.platforms[34] = new level4platform(3050,200,100,false);
        this.platforms[35] = new level4platform(3050,100,100,false);
        this.platforms[36] = new level4platform(3050,100,100,false);
        this.platforms[37] = new level4platform(2450,300,100,true);
        this.platforms[140] = new level4platform(3150,400,100,true);
        this.platforms[38] = new level4platform(2300,200,100,true);
        this.platforms[39] = new level4platform(2450,100,100,true);
        this.platforms[40] = new level4platform(3250,400,100,true);
        this.platforms[41] = new level4platform(3450,400,100,true);
        this.platforms[42] = new level4platform(3550,200,100,true);
        this.platforms[43] = new level4platform(3650,300,100,true);
        this.platforms[44] = new level4platform(3850,100,100,true,true);
        this.platforms[45] = new level4platform(3950,100,100,true);
        this.platforms[46] = new level4platform(3750,100,100,true);
        this.platforms[47] = new level4platform(3950,400,100,true);
        this.platforms[48] = new level4platform(3650,300,100,false);
        this.platforms[49] = new level4platform(4050,200,100,true,true);
        this.platforms[50] = new level4platform(4250,300,100,true);
        this.platforms[51] = new level4platform(4350,300,100,true);
        this.platforms[52] = new level4platform(4450,300,100,true);
        this.platforms[53] = new level4platform(4600,200,100,true);
        this.platforms[54] = new level4platform(4600,400,100,true);
        this.platforms[55] = new level4platform(5000,600,100,true);
        this.platforms[56] = new level4platform(5000,200,100,true);
        this.platforms[59] = new level4platform(5000,600,100,false);
        this.platforms[60] = new level4platform(5000,200,100,false);
        this.platforms[61] = new level4platform(5000,500,100,false);
        this.platforms[62] = new level4platform(5000,100,100,false);
        this.platforms[57] = new level4platform(5100,600,100,true);
        this.platforms[58] = new level4platform(5100,200,100,true,true);
        this.platforms[15] = new level4platform(5300,300,100,true);
        this.platforms[63] = new level4platform(5200,600,100,true);
        this.platforms[64] = new level4platform(5200,200,100,true);
        this.platforms[65] = new level4platform(5300,600,100,true);
        this.platforms[66] = new level4platform(5300,200,100,true);
        this.platforms[67] = new level4platform(5400,600,100,true);
        this.platforms[68] = new level4platform(5400,200,100,true,true);
        this.platforms[69] = new level4platform(5500,600,100,true);
        this.platforms[70] = new level4platform(5500,200,100,true);
        this.platforms[71] = new level4platform(5600,600,100,true);
        this.platforms[72] = new level4platform(5600,200,100,true);
        this.platforms[88] = new level4platform(5700,600,100,true);
        this.platforms[89] = new level4platform(5700,200,100,true);

        this.platforms[73] = new level4platform(5100,400,100,true);
        this.platforms[74] = new level4platform(5100,0,100,true);
        this.platforms[76] = new level4platform(5200,400,100,true);
        this.platforms[77] = new level4platform(5200,0,100,true);
        this.platforms[78] = new level4platform(5300,400,100,true);
        this.platforms[79] = new level4platform(5300,0,100,true);
        this.platforms[80] = new level4platform(5400,400,100,true);
        this.platforms[81] = new level4platform(5400,0,100,true);
        this.platforms[82] = new level4platform(5500,400,100,true);
        this.platforms[83] = new level4platform(5500,0,100,true);
        this.platforms[84] = new level4platform(5600,400,100,true);
        this.platforms[85] = new level4platform(5600,0,100,true);
        this.platforms[86] = new level4platform(5700,400,100,true);
        this.platforms[87] = new level4platform(5700,0,100,true);
        this.platforms[90] = new level4platform(5000,400,100,true);
        this.platforms[91] = new level4platform(5000,0,100,true);
        this.platforms[92] = new level4platform(5800,100,100,false);
        this.platforms[93] = new level4platform(5800,200,100,false);

        this.platforms[94] = new level4platform(6000,200,120,true)
        this.platforms[95] = new level4platform(6000,100,120,true)
        this.platforms[96] = new level4platform(6100,200,100,false)
        this.platforms[97] = new level4platform(6000,200,100,false)

        this.platforms[98] = new level4platform(6300,300,120,true)
        this.platforms[99] = new level4platform(6300,200,120,true)
        this.platforms[100] = new level4platform(6400,300,100,false)
        this.platforms[101] = new level4platform(6300,300,100,false)

        this.platforms[102] = new level4platform(6600,250,120,true)
        this.platforms[103] = new level4platform(6600,150,120,true)
        this.platforms[104] = new level4platform(6700,250,100,false)
        this.platforms[105] = new level4platform(6600,250,100,false)

        this.platforms[106] = new level4platform(6900,200,120,true)
        this.platforms[107] = new level4platform(6900,100,120,true)
        this.platforms[108] = new level4platform(7000,200,100,false)
        this.platforms[109] = new level4platform(6900,200,100,false)

        this.platforms[110] = new level4platform(5800,400,100,true);
        this.platforms[111] = new level4platform(5900,400,100,true);
        this.platforms[112] = new level4platform(6000,400,100,true);
        this.platforms[113] = new level4platform(6100,400,100,true);
        this.platforms[114] = new level4platform(6200,400,100,true);
        this.platforms[115] = new level4platform(6300,400,100,true);
        this.platforms[116] = new level4platform(6400,400,100,true);
        this.platforms[117] = new level4platform(6500,400,100,true);
        this.platforms[118] = new level4platform(6600,400,100,true);
        this.platforms[119] = new level4platform(6700,400,100,true);

        this.platforms[120] = new level4platform(5800,600,100,true)
        this.platforms[121] = new level4platform(5900,600,100,true,true)
        this.platforms[122] = new level4platform(6000,600,100,true)
        this.platforms[123] = new level4platform(6100,600,100,true,true)
        this.platforms[124] = new level4platform(6200,600,100,true)
        this.platforms[125] = new level4platform(6300,600,100,true,true)
        this.platforms[126] = new level4platform(6400,600,100,true,)

        this.platforms[127] = new level4platform(6900,600,100,true)
        this.platforms[128] = new level4platform(7050,500,100,true)
        this.platforms[129] = new level4platform(7200,400,100,true,true)
        this.platforms[133] = new level4platform(7250,350,100,true)
        this.platforms[130] = new level4platform(7500,300,100,true)
        this.platforms[134] = new level4platform(7500,100,100,true)
        this.platforms[131] = new level4platform(7300,200,100,true)
        this.platforms[132] = new level4platform(7200,450,100,true)

        this.platforms[135] = new level4platform(7950,370,100,true)
        this.platforms[136] = new level4platform(8050,370,100,true)
        this.platforms[137] = new level4platform(8150,370,100,true)
        this.platforms[138] = new level4platform(8250,370,100,true)
        this.platforms[139] = new level4platform(8350,370,100,true)
        
    }

    loadEnemies(){
        this.enemies[0] = new Ghost(150,500,300,50,20)
        this.enemies[1] = new Ghost(650,500,300,50,20)
        this.enemies[2] = new Ghost(1050,500,300,50,20)
        this.enemies[3] = new Clown(150,670,300,50,20)
        this.enemies[4] = new Ghost(2050,250,300,50,20)
        this.enemies[5] = new Ghost(2150,150,300,50,20)
        this.enemies[6] = new Ghost(2250,250,300,50,20)
        this.enemies[7] = new Ghost(2350,150,300,50,20)
        this.enemies[8] = new Ghost(2450,250,300,50,20)
        this.enemies[9] = new Ghost(2550,150,300,50,20)
        this.enemies[10] = new Ghost(2650,250,300,50,20)
        this.enemies[11] = new Ghost(2750,150,300,50,20)
        this.enemies[12] = new Ghost(2850,250,300,50,20)
        this.enemies[13] = new Ghost(2950,150,300,50,20)
        this.enemies[14] = new Clown(1150,220,100,50,20)
        this.enemies[15] = new Clown(3750,100,300,50,20)
        this.enemies[16] = new Clown(5000,400,1800,50,20)
        this.enemies[17] = new Clown(5000,400,1800,50,20)
        this.enemies[18] = new Clown(5000,400,1800,50,20)
        this.enemies[19] = new Clown(5000,400,1800,50,20)
        this.enemies[20] = new Clown(5000,400,1800,50,20)
        this.enemies[21] = new Clown(5000,400,1800,50,20)
        this.enemies[22] = new Clown(5000,400,1800,50,20)
        this.enemies[23] = new Clown(5000,400,1800,50,20)
        this.enemies[24] = new Clown(5000,400,1800,50,20)
        this.enemies[25] = new Clown(5000,400,1800,50,20)
        this.enemies[36] = new Clown(5000,400,1800,50,20)
        this.enemies[37] = new Clown(5000,400,1800,50,20)
        this.enemies[38] = new Clown(5000,400,1800,50,20)
        this.enemies[39] = new Clown(5000,400,1800,50,20)
        this.enemies[40] = new Clown(5000,400,1800,50,20)
        this.enemies[41] = new Clown(5000,400,1800,50,20)
        this.enemies[42] = new Clown(5000,400,1800,50,20)
        this.enemies[43] = new Clown(5000,400,1800,50,20)
        this.enemies[44] = new Clown(5000,400,1800,50,20)
        this.enemies[45] = new Clown(5000,400,1800,50,20)
        this.enemies[26] = new Ghost(5100,100,300,50,20)
        this.enemies[27] = new Ghost(5200,100,300,50,20)
        this.enemies[28] = new Ghost(5300,100,300,50,20)
        this.enemies[29] = new Ghost(5400,100,300,50,20)
        this.enemies[30] = new Ghost(5500,100,300,50,20)
        this.enemies[31] = new Clown(5500,200,100,50,20)
        this.enemies[32] = new Ghost(6050,200,100,50,20)
        this.enemies[33] = new Ghost(6350,300,100,50,20)
        this.enemies[34] = new Ghost(6650,250,100,50,20)
        this.enemies[35] = new Ghost(6950,200,100,50,20)
    }

    loadDoors(){
        this.doors[0] = new Door(1300,550,1270,430);
        this.doors[1] = new Door(1575,330,2075,330);
        this.doors[2] = new Door(4650,130,5050,530);
        this.doors[4] = new Door(5650,530,5325,230);
        this.doors[3] = new Door(4650,330,5050,130);
        this.doors[5] = new Door(6425,530,8000,300);  
    }
    
    loadResources(){
        this.resources[0] = new Key(1100, 590, 10, 10); 
        this.resources[1] = new Key(1220, 200, 10, 10);
        this.resources[2] = new Crucifix(2200,380,10,10)
        this.resources[3] = new GhostPowerUp(2500,70,10,10)
        this.resources[5] = new Key(4500, 270, 10, 10);
        this.resources[6] = new Key(5300, 580, 10, 10);
        this.resources[7] = new GhostPowerUp(5750,70,10,10)

    }

    // loadBackgrounds(num){ 
    //     /*let backgrounds = [];
    //     for(let i = 0; i < num; i++){
    //         backgrounds[i] = document.createElement("img");
    //         let path = "Images/Level" + this.id +"/Lvl" + this.id + "Background/bg" + (i+1)+".png";
    //         //the images need to be set in order from furthest back to furthest forward
    //         console.log(path);
    //         backgrounds[i].src = path;
    //     }
    //     this.background = new genericBackground(backgrounds);
    //  */   
    // }

    update() {

        /*if (game.hero.loc.x >= 8350) {
            gameState++;
        }*/
    }

   
}