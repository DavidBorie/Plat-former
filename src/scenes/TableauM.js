class TableauM extends Tableau{

    preload() {
        super.preload();
        this.load.image('monster-violet', 'assets/monster-violet.png');
        //1.monstre volant 2.monstre mouvant 3.Monstre immobile 4. Monstre sautant  5.Monstre Rapide
    }
    create() {
        super.create();
        
        //notre monstre
        this.monstre=this.physics.add.sprite(300,this.sys.canvas.height-70,"monster-violet");
        this.monstre.setOrigin(0,0);
        this.monstre.setDisplaySize(100,100);
        this.monstre.setCollideWorldBounds(true);
        this.monstre.setBounce(1);
        this.monstre.setVelocityX(50);
        this.physics.add.overlap(this.player, this.monstre, this.hitSpike, null, this);



    }

}
