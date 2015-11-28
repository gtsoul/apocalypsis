var FluxLayer = function(sectorWidth, sectorHeight, divContainer) {
  this.dynamicLines= [];
  this.scene;
  this.camera;
  this.cameraHelper;
  this.renderer;
  this.stats;
  this.colors = [];
  this.container;
  this.frameIt;
  this.viewportWidth;
  this.viewportHeight;  
  this.delayAnimation; 
  this.nbParallelQueue = 5;
  this.newZoom = "";
  this.oldZoom = "";
  

	this.init = function() {
    this.frameIt = 0;
    this.delayAnimation = false;
    this.container = divContainer;
    this.viewportWidth = window.innerWidth;
    this.viewportHeight = window.innerHeight;    
    this.__initThreeCanvas(sectorWidth, sectorHeight);
		this.init = function() {};
	}; 	
  
  FluxLayer.prototype.__initThreeCanvas = function(sectorWidth, sectorHeight) { 
    console.log(sectorWidth+"/"+sectorHeight);
    console.log(this.viewportWidth+"/"+this.viewportHeight);
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  
    var color1 = new THREE.Color(Math.random(), Math.random(), Math.random());
    var colorWhite = new THREE.Color(255, 255, 255);
    var colorBlack = new THREE.Vector4(255, 255, 255, 0);
    this.colors = [colorBlack, colorWhite, color1, color1, colorBlack];
      
  
    //this.camera = new THREE.PerspectiveCamera( 90, this.viewportWidth / this.viewportHeight, 1, 200 );
    //this.camera = new THREE.OrthographicCamera( this.viewportWidth / - 2, this.viewportWidth / 2, this.viewportHeight / 2, this.viewportHeight / - 2, -100, 100 );
    
    this.camera = new THREE.OrthographicCamera( 0, this.viewportWidth, 0, this.viewportHeight, -100, 100 );
    this.camera.position.z = 0;

    this.scene = new THREE.Scene();    
    this.cameraHelper = new THREE.CameraHelper( this.camera );
    this.scene.add( this.cameraHelper );    

    this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0px';
		$('body').append( this.stats.domElement )
  
    this.renderer = new THREE.CanvasRenderer();
    //this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    //renderer.setClearColor( 0x111111 );
    this.renderer.setClearColor( 0x000000 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.viewportWidth, this.viewportHeight );
    
    $('#containerThree').attr({width:sectorWidth, height:sectorHeight});
    //var container = document.getElementById( 'containerThree' );
    $('#containerThree').append(this.renderer.domElement);  
  
    /*for(var l=0; l<10; l++) {
      this.drawLine();
    }*/
    
    
    var me = this;
    function animate() {      
      requestAnimationFrame( animate );
      me.__render();
      me.stats.update();      
      this.delayAnimation = !me.stats.canUpdate();
    };     
    animate();
  };
  
  FluxLayer.prototype.drawLine = function(geometryLine, material, isDynamic, zooms) { 
      
    /*var curve = new THREE.CubicBezierCurve3(
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
    geometryLine.vertices = curve.getPoints(60);*/   
    
    for(var i=0; i<geometryLine.vertices.length; i++) {
      geometryLine.colors[i] = this.colors[0];
    }    
    
    //var material = new THREE.LineBasicMaterial( { linewidth: 2, color: 0xffffff, vertexColors: THREE.VertexColors } );	
    var object = new THREE.Line( geometryLine, material );
    
    object.zoomOptimal = zooms;

    if (isDynamic) {
      this.dynamicLines.push( geometryLine);
    }
    object.visible = (true || $.inArray(this.newZoom, object.zoomOptimal) >= 0);
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
    //console.log(this.scene.children[0]);
    // Animations
    if (!this.delayAnimation) {
      for ( var l = (this.frameIt%this.nbParallelQueue); l < this.dynamicLines.length; l += this.nbParallelQueue ) {
        for(var p=0; p < this.dynamicLines[l].vertices.length; p++) {	
          this.dynamicLines[l].colors[p] = this.colors[Math.floor(p+this.frameIt/this.nbParallelQueue)%5];
        }	
      }      
      this.__checkVisibleObjects();      
      this.frameIt++;      
      this.renderer.render( this.scene, this.camera );
      this.cameraHelper.update();
    }
    
    //scene.add( directionalLight );
 
  };
  
  FluxLayer.prototype.__checkVisibleObjects = function() {        
      // TODO : desactiver des objets au changement de zoom
      //if () {}
      this.newZoom = globalMap.ui.getZoomLvl();
      if (this.oldZoom != this.newZoom) {
        for(var c=0; c<this.scene.children.length; c++) {
          this.scene.children[c].traverse( function ( object ) { object.visible = (true || $.inArray(this.newZoom, object.zoomOptimal) >= 0); } );
        }
        this.oldZoom = this.newZoom;
      }      
      // TODO : desactiver des objets hors champs tous les 1000 frames
  };  	
  
  FluxLayer.prototype.scrollTo = function(left, top) {
    console.log("scrollTo "+left+"/"+top);
    this.camera.lookAt(new THREE.Vector3( left, top, 0 ));
    //this.camera.position.left += 10;   
    //this.camera.position.top += 10;
    
      //this.renderer.render( this.scene, this.camera );
      this.__render();
  };  
  
  FluxLayer.prototype.zoomTo = function(zoom) {
    console.log("zoomTo "+zoom);
    //this.camera.position.top += 10;
  };  
	
	this.init();	
};
