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
  this.offsetX = 0;
  this.offsetY = 0;
  this.scrollX = 0;
  this.scrollY = 0; 
  

	this.init = function() {
    this.frameIt = 0;
    this.delayAnimation = false;
    this.container = divContainer;
    this.viewportWidth = container.clientWidth;
    this.viewportHeight = container.clientHeight;    
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
    this.camera = new THREE.OrthographicCamera( 0, this.viewportWidth, 0, this.viewportHeight, 0, 100 );
    //this.camera = new THREE.OrthographicCamera( sectorWidth / - 2, sectorWidth / 2, sectorHeight / 2, sectorHeight / - 2, -100, 100 );
    
    //this.camera = new THREE.OrthographicCamera( this.viewportWidth, 100, -this.viewportWidth, 100, 0, 100 );
    
    //this.camera = new THREE.OrthographicCamera( 0, this.viewportWidth, 0, this.viewportHeight, -100, 100 );

    this.camera.position.X = -2000;
    //this.camera.position.y = 0;
    this.camera.position.z = 0;
    this.camera.zoom = globalMap.ui.zoom;
    //this.camera.lookAt(new THREE.Vector3( sectorWidth/2, sectorWidth/2, 0 ));
    //this.camera.lookAt(new THREE.Vector3(0, 0, 0 ));

    this.scene = new THREE.Scene();    
    /*this.cameraHelper = new THREE.CameraHelper( this.camera );
    this.scene.add( this.cameraHelper );    */

    this.stats = new Stats();
		this.stats.domElement.style.position = 'absolute';
		this.stats.domElement.style.top = '0px';
		$('body').append( this.stats.domElement );
    
    // axis helper
    var axes = new THREE.AxisHelper( 1000 );
    this.scene.add( axes );    
  
    this.renderer = new THREE.CanvasRenderer();
    //this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    //renderer.setClearColor( 0x111111 );
    this.renderer.setClearColor( 0x000000 );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( this.viewportWidth, this.viewportHeight );
    
    //$('#containerThree').attr({width:sectorWidth, height:sectorHeight});
    //var container = document.getElementById( 'containerThree' );
    $('#containerThree').append(this.renderer.domElement);  
  
    /*for(var l=0; l<30; l++) {
      
      this.drawPoint(4000*Math.random(), 1000*Math.random());
    }*/
    this.drawPoint(2505, 895);
    
    
    var me = this;
    function animate() {      
      requestAnimationFrame( animate );
      me.__render();
      me.stats.update();      
      this.delayAnimation = !me.stats.canUpdate();
    };     
    
    this.zoomTo(0,0);
    animate();
  };
  
  
  FluxLayer.prototype.drawPoint = function(x, y) { 
    var pointLight = new THREE.PointLight( 0xFF0000 );
    
    // set its position
    pointLight.position.x = x;
    pointLight.position.y = y;
    pointLight.position.z = 0;
    var sphere = new THREE.SphereGeometry( 5, 32, 32 );
    pointLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xff0040 } ) ) );
    
    // add to the scene
    this.scene.add(pointLight);
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
    object.visible = ($.inArray(this.newZoom, object.zoomOptimal) >= 0);
    this.scene.add( object );    
    this.delayAnimation = false;  
    this.zoomTo(globalMap.ui.scrollX, globalMap.ui.scrollY); 
  };  
  
  FluxLayer.prototype.__render = function() {   
    
    // TODO : afficher en fonction du zoom
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
      this.camera.position.x = this.offsetX + this.scrollX;
      this.camera.position.y = this.offsetY + this.scrollY;
    }
 
  };
  
  FluxLayer.prototype.__checkVisibleObjects = function() {        
      // TODO : desactiver des objets au changement de zoom
      this.newZoom = globalMap.ui.getZoomLvl();
      var newZoom = this.newZoom;
      if (this.oldZoom != this.newZoom) {
        for(var c=0; c<this.scene.children.length; c++) {
          this.scene.children[c].traverse( function ( object ) { 
            object.visible = ($.inArray(newZoom, object.zoomOptimal) >= 0); } );
        }
        this.oldZoom = this.newZoom;
      }      
      // TODO : desactiver des objets hors champs tous les 1000 frames
  };  	
  
  FluxLayer.prototype.scrollTo = function(left, top) {
      this.scrollX = left/globalMap.ui.zoom;
      this.scrollY = top/globalMap.ui.zoom;
      $('#containerThree').removeClass('moving');
  };  
  
  FluxLayer.prototype.zoomTo = function(left, top) {
    if (globalMap.ui.zoom != undefined) {
      this.camera.zoom = globalMap.ui.zoom;
      this.camera.updateProjectionMatrix();
    }
    this.offsetX = ((this.viewportWidth/globalMap.ui.zoom) - this.viewportWidth)/2;    
    this.offsetY = ((this.viewportHeight/globalMap.ui.zoom) - this.viewportHeight)/2;
    if (left != undefined && top != undefined) {
      this.scrollX = left/globalMap.ui.zoom;
      this.scrollY = top/globalMap.ui.zoom;    
    }
    $('#containerThree').removeClass('moving');
  };  
	
	this.init();	
};
