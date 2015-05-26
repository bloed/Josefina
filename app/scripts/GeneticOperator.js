var GeneticOperator = Class.extend({
    init: function(){
    },
    mutation: function(pIndividual, pAmountOfBits){
        //not of a bit
        var mutationNumber = Math.floor(Math.random()*100); //100 percent

        if(mutationNumber<MUTATION_PROBABILITY){   //it exists in th minority
            var mutationPoint=Math.floor(Math.random()*(pAmountOfBits-1));
            var bitMask= 1<<mutationPoint;
            pIndividual=pIndividual^bitMask; //exor of mask
        }
        return pIndividual;
    },
    cross:function (pFather, pMother, pAmountOfBits){
        //variable point
        
        var crossPoint=Math.floor((Math.random()*(pAmountOfBits-1))+1);
       
        pFather = pFather>>>(pAmountOfBits-crossPoint); //erease the less significant bits
        pFather = pFather<<(pAmountOfBits-crossPoint); //returns most significant bits to current position
        
        var motherMask=pMother>>>(pAmountOfBits-crossPoint); //creates mask of most significant bits of mother
        motherMask=motherMask<<(pAmountOfBits-crossPoint); //return mask to actual position
        pMother=pMother^motherMask; //exors the bits to get the less significant bits
        return this.mutation(pFather+pMother);
    }
});



