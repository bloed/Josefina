var ThreeDManagement=Class.extend({
    init: function(){
        this._scene = new THREE.Scene();
        this._camera= new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500)
        this._renderer= new THREE.WebGLRenderer();
        this._renderer.setClearColor(0xdddddd); //greyish
        this._renderer. setSize(window.innerWidth, window.innerHeight);
        this._controls = new THREE.OrbitControls( this._camera );
        this._controls.damping = 0.2;

        this._animation= function(){
            requestAnimationFrame(this._animation.bind(this));
            this.render();
        };
        
        var axis= new THREE.AxisHelper(10); //visualize axis, only for developer purposes
        this._scene.add(axis);

        var light = new THREE.AmbientLight( 0xffffff ); // soft white light
        this._scene.add( light );

        this.addFloor();

        this._camera.position.x = 0;
        this._camera.position.y = 5;
        this._camera.position.z = 200;
        this._camera.lookAt(this._scene.position);
        
        $("#webGL-container").append(this._renderer.domElement);
        this._renderer.render(this._scene, this._camera); //refreshes the view

        this._animation(); 
    },
    render: function(){
            
            this._renderer.render(this._scene, this._camera);
    },
    addWord: function(pIndividual, pColor, pListValues){ //plistValues[0]=weight, [1]=distance [2]= totaldistance
        var textGeometry= new THREE.TextGeometry( pIndividual.getWordString(), {
                        
                        size: this.calculateFont(pIndividual.getWeigth(), pListValues[0]),
                        height: 1,
                        curveSegments: 2,
                        font: "helvetiker"

                    });

        var textMaterial = new THREE.MeshLambertMaterial({color: pColor})  //0xff3300
        var text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.x = this.calculateCoordenate(pIndividual.getDistance(), pListValues[1])-200;
        text.position.y = 5 + this.calculateCoordenateY(pIndividual.getWeigth(), pListValues[0]); //for it to stick out of the plane as a floor
        text.position.z = this.calculateCoordenate(pIndividual.getTotalDistance(), pListValues[2])-200;

        this._scene.add(text);
    },
    addFloor: function(){
        var planeGeometry= new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, PLANE_SIZE);
        var planeMaterial= new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('floor.jpg') } );
        var plane= new THREE.Mesh(planeGeometry, planeMaterial); //plane starts like a wall we want it as a floor so we rotate it
        plane.rotation.x= -0.5*Math.PI; //math of 180°
        this._scene.add(plane);
    },
    calculateFont: function(pFontSize, pMaxSize){
        //TRY CATCH
        if(pMaxSize!=0){
            return (pFontSize*FONT_MAXIMUM/pMaxSize)+FONT_MINIMUM;
        }else{
            return 1;
        }
    },
    calculateCoordenate: function(pValue, pMaxValue){
        if(pMaxValue!=0){
            return (pValue*(PLANE_SIZE-10)/pMaxValue);
        }else{
            return 1;
        }
    },
    calculateCoordenateY: function(pValue, pMaxValue){
        if(pMaxValue!=0){
            return (pValue*50/pMaxValue);
        }else{
            return 1;
        }
    },
    insertWordsPlane: function(pListOfIndividuals, pValues){
        for(var index = 0; index < pListOfIndividuals.length; index++){
            this.addWord(pListOfIndividuals[index], 0xff3300, pValues);
            
        }
    }
});