class Tableau00 extends Tableau{

    preload() {
        super.preload();
        this.load.image('monster-violet', 'assets/monster-violet.png');
        this.load.image('monster-fly', 'assets/monster-fly.png');
    }
    create() {
        super.create();

        //des étoiles
        this.star1=this.physics.add.sprite(200,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);

        this.star2=this.physics.add.sprite(400,100,"star");
        this.star2.setCollideWorldBounds(true);
        this.star2.setBounce(0.5);

        this.star3=this.physics.add.sprite(600,100,"star");
        this.star3.setCollideWorldBounds(true);
        this.star3.setBounce(1);

          //monstre terrestre
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(100,100);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);
        
        
        
        //monstre aérien
         new MonsterFly(this,400,100);
        new MonsterFly(this,600,100);
    }

}
