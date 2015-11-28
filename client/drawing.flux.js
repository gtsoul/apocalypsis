var FluxLayer = function(sectorWidth, sectorHeight) {

	this.init = function() {
    this.__initThreeCanvas(sectorWidth, sectorHeight);
		this.init = function() {};
	}; 	
  
  FluxLayer.prototype.__initThreeCanvas = function(sectorWidth, sectorHeight) { 
    if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
  
    var renderer, scene, camera; //, stats;
    var objects = [];
    // var directionalLight;
    
    var frameIt = 0;
    
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;
  
    var color1 = new THREE.Color(Math.random(), Math.random(), Math.random());
    var colorWhite = new THREE.Color(255, 255, 255);
    var colorBlack = new THREE.Vector4(255, 255, 255, 0);
    var colors = [colorBlack, colorWhite, color1, color1, colorBlack];	
    var geometryLine;
      
    drawLine();
    animateLine();
  
    function drawLine() {
  
      camera = new THREE.PerspectiveCamera( 60, WIDTH / HEIGHT, 1, 200 );
      camera.position.z = 150;
  
      scene = new THREE.Scene();
      
      root = new THREE.Object3D();
      
      var curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3( -50, 0, 0 ),
        new THREE.Vector3( -25, 75, 20 ),
        new THREE.Vector3( 100, 75, -50 ),
        new THREE.Vector3( 50, 0, 0 )
      );
      
      geometryLine = new THREE.Geometry();
      geometryLine.vertices = curve.getPoints(60);
      
      var material = new THREE.LineBasicMaterial( { linewidth: 3, color: 0xffffff, vertexColors: THREE.VertexColors } );	
      var object = new THREE.Line( geometryLine, material );
  
      objects.push( object );
      scene.add( object );
      
      renderer = new THREE.CanvasRenderer();
      //renderer.setClearColor( 0x111111 );
      renderer.setClearColor( 0x000000 );
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize( WIDTH, HEIGHT );
      
      $('#containerThree').attr({width:sectorWidth, height:sectorHeight});
      var container = document.getElementById( 'containerThree' );
      $('#containerThree').append(renderer.domElement);
      //container.appendChild( renderer.domElement );
      
    }
    
    function animateLine() {
      requestAnimationFrame( animateLine );
      render();
      //stats.update();
    }
  
    function render() {
      var time = Date.now() * 0.001;
      for ( var i = 0; i < objects.length; i ++ ) {
        var object = objects[ i ];
        //object.rotation.x = 0.25 * time * ( i%2 == 1 ? 1 : -1);
        //object.rotation.x = 0.25 * time;
        //object.rotation.y = 0.25 * time;
      }
  
      for(var i=0; i<geometryLine.vertices.length; i++) {				
        //console.info(Math.floor(i+time)%3);
        geometryLine.colors[i] = colors[Math.floor(i+frameIt/10)%5];
      }				
      
      //scene.add( directionalLight );
      renderer.render( scene, camera );
      frameIt++;
    }      
  };	
	
	this.init();	
};
