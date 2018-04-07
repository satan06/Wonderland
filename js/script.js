var container;
var camera, scene, renderer;
var controls;
var ast = new Asset();

init();
animate();

function init()
{
	container = document.getElementById('container');
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 10000);

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor(0xCCF5FF);
	
	renderer.shadowMapEnabled = true;
	renderer.shadowMapSoft = true;
	renderer.shadowMapType = THREE.PCFShadowMap;
	renderer.shadowCameraNear = 3;

	renderer.shadowMapBias = 0.0039;
	renderer.shadowMapDarkness = 0.5;
	renderer.shadowMapWidth = 2048;
	renderer.shadowMapHeight = 2048;

	container.appendChild(renderer.domElement);

	camera.position.x = 0;
	camera.position.y = 4000;
	camera.position.z = 4000;
	camera.lookAt(new THREE.Vector3(0, 0, 0));

	/*
		*creating controls system to understand scene easyliy
	*/

	controls = new THREE.TrackballControls(camera);
	controls.target.set(0, -0.2, -0.2);	

	setup();
	lightning();
}

function lightning()
{
	/*
		*creating range of variables 'lights' to set them in scene
	*/

	var ambientLight = new THREE.AmbientLight(0XFFE6E6, 0.3);
	scene.add(ambientLight);

	var light = new THREE.SpotLight(0XFF9999, 1.2);

	light.position.set(2000, 1200, 2500);
	light.target.position.set(-50, 0, -50);

	scene.add(light.target);
	
	light.castShadow = true;
	light.shadow.camera.near = 100;
	light.shadow.camera.far = 900;
	light.shadow.camera.fov = 90;
	light.shadow.bias = 0.0001;
	light.shadow.mapSize.width = 2048;	
	light.shadow.mapSize.height = 2048;

	scene.add(light);
}

function animate()
{			
	requestAnimationFrame(animate);

	renderer.render(scene, camera);	
	controls.update();
	act();
}
