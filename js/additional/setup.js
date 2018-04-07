var t = 0, val = 1000;

function setup()
{
	/*
		*creating paths
	*/

	var upts_0a = 
	[
		new THREE.Vector3(950, -120 + val, -800), 
		new THREE.Vector3(1400, -150 + val, -800), 
		new THREE.Vector3(1400, -150 + val, 250), 
		new THREE.Vector3(20, 170 + val, 300) 
	];

	var upts_0b = 
	[
		new THREE.Vector3(-100, 170 + val, 300),
		new THREE.Vector3(-1700, -250 + val, 250), 
		new THREE.Vector3(-1700, -150 + val, 1300), 
		new THREE.Vector3(-1150, -150 + val, 1300) 
	]; 

	var upts_0c = 
	[
		new THREE.Vector3(-1050, -150 + val, 1300),
		new THREE.Vector3(-700, -20 + val, 1300), 
		new THREE.Vector3(-900, -80 + val, -100), 
		new THREE.Vector3(-100, 170 + val, 100) 
	]; 

	var upts_0d = 
	[
		new THREE.Vector3(20, 170 + val, 100),
		new THREE.Vector3(700, -60 + val, 100), 
		new THREE.Vector3(500, -20 + val, -800), 
		new THREE.Vector3(950, -120 + val, -800) 
	]; 


	var b = new Path("red", true);
	
	b.part(upts_0a, 40);
	b.part(upts_0b, 40);
	b.part(upts_0c, 40);
	b.part(upts_0d, 40);

	bear = b.create(false);	

	/*
		*creating range of objects
	*/

	ast.static(

		'models/island/scene.gltf',

		new THREE.Vector3(0, 0, 0),

		new THREE.Euler(0, 0, 0),

		new THREE.Vector3(4.2, 4.2, 4.2)

	);

	ast.static(

		'models/assets/elm_tree/scene.gltf', 

		new THREE.Vector3(-1210, -199, -1100), 

		new THREE.Euler(-0.2, 0, 0.05),

	);

	ast.static(

		'models/assets/spruce_tree/scene.gltf',

		new THREE.Vector3(-1010, -150, -1000), 

		new THREE.Euler(0, 0, -0.05),

	);

	ast.static(

		'models/assets/spruce_tree/scene.gltf',

		new THREE.Vector3(-850, -150, -1300), 

		new THREE.Euler(-0.1, 0, -0.1),

		new THREE.Vector3(0.6, 0.6, 0.6)

	);

	ast.animated(

		'models/assets/bear/scene.gltf',

		new THREE.Vector3(1010, -150, -1000), 

		new THREE.Euler(-0.3, -0.5, -0.3),

		new THREE.Vector3(100, 100, 100),

		false,

		true

	);

	ast.animated(

		'models/assets/birch_tree/scene.gltf',

		new THREE.Vector3(1210, -150, 1300), 

		new THREE.Euler(0.2, 0, -0.2),

		false,

		0.055, 

		false

	);

	ast.animated(

		'models/assets/birch_tree/scene.gltf',

		new THREE.Vector3(1100, -150, 1200), 

		new THREE.Euler(-0.1, 0.5, 0.1),

		new THREE.Vector3(0.6, 0.6, 0.6),

		0.0575, 

		false	

	);	
}

function act()
{
	for (var i = 0; i < hlps.actions.length; i++)
	{
 		hlps.actions[i].update(hlps.clock.getDelta());
	}

	for (var i = 0; i < hlps.animarr.length; i++) 
	{
		t += 0.045;

		var pos = new THREE.Vector3();
		var next = new THREE.Vector3();

		pos.copy(bear.getPointAt((t / 100) % 1));
		hlps.animarr[i].position.set(pos.x, pos.y, pos.z);

		next.copy(bear.getPointAt(((t + 0.1) / 100) % 1));
		hlps.animarr[i].lookAt(next);
	}
}