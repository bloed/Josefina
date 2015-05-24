var TextManager = Class.extend({
    init: function(){
        this._Text = "No current text.";
        this._UnvalidSymbols = [".",",",";","-","?","¿","!","¡",'\n',":","_","(",")",'"',"'"];
        this._NonSignificantWords = [" ","el","la","se","a","o","no","ha","en","de","es","y","los","las", "que", "una","esto","esta","si"
        ,"pero","con","sin","lo","ni","le","al","nos","por","su","da","un","tan","del","desde","ante","para","mas","tal","esa"];
        this._ListOfWords = [];
        this._AverageOfDistance = 0;
        this._TotalDifferentDistance = 0;
        this._ListOfPercentagePerDistance = [];
    },
    getText: function(){

        return this._Text;
    },
    setText: function(pText){

        this._Text = pText;
    },
    getListOfWords: function(){

        return this._ListOfWords;
    },
    setListOfWords: function(pNewList){

        this._ListOfWords = pNewList;
    },
    getAllText: function(file){

        var reader = new FileReader();
        reader.readAsText(file);      
        reader.onload = function(e) {

            var contents = e.target.result;
            alert( "Got the file!");
            textManager.setText(contents.toString());

        };
    },
    getNWords: function(pIndexToStart, pNumberOfWords , pDirection){//pDirection must be an integer with the rate that the index will be moved
        
        var numberOfProcessedWords = 0;
        var currentIndex = pIndexToStart - 1;//so it doesnt take into account the first letter of the phrase
        var currentWord = "";
        var currentSymbol = "";

        while(numberOfProcessedWords < pNumberOfWords && currentIndex < this._Text.length && currentIndex >= 0){
            currentSymbol = this._Text.charAt(currentIndex);

            if (currentSymbol ==='\n'){//enter case
                currentWord="";
            }
            if (this.isValidSymbol(currentSymbol)){
                if(currentSymbol === " "){
                    currentWord = currentWord.toLowerCase();//only working with lowercased words
                    if (pDirection < 0){//we must reverse the word , because it was read backwards
                            currentWord = currentWord.split('').reverse().join('');
                        }
                    if (this.isValidWord(currentWord) && currentWord.length!==0){
                        this._ListOfWords.push(currentWord);                        
                        numberOfProcessedWords++;
                    }
                    currentWord = "";
                }
                else{
                    currentWord += currentSymbol;
                }
            }
            currentIndex+=pDirection;
        }
    },
    findIndexOfPhrase : function(pPhrase){

        return this._Text.indexOf(pPhrase);
    },
    isValidSymbol : function(pSymbol){

        return(this._UnvalidSymbols.indexOf(pSymbol) === -1);//if equals -1, then the symbol is not in the list then it is a valid symbol
    },
    isValidWord : function (pWord){

        return(this._NonSignificantWords.indexOf(pWord) === -1);//if equals -1, then the word is not in the list then it is a valid word
    },
    calculateTotalDistance: function (pWord){
        var totalOfAppearances = 0;
        var currentIndex = 0;//we will start at the very beginning
        var currentWord = "";
        var currentSymbol = "";
        while(currentIndex < this._Text.length){
            currentSymbol = this._Text.charAt(currentIndex);

            if (currentSymbol ==='\n'){//enter case
                currentWord="";
            }
            if (this.isValidSymbol(currentSymbol)){
                if(currentSymbol === " "){
                    currentWord = currentWord.toLowerCase();
                    if (pWord === currentWord){
                        totalOfAppearances++;
                    }
                    currentWord = "";
                }
                else{
                    currentWord += currentSymbol;
                }
            }
            currentIndex+=1;
        }
        return totalOfAppearances;
    },
    calculateAllWeight: function(pListOfWords,listPercentage){
        var weight = 0;
        var percentageOfDistance =0;
        var currentPercentage;
        var minRange;
        var maxRange;
        var listOfIndividuals = [];
        var individual;
        var controlOwnRelation = false;
        for(var indexArrayDistance = 0;  indexArrayDistance < pListOfWords.length ; indexArrayDistance++){
            percentageOfDistance = Math.round((pListOfWords[indexArrayDistance].distance/this._TotalDifferentDistance)*100);
            minRange = Math.floor(percentageOfDistance/10)*10;
            maxRange = minRange + 9;//we are grouping by centenas of percentage;
            controlOwnRelation = false;
            weight=0;
            for(var indexArrayPercentage = 0; indexArrayPercentage < listPercentage.length ; indexArrayPercentage++){
                currentPercentage = listPercentage[indexArrayPercentage];
                if(currentPercentage>= minRange &&currentPercentage<=maxRange){
                    if(percentageOfDistance === currentPercentage){//dangerous case
                        if(controlOwnRelation === true){
                            weight++;
                        }else{
                            controlOwnRelation = true;//the next time it will be related
                        }
                    }else{
                        weight++;
                    }
                }
            }
            var individual = new Individual(weight,pListOfWords[indexArrayDistance].distance,pListOfWords[indexArrayDistance].word);
            listOfIndividuals.push(individual);
        }
        return listOfIndividuals;
    },

    calculateAllDistances : function (){
        var listOfDistances = [];
        var wordFound;
        for(var indexOfArray = 0 ; indexOfArray < this._ListOfWords.length; indexOfArray++){
            wordFound = false;
            for(var indexOfDistance = 0 ;indexOfDistance < listOfDistances.length; indexOfDistance++){
                if (this._ListOfWords[indexOfArray] === listOfDistances[indexOfDistance].word){
                    listOfDistances[indexOfDistance].distance++;
                    wordFound=true;
                    break;
                }
            }
            if(wordFound === false){
               listOfDistances.push({word :this._ListOfWords[indexOfArray] ,  distance : 1}); 
            }
        }
        /*var result = "";
        for(var indexOfDistance = 0 ;indexOfDistance < listOfDistances.length; indexOfDistance++){
                result+= listOfDistances[indexOfDistance].word + " distancia : " + listOfDistances[indexOfDistance].distance  + " ";
            }
        alert(result);*/
        return listOfDistances;
    },
    /*calculateAverageOfDistances : function(){

        var totalDistance = 0;
        var processedWords = [];
        for(var indexOfArray = 0 ; indexOfArray < this._ListOfWords.length; indexOfArray++){
             if (processedWords.indexOf(this._ListOfWords[indexOfArray]) === -1){
                 totalDistance += this.calculateDistance(this._ListOfWords[indexOfArray]);//the word was not procesed yet
                 processedWords.push(this._ListOfWords[indexOfArray]);
             }
        }
        var numberOfWords = processedWords.length;
        //this._AverageOfDistance = Math.floor(totalDistance/numberOfWords);
        return Math.floor(totalDistance/numberOfWords);
    }//Nuevas funciones
    ,*/
    calculateMaxDistances : function(pListOfDistances){
        var processedDistances = [];
        var totalDistance = 0;
        for(var indexArray = 0; indexArray < pListOfDistances.length ; indexArray++){
            if(processedDistances.indexOf(pListOfDistances[indexArray].distance)===-1){
                totalDistance += pListOfDistances[indexArray].distance;
                processedDistances.push(pListOfDistances[indexArray].distance);
            }
        }
        this._TotalDifferentDistance = totalDistance;
        //alert("distancia diferente total : " + this._TotalDifferentDistance);
        //return totalDistance;
    },
    calculatePercentagePerDistance : function(pListOfDistances){
        //sets a new array of the form [distance : , percentage : ], sorted by percentage
        var listPercentagePerDistance = [];
        var percentageOfDistance = 0;
        for(var indexArray = 0; indexArray < pListOfDistances.length ; indexArray++){
            percentageOfDistance = Math.round((pListOfDistances[indexArray].distance/this._TotalDifferentDistance)*100);
            listPercentagePerDistance.push(percentageOfDistance);
        } 
        listPercentagePerDistance.sort();
        /*var result = "";
        for(var caca = 0 ;  caca<listPercentagePerDistance.length ; caca++){
            result+= "-" + listPercentagePerDistance[caca] + " - ";
        }
        alert(result);*/
        //this._ListOfPercentagePerDistance = listPercentagePerDistance;
        return listPercentagePerDistance;
    },
    mainCalculateIndividuals : function(){
        var listOfWords = this.calculateAllDistances();
        this.calculateMaxDistances(listOfWords);
        var listPercentagePerDistance = this.calculatePercentagePerDistance(listOfWords);
        var listOfIndividuals = this.calculateAllWeight(listOfWords,listPercentagePerDistance);
        var result= "";
        listOfIndividuals.sort(function compare(indivudalA,individualB){
            if (indivudalA.getDistance() < individualB.getDistance())
                return 1;
            if (indivudalA.getDistance() > individualB.getDistance())
                return -1;
            return 0;
            }
        );

        /*for(var index = 0 ; index<listOfIndividuals.length ; index++){
            result+=listOfIndividuals[index].getWordString() + " distancia : " + 
                    listOfIndividuals[index].getDistance() + " peso: " + 
                    listOfIndividuals[index].getWeigth() + " //// ";
        }
        alert(result);*/
        return listOfIndividuals;
    }

});

