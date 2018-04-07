var hlps =
{
	loader: new THREE.GLTFLoader(),
	clock: new THREE.Clock(),
	mixer: this.mixer,
	actions: [],
	animarr: []
};

class Asset
{
	constructor()
	{	
	}

	static(url, pos, rot, scale)
	{
		hlps.loader.load(url, function (gltf) 
		{
			gltf.scene.traverse( 

				function (child)
				{
					if (child.isMesh) 
					{
						child.castShadow = true;
						child.recieveShadow = true;
					}
				});

			if(pos != undefined)
				gltf.scene.position.set(pos.x, pos.y, pos.z);

			if(rot != undefined)
				gltf.scene.rotation.set(rot.x, rot.y, rot.z);

			if(scale != undefined)
				gltf.scene.scale.set(scale.x, scale.y, scale.z);

			scene.add(gltf.scene);

		});
	}

	animated(url, pos, rot, scale, duration, translate)
	{
		hlps.loader.load(url, function (gltf) 
		{
			gltf.scene.traverse( 

				function (child)
				{
					if (child.isMesh) 
					{
						child.castShadow = true;
						child.recieveShadow = true;
					}
				});

			if(pos != false)
				gltf.scene.position.set(pos.x, pos.y, pos.z);

			if(rot != false)
				gltf.scene.rotation.set(rot.x, rot.y, rot.z);

			if(scale != false)
				gltf.scene.scale.set(scale.x, scale.y, scale.z);

			/*
				*setup animations
			*/	

			hlps.mixer = new THREE.AnimationMixer(gltf.scene);

			if(duration != false)
				hlps.mixer.clipAction(gltf.animations[0]).setDuration(duration).play();	
			else
				hlps.mixer.clipAction(gltf.animations[0]).play();

			hlps.actions.push(hlps.mixer);

			/*
				*setup objects to move along path 
			*/	

			if(translate) 
				hlps.animarr.push(gltf.scene);

			scene.add(gltf.scene);
		});
	}  
} 

class Path
{
	constructor(color, closed)
	{
		this.color = color;
		this.closed = closed;
	}

	vertices()
	{
		return [];
	} 

	part(points, interm)
	{
		var curve = new THREE.CubicBezierCurve3(

			points[0],
			points[1],
			points[2],
			points[3]

		);

		if(this.vertices.length != 0)	
			this.vertices = this.vertices.concat(curve.getPoints(interm));
		else
			this.vertices = curve.getPoints(interm);
	}
	
	create(see)
	{

		var path = new THREE.CatmullRomCurve3(this.vertices);
		path.closed = this.closed;

		if(see != false)
		{
			this.material();
		}

		return path;
	}

	material()
	{
		var geometry = new THREE.Geometry();
		geometry.vertices = this.vertices;

		var material = new THREE.LineBasicMaterial( 
		{ 
			color: this.color 
		});

		var curve_bg = new THREE.Line(geometry, material);

		scene.add(curve_bg); 
	}
}