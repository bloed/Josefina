var TextManager = Class.extend({
    init: function(){
        this._Text = "No current text.";
        this._UnvalidSymbols = [".",",",";","-","?","¿","!","¡",'\n',":","_","(",")",'"',"'","n\\"];//symbols to be ignored
        this._NonSignificantWords = [" ","el","la","se","a","o","no","ha","en","de","es","y","los","las", "que", "una","esto","esta","si"
        ,"pero","con","sin","lo","ni","le","al","nos","por","su","da","un","tan","del","desde","ante","para","mas","tal","esa", "como"];//words to be ignored
        this._ListOfWords = [];
        this._TotalDifferentDistance = 0;//used for weight
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
    getNWords: function(pIndexToStart, pNumberOfWords , pDirection){//pDirection must be an integer with the rate that the index will be moved. if negative it goes backwards.        
        var numberOfProcessedWords = 0;
        var currentIndex = pIndexToStart - 1;//so it doesnt take into account the first letter of the phrase
        var currentWord = "";
        var currentSymbol = "";
        while(numberOfProcessedWords < pNumberOfWords && currentIndex < this._Text.length && currentIndex >= 0){
            currentSymbol = this._Text.charAt(currentIndex);
            if (currentSymbol ==='\n'|| currentSymbol === 'n\\'){//enter case
                currentWord="";
            }
            currentSymbol = currentSymbol.toLowerCase().removeAccents();


            if (this.isValidSymbol(currentSymbol)){
                if(currentSymbol === " "){//we have a space, a new word definitely was formed
                    currentWord = currentWord.toLowerCase();//only working with lowercased words
                    if (pDirection < 0){//we must reverse the word , because it was read backwards
                            currentWord = currentWord.split('').reverse().join('');
                        }
                    if (this.isValidWord(currentWord) && currentWord.length!==0){
                        currentWord = currentWord.replace(/(\r\n|\n|\r)/gm,"");
                        this._ListOfWords.push(currentWord);                        
                        numberOfProcessedWords++;
                    }
                    currentWord = "";//word is rested and we are ready to read the next word
                }
                else{
                    currentWord += currentSymbol;
                }
            }
            currentIndex+=pDirection;
        }
    },
    findIndexOfPhrase : function(pPhrase){//finds a phrase in all the text
        return this._Text.indexOf(pPhrase);
    },
    isValidSymbol : function(pSymbol){
        return(this._UnvalidSymbols.indexOf(pSymbol) === -1);//if equals -1, then the symbol is not in the list then it is a valid symbol
    },
    isValidWord : function (pWord){
        return(this._NonSignificantWords.indexOf(pWord) === -1);//if equals -1, then the word is not in the list then it is a valid word
    },
    calculateTotalDistance: function (pWord){//check for appearances for a word in all the text
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
            currentIndex+=1;//only moving forward
        }
        return totalOfAppearances;
    },
    calculateAllDistances : function (){//calcualte the ditance for every word
        var listOfDistances = [];//list were words are saved, is of the type {word,distance}
        var wordFound;
        for(var indexOfArray = 0 ; indexOfArray < this._ListOfWords.length; indexOfArray++){
            wordFound = false;
            for(var indexOfDistance = 0 ;indexOfDistance < listOfDistances.length; indexOfDistance++){
                if (this._ListOfWords[indexOfArray] === listOfDistances[indexOfDistance].word){//check if its already being processed
                    listOfDistances[indexOfDistance].distance++;
                    wordFound=true;
                    break;
                }
            }
            if(wordFound === false){
               listOfDistances.push({word :this._ListOfWords[indexOfArray] ,  distance : 1}); 
            }
        }
        return listOfDistances;
    },
    calculateMaxDistances : function(pListOfDistances){//sums all different distances of the word
        var processedDistances = [];
        var totalDistance = 0;
        for(var indexArray = 0; indexArray < pListOfDistances.length ; indexArray++){
            if(processedDistances.indexOf(pListOfDistances[indexArray].distance)===-1){//checks if its processed
                totalDistance += pListOfDistances[indexArray].distance;
                processedDistances.push(pListOfDistances[indexArray].distance);
            }
        }
        this._TotalDifferentDistance = totalDistance;
    },
    calculatePercentagePerDistance : function(pListOfDistances){
        //sets a new array of the form [distance : , percentage : ], sorted by percentage
        //Percentage : value of a word of its distance compared with TotalDifferentDistance
        var listPercentagePerDistance = [];
        var percentageOfDistance = 0;
        for(var indexArray = 0; indexArray < pListOfDistances.length ; indexArray++){
            percentageOfDistance = Math.round((pListOfDistances[indexArray].distance/this._TotalDifferentDistance)*100);
            listPercentagePerDistance.push(percentageOfDistance);//notice that percentage with the same value are all added
        } 
        listPercentagePerDistance.sort();//hay que ordenarlo al revez
        return listPercentagePerDistance;
    },
    calculateAllWeight: function(pListOfWords,listPercentage){
        var weight = 0;
        var percentageOfDistance =0;//percentage of the current word, defines min and max range
        var currentPercentage;//percentage to see if it is within the min and max range
        var minRange;//set the min range of percentage to relationate
        var maxRange;//set the max range of percentage to relationate
        var listOfIndividuals = [];//where all individuals are stored
        var individual;
        var controlOwnRelation = false;//used to control that a word doesn´t relate with itself
        for(var indexArrayDistance = 0;  indexArrayDistance < pListOfWords.length ; indexArrayDistance++){
            percentageOfDistance = Math.round((pListOfWords[indexArrayDistance].distance/this._TotalDifferentDistance)*100);
            minRange = Math.floor(percentageOfDistance/10)*10;
            maxRange = minRange + GROUP_BY_TENS;//we are grouping by tens of percentage;
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
            listOfIndividuals.push(individual);//new individual is created
        }
        return listOfIndividuals;
    },
    mainCalculateIndividuals : function(){
        //returns a list of Individuals based on the current listOfWords
        var listOfWords = this.calculateAllDistances();
        this.calculateMaxDistances(listOfWords);
        var listPercentagePerDistance = this.calculatePercentagePerDistance(listOfWords);
        var listOfIndividuals = this.calculateAllWeight(listOfWords,listPercentagePerDistance);

        sortingFunction = function compare(AttributeA,AttributeB){
            if (AttributeA.getDistance() < AttributeB.getDistance())
                return 1;
            if (AttributeA.getDistance() > AttributeB.getDistance())
                return -1;
            return 0;
            }

        listOfIndividuals.sort(sortingFunction);

        var result = "";
        for(var counter = 0; counter < listOfIndividuals.length; counter++){
            result += listOfIndividuals[counter].getWordString() + " Distance = " + listOfIndividuals[counter].getDistance() +
            " Weigth = " + listOfIndividuals[counter].getWeigth() + "\n";
        }
        alert(result);
        return listOfIndividuals;
    }

});

