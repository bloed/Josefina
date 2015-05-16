/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var caca = "sin inicializar";
var TextManager = Class.extend({
    init: function(){
        this._Text = "No current text.";
        this._UnvalidSymbols = [".",",",";","-","?","¿","!","¡","\n"];
        this._NonSignificantWords = [" "];
    },
    getText: function(){
        return this._Text;
    },
    setText: function(pText){
        this._Text = pText;
    },
    test1: function(){
        this.test2();
    },
    test2: function(){
        alert("HELOOO");
    },
    getAllText: function(file){
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) { 
	    var contents = e.target.result;
            alert( "Got the file!");
            caca= contents.toString();
        };
    },
    getNWords: function(pArray,pIndexToStart, pNumberOfWords , pDirection){//pDirection must be an integer with the rate that the index will be moved
        var numberOfProcessedWords = 0;
        var currentIndex = pIndexToStart - 1;//so it doesnt take into account the first letter of the phrase
        var currentWord = "";
        var currentSymbol = "";
        while(numberOfProcessedWords < pNumberOfWords && currentIndex < this._Text.length && currentIndex >= 0){
            currentSymbol = this._Text.charAt(currentIndex);
            if (currentSymbol ==='\n'){//enter case
                currentWord="";
            }
            if (currentSymbol !== "." && currentSymbol !== "," && currentSymbol !== ":" && currentSymbol !=="-" && currentSymbol !=='\n'){
                if(currentSymbol === " "){
                    if (currentWord !==" " && currentWord.length!==0){
                        if (pDirection < 0){//we must reverse the word , because it was read backwards
                            currentWord = currentWord.split('').reverse().join('');
                        }
                        pArray.push(currentWord.toLowerCase());                        
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
    /*getPreviousWords: function(pIndexToStart, pNumberOfWords){
        var numberOfProcessedWords = 0;
        var currentIndex = pIndexToStart;
        var listOfWords = [];
        var currentWord = "";
        var currentSymbol = "";
        while(numberOfProcessedWords < pNumberOfWords && currentIndex >= 0){
            currentSymbol = this._Text.charAt(currentIndex);
            if (currentSymbol !== "." && currentSymbol !== "," && currentSymbol !== ":" && currentSymbol !=="-"){
                if(currentSymbol === " "){
                    if (currentWord !==" " && currentWord.length!==0){
                        listOfWords.push(currentWord.toLowerCase());                        
                        numberOfProcessedWords++;//puede ir abajo y tomara 200 exactas
                    }
                    currentWord = "";
                }
                else{
                    currentWord += currentSymbol;
                }
            }
            currentIndex--;
        }
        return listOfWords;
    },*/
    isValidSymbol : function(pSymbol){
        return(this._UnvalidSymbols.indexOf(pSymbol) > -1);
    },
    isValidWord : function (pWord){
        return(this._NonSignificantWords.indexOf(pWord) > -1);
    }
    /*deleteUnsignificantWords : function (pArrayOfWords){
        for(var indexOfArray = 0 ; indexOfArray<pArrayOfWords.length; indexOfArray++){
            if (pArrayOfWords[indexOfArray] === " "){
                pArrayOfWords.splice(indexOfArray, 1);
                alert("entro al if");
            }
            alert("hace el ciclo");
        }
        return pArrayOfWords;
    }*/
    
});

