var caca = "sin inicializar";
var ThreeDManagement=Class.extend({
    init: function(){
        this.scene = new THREE.Scene();
        this.camera= new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500)
        this.renderer= new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xdddddd);
        this.renderer. setSize(window.innerWidth, window.innerHeight);
        this.controls = new THREE.TrackballControls(this.camera); //movemtn through mouse actions

        this.animation= function(){
            requestAnimationFrame(this.animation.bind(this));
            this.render();
        };
        
        //renderer.shadowMapEnabled =true; //enable shadows
        //renderer.shadowMapSoft= true;
        this.axis= new THREE.AxisHelper(10); //visualize axis, only for developer purposes
        this.scene.add(this.axis);

        var light = new THREE.AmbientLight( 0xffffff ); // soft white light
        this.scene.add( light );

        this.addFloor();

        this.camera.position.x= 0;
        this.camera.position.y=5;
        this.camera.position.z=200;
        this.camera.lookAt(this.scene.position);
        
        $("#webGL-container").append(this.renderer.domElement);
        this.renderer.render(this.scene, this.camera); //refreshes the view

        this.animation(); 
    },
    movementControl: function(){ //movement through keyboard
        document.onkeydown = function(e) {
            switch (e.keyCode) {
            case 37: //left key
                this.camera.position.x-=1; 
                break;
            case 38: //up key
                this.camera.position.z-=1;
                break;
            case 39: //right key
                this.camera.position.x+=1;
                break;
            case 40: //down key
                this.camera.position.z+=1;
                break;
            case 90: //"z" key
                this.camera.position.y+=1;
                break;
            case 88: //"x" key
                this.camera.position.y-=1;
                break;
            }
        }    
        this.renderer.render(this.scene, this.camera);
    },
    animate: function (){
            function r (){
                requestAnimationFrame(r);
            render();
            }
            function render(){
                this.controls.update();
                this.renderer.render(this.scene, this.camera);
            }
        
    },
    render: function(){
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
    },
    addWord: function(pWord, pPositionX, pPositionY, pPositionZ, pSize, pColor){
    var textGeometry= new THREE.TextGeometry( pWord, {

                    size: pSize,
                    height: 1,
                    curveSegments: 2,
                    font: "helvetiker"

                });

    var textMaterial = new THREE.MeshLambertMaterial({color: pColor})  //0xff3300
    var text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.x=pPositionX;
    text.position.y=5+pPositionY; //for it to stick out of the plane as a floor
    text.position.z=pPositionZ;

    this.scene.add(text);
    },
    addFloor: function(){
        var planeGeometry= new THREE.PlaneGeometry(400,400,400);
        var planeMaterial= new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('floor.jpg') } );
        var plane= new THREE.Mesh(planeGeometry, planeMaterial); //plane starts like a wall we want it as a floor so we rotate it
        plane.rotation.x= -0.5*Math.PI; //math of 180°
        //plane.receiveShadow=true;
        this.scene.add(plane);
    }

});