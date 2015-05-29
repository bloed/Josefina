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
        this._DistanceDifference = 0;
        this._DistanceMinimum = 0;
        this._WeigthDifference = 0;
        this._WeigthMinimum = 0;
        this._TotalDistanceDifference = 0;
        this._TotalDistanceMinimum = 0;


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
        this._camera.position.y = 100;
        this._camera.position.z = PLANE_SIZE/2;
        this._camera.lookAt(this._scene.position);
        
        $("#webGL-container").append(this._renderer.domElement);
        this._renderer.render(this._scene, this._camera); //refreshes the view

        this._animation(); 
    },
    render: function(){
            
            this._renderer.render(this._scene, this._camera);
    },
    addWord: function(pIndividual, pColor){ 
        var textGeometry= new THREE.TextGeometry( pIndividual.getWordString(), {
                        
                        size: this.calculateFont(pIndividual.getWeigth() - this._WeigthMinimum, this._WeigthDifference),
                        height: 1,
                        curveSegments: 2,
                        font: "helvetiker"

                    });

        var textMaterial = new THREE.MeshLambertMaterial({color: pColor})  //0xff3300
        var text = new THREE.Mesh(textGeometry, textMaterial);
        text.position.x = this.calculateCoordenate(pIndividual.getDistance()-this._DistanceMinimum, this._DistanceDifference)-(PLANE_SIZE/2);
        text.position.y = this.calculateCoordenateY(pIndividual.getWeigth()-this._WeigthMinimum, this._WeigthDifference)-(PLANE_SIZE/2); //for it to stick out of the plane as a floor
        text.position.z = this.calculateCoordenate(pIndividual.getTotalDistance()-this._TotalDistanceMinimum, this._TotalDistanceDifference)-(PLANE_SIZE/2);

        this._scene.add(text);
    },
    addFloor: function(){
        
        var planeMaterial= new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('floor.jpg'), side: THREE.DoubleSide } );
        
        var cube= new THREE.BoxGeometry( PLANE_SIZE+110, PLANE_SIZE+110, PLANE_SIZE+110);
        var cube2= new THREE.Mesh(cube, planeMaterial);
        this._scene.add(cube2);
    },
    calculateFont: function(pFontSize, pMaxSize){
        //TRY CATCH
        if(pMaxSize!=0 || pFontSize){
            return (pFontSize*FONT_MAXIMUM/pMaxSize)+FONT_MINIMUM;
        }else{
            return FONT_MINIMUM;
        }
    },
    calculateCoordenate: function(pValue, pMaxValue){
        if(pMaxValue!=0){
            return (pValue*(PLANE_SIZE)/pMaxValue);
        }else{
            return 1;
        }
    },
    calculateCoordenateY: function(pValue, pMaxValue){
        if(pMaxValue!=0){
            return (pValue*(PLANE_SIZE)/pMaxValue);
        }else{
            return 1;
        }
    },
    insertWordsPlane: function(pListOfIndividuals, pMaxValues, pMinValues){ //[0] = Weigth, [1] = distance, [2] = totaldistance
        this._WeigthMinimum = pMinValues[0];
        this._DistanceMinimum = pMinValues[1];
        this._TotalDistanceMinimum = pMinValues[2];
        this._WeigthDifference = pMaxValues[0] - pMinValues[0];
        this._DistanceDifference = pMaxValues[1] - pMinValues[1];
        this._TotalDistanceDifference = pMaxValues[2] - pMinValues[2];

        for(var index = 0; index < pListOfIndividuals.length; index++){
            this.addWord(pListOfIndividuals[index], this.colors[index]);
            
        }
    }
});