var FluxLayer = function(sectorWidth, sectorHeight, divContainer) {
  this.localTravels = [];
  this.globalTravels= [];
  this.staticLines = [];
  this.scene;
  this.camera;
  this.renderer;
  this.stats;
  this.colors = [];
  this.container;
  this.frameIt;
  this.WIDTH;
  this.HEIGHT;  
  this.delayAnimation; 
  this.nbParallelQueue = 5;
  this.newZoom = "";
  this.oldZoom = "";
  

	this.init = function() {
    this.frameIt = 0;
    this.delayAnimation = false;
    this.container = divContainer;
    this.WIDTH = window.innerWidth;
    this.HEIGHT = window.innerHeight;    
    this.__initThreeCanvas(sectorWidth, sectorHeight);
		this.init = function() {};
	}; 	
  
  FluxLayer.prototype.__initThreeCanvas = function(sectorWidth, sectorHeight) { 
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  
    var color1 = new THREE.Color(Math.random(), Math.random(), Math.random());
    var colorWhite = new THREE.Color(255, 255, 255);
    var colorBlack = new THREE.Vector4(255, 255, 255, 0);
    this.colors = [colorBlack, colorWhite, color1, color1, colorBlack];
      
  
    this.camera = new THREE.PerspectiveCamera( 60, this.WIDTH / this.HEIGHT, 1, 200 );
    this.camera.position.z = 150;
    this.scene = new THREE.Scene();    

    this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0px';
		$('body').append( this.stats.domElement )
  
    this.renderer = new THREE.CanvasRenderer();
    //this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    //renderer.setClearColor( 0x111111 );
    this.renderer.setClearColor( 0x000000 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.WIDTH, this.HEIGHT );
    
    $('#containerThree').attr({width:sectorWidth, height:sectorHeight});
    //var container = document.getElementById( 'containerThree' );
    $('#containerThree').append(this.renderer.domElement);  
  
    for(var l=0; l<10; l++) {
      this.drawLine();
    }
    
    
    var me = this;
    function animate() {      
      requestAnimationFrame( animate );
      me.__render();
      me.stats.update();      
      this.delayAnimation = !me.stats.canUpdate();
    };     
    animate();
  };
  
  FluxLayer.prototype.drawLine = function() { 
      
    var curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3( -50, 0, 0 ),
      new THREE.Vector3( -25, 75, 20 ),
      new THREE.Vector3( 100, 75, -50 ),
      new THREE.Vector3( 50, 0, 0 )
    );
    
    var curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3( Math.random()*200-100, Math.random()*200-100, Math.random()*200-100 ),
      new THREE.Vector3( Math.random()*200-100, Math.random()*200-100, Math.random()*200-100 ),
      new THREE.Vector3( Math.random()*200-100, Math.random()*200-100, Math.random()*200-100 ),
      new THREE.Vector3( Math.random()*200-100, Math.random()*200-100, Math.random()*200-100 )
    ); 
    
    
    var geometryLine = new THREE.Geometry();
    geometryLine.vertices = curve.getPoints(60);   
    
    for(var i=0; i<geometryLine.vertices.length; i++) {
      geometryLine.colors[i] = this.colors[0];
    }    
    
    var material = new THREE.LineBasicMaterial( { linewidth: 2, color: 0xffffff, vertexColors: THREE.VertexColors } );	
    var object = new THREE.Line( geometryLine, material );
    
    object.zoomOptimal = ["secteur"];

    this.localTravels.push( geometryLine );
    this.scene.add( object );
    

    //container.appendChild( renderer.domElement );
    this.delayAnimation = false;
   
  };
  
  /*FluxLayer.prototype.__animateLines = function() {   
    requestAnimationFrame( this.__animateLines );
    this.__render();
    //stats.update();
  };*/ 
  
  FluxLayer.prototype.__render = function() {   
    
    // TODO : afficher en fonction du zoom
    //console.log(globalMap.ui.zoom);
    this.scene.children[0].traverse( function ( object ) { object.visible = false; } );
    //console.log(this.scene.children[0]);
    // Animations
    if (!this.delayAnimation) {
      for ( var l = (this.frameIt%this.nbParallelQueue); l < this.localTravels.length; l += this.nbParallelQueue ) {
        for(var p=0; p < this.localTravels[l].vertices.length; p++) {	
          this.localTravels[l].colors[p] = this.colors[Math.floor(p+this.frameIt/this.nbParallelQueue)%5];
        }	
      }      
      this.__checkVisibleObjects();      
      this.frameIt++;      
      this.renderer.render( this.scene, this.camera );
    }
    
    //scene.add( directionalLight );
 
  };
  
  FluxLayer.prototype.__checkVisibleObjects = function() {        
      // TODO : desactiver des objets au changement de zoom
      //if () {}
      this.newZoom = "secteur";
      if (this.oldZoom != this.newZoom) {
        for(var c=0; c<this.scene.children.length; c++) {
          this.scene.children[c].traverse( function ( object ) { object.visible = $.inArray(this.newZoom, object.zoomOptimal); } );
        }
        this.oldZoom = this.newZoom;
      }      
      // TODO : desactiver des objets hors champs tous les 1000 frames
  }  	
	
	this.init();	
};
