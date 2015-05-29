var GeneticManager= Class.extend({
    init: function(pTextManager){
        this._Population = []; 
        this._KeepReproducing = true;
        this._IndividualRepresentation = new IndividualRepresentation();
        this._GeneticOperator = new GeneticOperator();
        this._TextManager = pTextManager;
        this._MaxWeigth = 0;
        this._MaxDistance = 0;
        this._MaxTotalDistance = 0; //needed for methods to calculate values of words, it may go somehwere else though
    },
    createInitialPopulation: function(){
        this._Population =this._TextManager.mainCalculateIndividuals();

        this._IndividualRepresentation.calculateRepresentations(this._Population);

        this.setRepresentationForInitialPopulation();//creates chromosomes for the first population

    },
    replaceCurrentPopulation: function (pListOfIndividuals){

        this._Population = pListOfIndividuals;
    },
    stop : function(){

        this._KeepReproducing = false;
    },
    verifyStop : function(){

        //verifies if there are 10 different types of individuals and a given number of indivuals
        var listOfDifferentIndividuals = [];

        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            if (listOfDifferentIndividuals.indexOf(this._Population[indexOfArray].getWordString())===-1){//if the element had not been added
                listOfDifferentIndividuals.push(this._Population[indexOfArray].getWordString());
            }
        }
        
        if ((this._Population.length > MIN_AMOUNT_OF_INDIVIDUALS && listOfDifferentIndividuals.length > MIN_DIFFERENT_TYPE_OF_INDIVIDUALS)
        ||(this._Population.length > MAX_INDIVIDUALS)){
            return true;
        }
        else{
            return false;
        }
        
    },
    createNewGenerations: function(){
       
        var fitList = [];//list of individuals considered fit
        this.calculateMaxValues();
        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            if(this.isFit(this._Population[indexOfArray])){
                
                fitList.push(this._Population[indexOfArray]);
            }
        }

        var newIndividuals=[];
        for(var reproductedIndividuals = 0; reproductedIndividuals < INDIVIDUALS_PER_REPRODUCTION; reproductedIndividuals++){

            var father=fitList[Math.floor(Math.random()*(fitList.length-1))];
            var mother=fitList[Math.floor(Math.random()*(fitList.length-1))];

            var individualWordRepresentation = this._GeneticOperator.cross(father.getWordRepresentation(), mother.getWordRepresentation(), AMOUNT_OF_BITS);
            var individualWord = this._IndividualRepresentation.getAttribute(individualWordRepresentation, this._IndividualRepresentation.getWordChromosomes());
            
            var individualDistanceRepresentation = this._GeneticOperator.cross(father.getDistanceRepresentation(), mother.getDistanceRepresentation(), BITS_ATTRIBUTES);
            var individualDistance = this._IndividualRepresentation.getAttribute(individualDistanceRepresentation, this._IndividualRepresentation.getDistanceChromosomes());
           
            var individualWeigthRepresentation = this._GeneticOperator.cross(father.getWeigthRepresentation(), mother.getWeigthRepresentation(), BITS_ATTRIBUTES);
            var individualWeigth = this._IndividualRepresentation.getAttribute(individualWeigthRepresentation, this._IndividualRepresentation.getWeigthChromosomes());

            var newBorn = new Individual(individualWeigth, individualDistance, individualWord);
            newBorn.setRepresentations(individualWordRepresentation, individualDistanceRepresentation, individualWeigthRepresentation);
            
            newIndividuals.push(newBorn);
        }
        
        return fitList.concat(newIndividuals);


    },
    isFit : function(pIndividual){

        //true if its fit, false if it isn´t
        if(pIndividual){

            var percentage = (pIndividual.getWeigth()*WEIGTH_PERCENTAGE/this._MaxWeigth)+
            (pIndividual.getDistance()*DISTANCE_PERCENTAGE/this._MaxDistance);
            if(percentage >= FITNESS_PERCENTAGE)
                return true;
            else
                return false;
        }
        else
            return false;
    },
    mainReproduct : function(){

        this.createInitialPopulation();

        while(this._KeepReproducing){
            if(this.verifyStop()){
                this.stop();
            }
            else{
                //create new generation, replace, cross, etc.
                this.replaceCurrentPopulation(this.createNewGenerations());
            }
        }
        this.getFinalIndividuals();
    },
    getFinalIndividuals: function(){

        var listOfWords = [];
        var finalIndividuals = [];
        var processedWords = [];
        alert("finales");
        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            listOfWords.push(this._Population[indexOfArray].getWordString());
        }
        this._TextManager.setListOfWords(listOfWords);
        this._Population = this._TextManager.mainCalculateIndividuals();

        for(var indexOfArray = 0; indexOfArray < this._Population.length; indexOfArray++){
            var selection = this._Population[indexOfArray];
            if (processedWords.indexOf(selection.getWordString()) === -1){
                selection.setTotalDistance(this._TextManager.calculateTotalDistance(selection.getWordString()));
                finalIndividuals.push(selection); 
                processedWords.push(selection.getWordString());
            }
        }
        
        finalIndividuals.sort(function compare(indivudalA,individualB){
            if (indivudalA.getDistance() < individualB.getDistance())
                return 1;
            if (indivudalA.getDistance() > individualB.getDistance())
                return -1;
            return 0;
            }
        );
        this._Population = [];

        var result = "FINALES  ";
        for(var indexOfArray=0; indexOfArray<10; indexOfArray++){
            result +=finalIndividuals[indexOfArray].getWordString() + " peso = " + finalIndividuals[indexOfArray].getWeigth() + " distancia = "
            + finalIndividuals[indexOfArray].getDistance() + " distancia total = " + finalIndividuals[indexOfArray].getTotalDistance() + " \n ";
            this._Population.push(finalIndividuals[indexOfArray]);
        }
        alert(result);
    },
    calculateMaxValues: function(){

        this._MaxWeigth = 0;
        this._MaxDistance = 0;

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){ //values for fitness//este for me suena que es un metodo aparte, par aque se vea mas bonito jaja
            if(this._Population[indexOfArray].getWeigth()>this._MaxWeigth){

                this._MaxWeigth=this._Population[indexOfArray].getWeigth();
            }
            if(this._Population[indexOfArray].getDistance()>this._MaxDistance){

                this._MaxDistance=this._Population[indexOfArray].getDistance();
            }
        }
    },
    calculateMaxTotalDistance: function(){

        this._MaxTotalDistance=0;

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){ //values for fitness//este for me suena que es un metodo aparte, par aque se vea mas bonito jaja
            if(this._Population[indexOfArray].getTotalDistance()>this._MaxTotalDistance){

                this._MaxTotalDistance=this._Population[indexOfArray].getTotalDistance();
            }
        }
    },
    getMaxValues: function(){

        this.calculateMaxValues();
        this.calculateMaxTotalDistance();

        var arrayValues= [this._MaxWeigth, this._MaxDistance, this._MaxTotalDistance];

        return arrayValues;
    },
    getPopulation: function(){

        return this._Population;
    },
    setRepresentationForInitialPopulation : function(){

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            
            var individual = this._Population[indexOfArray];

            var word = this._IndividualRepresentation.getRepresentation(individual.getWordString(), this._IndividualRepresentation.getWordChromosomes());
            var distance = this._IndividualRepresentation.getRepresentation(individual.getDistance(), this._IndividualRepresentation.getDistanceChromosomes());
            var weigth = this._IndividualRepresentation.getRepresentation(individual.getWeigth(), this._IndividualRepresentation.getWeigthChromosomes());
            individual.setRepresentations(word, distance, weigth);
        }
    },
    getMinValues: function(){
        var minWeigth = this._Population[0].getWeigth();
        var minDistance = this._Population[0].getDistance();
        var minTotalDistance = this._Population[0].getTotalDistance();
        for(var index = 1; index < this._Population.length; index++){
            var selection = this._Population[index];
            if(selection.getDistance() < minDistance)
                minDistance = selection.getDistance();

            if(selection.getWeigth() < minWeigth)
                minWeigth = selection.getWeigth();

            if(selection.getTotalDistance() < minTotalDistance)
                minTotalDistance = selection.getTotalDistance();
        }
        return [minWeigth, minDistance, minTotalDistance];
    }
});





