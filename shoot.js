AFRAME.registerComponent("bullets", {
  init: function () {
    this.shootBullet();
  },
  shootBullet: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var ball = document.createElement("a-entity"); 
        ball.setAttribute("gltf-model", "./models/shooter/scene.gltf"); 
        ball.setAttribute("scale", { x: 3, y: 3, z: 3});
        ball.setAttribute("geometry", {
          primitive: "sphere",
          radius: 0.1,
        });

      

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

      

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        ball.setAttribute("dynamic-body",{
          shape:"sphere",
          mass:0,

        })
        
        ball.addEventListener("collide",this.removeBullet)

        scene.appendChild(ball);


      }
    });
  },

  removeBullet: function (e) {
    //Original entity (bullet) 
    console.log(e.detail.target.el);

    //Other entity, which bullet touched.
    console.log(e.detail.body.el);

    var element=e.detail.target.el
    var element_hit=e.detail.body.el

    
    //bullet element


    //element which is hit
 

    if (element_hit.id.includes("box")) 
      {
        //set material attribute
       element_hit.setAttribute("material",{
        opacity:1,
        transparent:true
       })

       
        //impulse and point vector
        var impulse=new CANNON.Vec3(-2,2,1);
        var worldpoint=new CANNON.Vec3().copy(element_hit.getAttribute("position"))
        element_hit.body.applyImpulse(impulse,worldpoint)

        

        //remove event listener
        
        
        //remove the bullets from the scene
      
    }
  },
});


