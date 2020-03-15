const THREE = require("three");
const height = 400, width = 250;

var camera,scene,renderer;
var geometry,material;


    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, width/height);
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(width,height);
    $("#preview3D").append(renderer.domElement);
    
    geometry = new THREE.BoxGeometry(1,1,1);
    material = new THREE.MeshBasicMaterial({color:0xff0000});



    var animate = function() {
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }
animate();

