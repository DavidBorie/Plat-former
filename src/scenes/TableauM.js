class TableauM extends Tableau{

    preload() {
        super.preload();
        this.load.image('star', 'assets/star.png');
        this.load.image('monster-mouvant', 'assets/monster-mouvant.png');
        this.load.image('monster-sautant', 'assets/monster-sautant.png');
        this.load.image('monster-immobile', 'assets/monster-immobile.png');
        this.load.image('monster-volant', 'assets/monster-volant.png');
        this.load.image('monster-rapide', 'assets/monster-rapide.png');

        //this.load.image('monster-fly2', 'assets/monster-fly2.png');

    }
    create() {
        super.create();
        //quelques étoiles
        let largeur=64*2;
        this.stars=this.physics.add.group();
        for(let posX=largeur/2;posX<largeur*7;posX+=largeur){
            this.stars.create(posX ,0,"star");
        }
        this.stars.children.iterate(function (child) {
            child.setBounce(1);
            child.setGravity(1);
            child.setCollideWorldBounds(true);
            child.setVelocity( 0,Phaser.Math.Between(-100, 100));
            child.setMaxVelocity(0,500);
        });
        this.physics.add.overlap(this.player, this.stars, this.ramasserEtoile, null, this);

        
        //nos monstres
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-mouvant");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(100,100);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(60);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);


        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-rapide");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(80,80);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(0);
        this.monstre.setVelocityX(250);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);

        
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-180,"monster-sautant");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(70,70);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(10);
        this.monstre.setVelocityX(70);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        
        
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-64,"monster-immobile");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(170,170);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(0);
        this.monstre.setVelocityX(0);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        
        
        new MonsterFly(this,400,100);
        new MonsterZombie(this,600,400);
        //new MonsterFly(this,400,0);
        //new MonsterFly2(this,600,50);
        /*
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(64,64);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        */
    }

}
