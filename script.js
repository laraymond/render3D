// define variables
var scene, camera, renderer,controls,mixer,clock;

//call initialisation function
init();
//call animation function 
animate();
function init(){
    scene = new Three.Scene();

    // Create a basic perspective camera
    camera = new Three.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.y = 2;
    camera.position.z = 5;
    camera.up.set(1, -1, 0.3 );

    // Create control commands 
    controls = new Three.TrackballControls(camera);
    controls.rotateSpeed = 2.0;
    controls.zoomSpeed = 0.3;
    controls.panSpeed = 0.2;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;
    controls.minDistance = 0.3;
    controls.maxDistance = 0.3 * 100;
    // Create a renderer with Antialiasing
    renderer = new Three.WebGLRenderer({antialias:true});

    // Loader for PCD files.
    loader = new Three.PCDLoader();

    // Configure renderer clear color
    renderer.setClearColor("#000000");

    // Configure renderer size
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );

    
    document.body.appendChild( renderer.domElement );
    var frame1 = addPCD("1");
    var frame2 = addPCD("2");
    var frame3 = addPCD("3");
    var frame4 = addPCD("4");
    var frame5 = addPCD("5");
    var frame6 = addPCD("6");
    var frame7 = addPCD("7");
    var frame8 = addPCD("8");
    Promise.all([
        frame1, 
        frame2,
        frame3, 
        frame4, 
        frame5,
        frame6,
        frame7,
        frame8,
    ]).then(function(values) {
    
        values.forEach(function(current, index){
            setTimeout(function(){
                current.name = 'test_name'
                scene.remove(scene.getObjectByName('test_name'))
                scene.add(current);
            },
            1000 * index);
        })
    
        console.log(values);
    });
    // Load a PCD file.
    function addPCD(frame) {
        return new Promise(function(resolve, reject) {
    loader.load(
        // resource URL
        './frames/ptcloud-rotated-15:08:05frame'+frame+'.pcd',
        // called when the resource is loaded
        function ( mesh ) {
            resolve(mesh)
            mesh.material.size*=5;
            mesh.material.needsUpdate=true;
            mesh.material.color.set("#ffb3b3");
            mesh.material.needsUpdate=true;
            var center = mesh.geometry.boundingSphere.center;
            controls.target.set( center.x, center.y, center.z );
            controls.update();

        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
    });
    }
    window.addEventListener( 'resize', onWindowResize, false );
}
//
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls.handleResize();
    
}
// Render Loop
function  animate() {
  requestAnimationFrame( animate);
  controls.update();
  renderer.render(scene, camera);
};

