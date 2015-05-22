var GeneticOperator = Class.extend({
    init: function(){
    },
    mutation: function(pIndividual, pAmountOfBits){
        //not of a bit
        var mutationNumber = Math.floor(Math.random()*100); //100 percent

        if(mutationNumber<MUTATION_PROBABILITY){   //it exists in th minority
            var mutationPoint=Math.floor(Math.random()*(pAmountOfBitsS-1));
            var bitMask= 1<<mutationPoint;
            pIndividual=pIndividual^bitMask; //exor of mask
        }
        return pIndividual;
    },
    cross:function (pFather, pMother, pAmountOfBits){
        //variable point
        var crossPoint=Math.floor((Math.random()*(pAmountOfBitsS-1))+1);

        pFather = pFather>>>(pAmountOfBitsS-crossPoint); //erease the less significant bits
        pFather = pFather<<(pAmountOfBitsS-crossPoint); //returns most significant bits to current position
        
        var motherMask=pMother>>>(pAmountOfBitsS-crossPoint); //creates mask of most significant bits of mother
        motherMask=motherMask<<(pAmountOfBitsS-crossPoint); //return mask to actual position
        pMother=pMother^motherMask; //exors the bits to get the less significant bits
        return this.mutation(pFather+pMother);
    },
    getBitsForAttributes: function(pAttribute1, pAttribute2){
        var bitsNumber1 = Math.floor(Math.log(pAttribute1)/Math.log(2));
        var bitsNumber2 = Math.floor(Math.log(pAttribute2)/Math.log(2));

        if(bitsNumber1 >= bitsNumber2)
            return bitsNumber1;
        else
            return bitsNumber2;
    }
});



