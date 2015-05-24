var ThreeDManagement=Class.extend({
    init: function(){
        this.colors = [0xFF000, 0xFF7F00, 0xFFFF00, 0x7FFF00, 0x00FF00, 0x00FF7F, 0x00FFFF, 0x007FFF, 0x0000FF];
        this._scene = new THREE.Scene();
        this._camera= new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, .1, 500)
        this._renderer= new THREE.WebGLRenderer();
        this._renderer.setClearColor(0xCC00CC); //greyish
        this._renderer. setSize(window.innerWidth, window.innerHeight);
        this._controls = new THREE.OrbitControls( this._camera );
        this._controls.damping = 0.2;
        this._controls.maxDistance = PLANE_SIZE/2+ PLANE_SIZE/4;

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
        this._camera.position.z = PLANE_SIZE/2;
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
        text.position.x = this.calculateCoordenate(pIndividual.getDistance(), pListValues[1])-(PLANE_SIZE/2)-20;
        text.position.y = 5 + this.calculateCoordenateY(pIndividual.getWeigth(), pListValues[0]); //for it to stick out of the plane as a floor
        text.position.z = this.calculateCoordenate(pIndividual.getTotalDistance(), pListValues[2])-(PLANE_SIZE/2)-20;

        alert(text.position.x+ " "+ text.position.y + " "+ text.position.z);

        this._scene.add(text);
    },
    addFloor: function(){
        //var planeGeometry= new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, PLANE_SIZE);
        var planeMaterial= new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('floor.jpg'), side: THREE.DoubleSide } );
        //var plane= new THREE.Mesh(planeGeometry, planeMaterial); //plane starts like a wall we want it as a floor so we rotate it
        //plane.rotation.x= -0.5*Math.PI; //math of 180°*/
        var cube= new THREE.BoxGeometry( PLANE_SIZE+100, PLANE_SIZE+100, PLANE_SIZE+100);
        var cube2= new THREE.Mesh(cube, planeMaterial);
        this._scene.add(cube2);
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
    insertWordsPlane: function(pListOfIndividuals, pValues, pMinValues){
        for(var count=0; count <3; count++)
            pValues[count] = pValues[count]-pMinValues[count];

        for(var index = 0; index < pListOfIndividuals.length; index++){
            this.addWord(pListOfIndividuals[index], this.colors[index], pValues);
            
        }
    }
});