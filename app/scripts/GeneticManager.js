var GeneticManager= Class.extend({
    init: function(pTextManager){
        this._Population = []; 
        this._KeepReproducing = true;
        this._IndividualRepresentation = new IndividualRepresentation();
        this._GeneticOperator = new GeneticOperator();
        this._TextManager = pTextManager; //needed for methods to calculate values of words, it may go somehwere else though
    },
    createInitialPopulation: function(pListOfWords){
        for(var indexOfArray=0; indexOfArray<pListOfWords.length; indexOfArray++){
            var individual= new Individual(this._TextManager.calculateWeight(pListOfWords[indexOfArray]),
                this._TextManager.calculateDistance(pListOfWords[indexOfArray]),
                this._TextManager.calculateTotalDistance(pListOfWords[indexOfArray]), pListOfWords[indexOfArray]);
            this._Population.push(individual);
            
        }
        this._IndividualRepresentation.calculateChromosomaticRepresentation(this._Population);
        var result="";
        for(var indexOfArray = 0 ; indexOfArray<this._Population.length; indexOfArray++){
            result += this._Population[indexOfArray].getWordString()+ "  " + this._Population[indexOfArray].getWeigth()+ " "+this._Population[indexOfArray].getDistance();
            result+=" - ";
        }
        alert(result);
        //this.mainReproduct();//main de la vara
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
        //alert("poblacion total : " + this._Population.length);
        if ((this._Population.length > MIN_AMOUNT_OF_INDIVIDUALS && listOfDifferentIndividuals.length > MIN_DIFFERENT_TYPE_OF_INDIVIDUALS)
        ||(this._Population.length>2000)){
            return true;
        }
        else{
            return false;
        }
        
    },
    createNewGenerations: function(){
        //calls isFit, cross and mutation, and replace the current generation
        var maxWeigth=0;
        var maxDistance=0;
        var fitList = [];//list of individuals considered fit

        for(var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){ //values for fitness//este for me suena que es un metodo aparte, par aque se vea mas bonito jaja
            if(this._Population[indexOfArray].getWeigth()>maxWeigth){
                maxWeigth=this._Population[indexOfArray].getWeigth();
            }
            if(this._Population[indexOfArray].getDistance()>maxDistance){
                maxDistance=this._Population[indexOfArray].getDistance();
            }
        }
        //alert( "max weight " + maxWeigth + " maxDistance " + maxDistance);
        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            if(this.isFit(this._Population[indexOfArray], maxWeigth, maxDistance)){
                
                fitList.push(this._Population[indexOfArray]);
            }
        }
        //alert("tenemos un total fits de : " + fitList.length + "  que vienen de una poblacion de : " + this._Population.length);
        var newIndividuals=[];
        
        for(var reproductedIndividuals = 0; reproductedIndividuals < INDIVIDUALS_PER_REPRODUCTION; reproductedIndividuals++){
            var father=fitList[Math.floor(Math.random()*(fitList.length-1))].getWordString();
            var fatherNumber = this._IndividualRepresentation.getRepresentation(father);
            var mother=fitList[Math.floor(Math.random()*(fitList.length-1))].getWordString();
            var motherNumber = this._IndividualRepresentation.getRepresentation(mother);
            var newBorn= this._IndividualRepresentation.getIndividual(this._GeneticOperator.cross(fatherNumber,motherNumber));
            //alert(newBorn.getWordString());
            newIndividuals.push(newBorn);
        }
        //alert("tenemos un total nuevos individuos de :" + newIndividuals.length);
        return fitList.concat(newIndividuals);


    },
    isFit : function(pIndividual, pMaxWeigth, pMaxDistance){
        //true if its fit, false if it isn´t
        if(pIndividual && pMaxWeigth && pMaxDistance){
            if (pMaxWeigth ===0){
                pMaxWeigth=1;
            }
            if (pMaxDistance ===0){
                pMaxDistance=1;
            }
            var percentage=(pIndividual.getWeigth()*WEIGTH_PERCENTAGE/pMaxWeigth)+
            (pIndividual.getDistance()*DISTANCE_PERCENTAGE/pMaxDistance);
            if(percentage >= FITNESS_PERCENTAGE)
                return true;
            else
                return false;
        }
        else
            return false;
    },
    mainReproduct : function(){
        this.createInitialPopulation(this._TextManager.getListOfWords());
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
        alert("total de mutuaciones " + totalMutuacion);
        var result="";
        for(var indexOfArray = 0 ; indexOfArray<this._Population.length; indexOfArray++){
            result += this._Population[indexOfArray].getWordString();
            result+=" - ";
        }
        alert(result);
        var listOfIndividuals = [];
        var individualFound= false;
        for (var indexOfArray=0; indexOfArray<this._Population.length; indexOfArray++){
            for(var indexSecondArray = 0; indexSecondArray< listOfIndividuals.length; indexSecondArray++){
                if(this._Population[indexOfArray].getWordString()===listOfIndividuals[indexSecondArray].individual.getWordString()){
                    listOfIndividuals[indexSecondArray].amount++;
                    
                    individualFound=true;
                    break;
                }
            }
            if(individualFound){
                individualFound=false;
            }else{//only happens for the first appearance
                listOfIndividuals.push({individual: this._Population[indexOfArray], amount: 1});
            }
            /*var index = listOfIndividuals.indexOf(this._Population[indexOfArray]);
            if (index !=-1)
                amountOfIndividuals[index]++;
            else{
                listOfIndividuals.push(this._Population[indexOfArray]);
                amountOfIndividuals.push(1);
            }*/
        }
        result=" ";
        
    
    /*     for(var i=0; i<listOfIndividuals.length; i++){
            alert(listOfIndividuals[i].individual.getWordString() + " "+ listOfIndividuals[i].amount);
        }*/
        listOfIndividuals.sort(function compare(indivudalA,individualB) {
            if (indivudalA.amount < individualB.amount)
                return 1;
            if (indivudalA.amount > individualB.amount)
                return -1;
            return 0;
            }
        );
       for(var indexOfArray = 0 ; indexOfArray<listOfIndividuals.length; indexOfArray++){
            result += listOfIndividuals[indexOfArray].individual.getWordString()+ "  " + listOfIndividuals[indexOfArray].amount;
            result+=" - ";
        }
        alert(result);

    },
    print: function(){
        for(var i=0; i<0; i++){
            alert(this._Population);
        }
    }
});





