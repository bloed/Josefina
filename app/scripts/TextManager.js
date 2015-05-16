var caca = "";
var TextManager = Class.extend({
    init: function(){
        this._Text = "No current text.";
        this._UnvalidSymbols = [".",",",";","-","?","¿","!","¡",'\n',":","_"];
        this._NonSignificantWords = [" ","el","la","se","a","o","no","ha","en","de","es","y","los","las"];
        this._ListOfWords = [];
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
            caca= contents.toString();
            //this.setText(contents.toString());//no existe tendro de esta funcion
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
    calculateWeight: function(pWord){
         var weight = 0;
         var distanceOfWordToRelate = 0;
         var currentWordDistance = this.calculateDistance(pWord);
         var averageDistance = this.calculateAverageOfDistances();
         var minValue = currentWordDistance - averageDistance;
         if (minValue < 0){//for those words with really low distance
             minValue = 0;
         }
         var maxValue = currentWordDistance + averageDistance;
         for(var indexOfArray = 0 ; indexOfArray < this._ListOfWords.length; indexOfArray++){
            if (this._ListOfWords[indexOfArray] !== pWord){//so a word does not relates to itself
                distanceOfWordToRelate = this.calculateDistance(this._ListOfWords[indexOfArray]);
                if(distanceOfWordToRelate >= minValue && distanceOfWordToRelate<=maxValue){
                    weight++;
                }
            } 
         }
         return weight;
    },
    calculateDistance : function (pWord){
        var totalOfAppeareances = 0;
         for(var indexOfArray = 0 ; indexOfArray < this._ListOfWords.length; indexOfArray++){
             if (this._ListOfWords[indexOfArray] === pWord){
                 totalOfAppeareances++;
             }
         }
         return totalOfAppeareances;
    },
    calculateAverageOfDistances : function(){
        var numberOfWords = this._ListOfWords.length;
        var totalDistance = 0;
        for(var indexOfArray = 0 ; indexOfArray < this._ListOfWords.length; indexOfArray++){
             totalDistance += this.calculateDistance(this._ListOfWords[indexOfArray]);
        }
        return Math.floor(totalDistance/numberOfWords);//integer division
        //return totalDistance/numberOfWords;
    }
});

