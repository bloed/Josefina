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
    getAllText: function(file){
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function(e) { 
	    var contents = e.target.result;
            alert( "Got the file!");
            caca= contents.toString();
        };
    },
    getNextWords: function(pIndexToStart){
        var numberOfProcessedWords = 0;
        var currentIndex = pIndexToStart;
        var listOfWords = [];
        var currentWord = "";
        var currentSymbol = "";
        while(numberOfProcessedWords < AMOUNT_OF_WORDS && currentIndex < this._Text.length){
            currentSymbol = this._Text.charAt(currentIndex);
            if (currentSymbol !== "." && currentSymbol !== "," && currentSymbol !== ":" && currentSymbol !=="-"){
                if(currentSymbol === " "){
                    if (currentWord !==" " && currentWord !== "\n" && currentWord.length!==0){
                        currentWord.replace(/^\s+|\s+$/g, '');
                        currentWord.trim();
                        currentWord.replace(/(\r\n|\n|\r)/gm,"");
                        currentWord.replace(/[\n]/g, "");
                        listOfWords.push(currentWord.toLowerCase());
                        
                        numberOfProcessedWords++;//puede ir abajo y tomara 200 exactas
                    }
                    currentWord = "";
                }
                else{
                    currentWord += currentSymbol;
                }
            }
            currentIndex++;
        }
        return listOfWords;
    },
    getPreviousWords: function(){
        
    },
    isValidSymbol : function(pSymbol){
        return(this._UnvalidSymbols.indexOf(pSymbol) > -1);
    },
    isValidWord : function (pWord){
        return(this._NonSignificantWords.indexOf(pWord) > -1);
    },
    deleteUnsignificantWords : function (pArrayOfWords){
        for(var indexOfArray = 0 ; indexOfArray<pArrayOfWords.length; indexOfArray++){
            if (pArrayOfWords[indexOfArray] === " "){
                pArrayOfWords.splice(indexOfArray, 1);
                alert("entro al if");
            }
            alert("hace el ciclo");
        }
        return pArrayOfWords;
    }
    
});

