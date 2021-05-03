class TableauTiled extends Tableau{

  preload() {
    super.preload();
    // ------pour TILED-------------
    // nos images
    this.load.image('tiles', 'assets/toto/Tuiles/tableauTiledTileset.png');
    //les données du tableau qu'on a créé dans TILED
    this.load.tilemapTiledJSON('map', 'assets/toto/Level1.json');


    //atlas de texture généré avec https://free-tex-packer.com/app/
    //on y trouve notre étoiles et une tête de mort
    //this.load.atlas('particles', 'assets/particles/particles.png', 'assets/particles/particles.json');
}

create() {
  super.create();

  //on en aura besoin...
  let ici=this;

        //--------chargement de la tile map & configuration de la scène-----------------------
        
        //notre map
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tableauTiledTileset', 'tiles');

        //on agrandit le champ de la caméra du coup
        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //---- ajoute les plateformes simples ----------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        this.eau = this.map.createLayer('eau', this.tileset, 0, 0);


        //on définit les collisions, plusieurs méthodes existent:

        // 1 La méthode que je préconise (il faut définir une propriété dans tiled pour que ça marche)
        //permet de travailler sur un seul layer dans tiled et des définir les collisions en fonction des graphiques
        //exemple ici https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
        this.solides.setCollisionByProperty({ collides: true });
        //this.lave.setCollisionByProperty({ collides: true });
        
          //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.solides);
        this.player.setDepth(100);

        /*
        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('final', 'tiles');
        this.background = this.map.createLayer('Calque Tuiles décorative', this.tileset, 0, 0);
        this.player.setDepth(10000);
        this.platforms = this.map.createLayer('Calque Tuiles solide', this.tileset, 0, 0);
        this.platforms.setCollisionByExclusion(-1,true);
        this.star1=this.physics.add.sprite(800,100,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(1);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.star1);
        this.physics.add.collider(this.star1, this.platforms);
        
        
*/
  });

        //--------effet sur la lave------------------------

        this.laveFxContainer=this.add.container();
        this.lave.forEachTile(function(tile){ //on boucle sur TOUTES les tiles de lave pour générer des particules
            if(tile.index !== -1){ //uniquement pour les tiles remplies

                /*
                //dé-commenter pour mieux comprendre ce qui se passe
                console.log("lave tile",tile.index,tile);
                let g=ici.add.graphics();
                laveFxContainer.add(g);
                g.setPosition(tile.pixelX,tile.pixelY)
                g.lineStyle(1,0xFF0000);
                g.strokeRect(0, 0, 64, 64);
                */

                //on va créer des particules
                let props={
                    frame: [
                        //'star', //pour afficher aussi des étoiles
                        'death-white'
                    ],
                    frequency:200,
                    lifespan: 2000,
                    quantity:2,
                    x:{min:-32,max:32},
                    y:{min:-12,max:52},
                    tint:[  0xC11A05,0x883333,0xBB5500,0xFF7F27 ],
                    rotate: {min:-10,max:10},
                    speedX: { min: -10, max: 10 },
                    speedY: { min: -20, max: -30 },
                    scale: {start: 0, end: 1},
                    alpha: { start: 1, end: 0 },
                    blendMode: Phaser.BlendModes.ADD,
                };
                let props2={...props}; //copie props sans props 2
                props2.blendMode=Phaser.BlendModes.MULTIPLY; // un autre blend mode plus sombre

                //ok tout est prêt...ajoute notre objet graphique
                let laveParticles = ici.add.particles('particles');

                //ajoute le premier émetteur de particules
                laveParticles.createEmitter(props);
                //on ne va pas ajouter le second effet émetteur mobile car il consomme trop de ressources
                if(!ici.isMobile) {
                    laveParticles.createEmitter(props2); // ajoute le second
                }
                // positionne le tout au niveau de la tile
                laveParticles.x=tile.pixelX+64;
                laveParticles.y=tile.pixelY+64;
                ici.laveFxContainer.add(laveParticles);

                //optimisation (les particules sont invisibles et désactivées par défaut)
                //elles seront activées via update() et optimizeDisplay()
                laveParticles.pause();
                laveParticles.visible=false;
                //on définit un rectangle pour notre tile de particules qui nous servira plus tard
                laveParticles.rectangle=new Phaser.Geom.Rectangle(tile.pixelX,tile.pixelY,64,64);

    }

}
