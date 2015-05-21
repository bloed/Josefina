var GeneticOperator= Class.extend({
    init: function(){
    },
    mutation: function(pIndividual){
        //not of a bit
        var mutationNumber = Math.floor(Math.random()*100); //100 percent

        if(mutationNumber<MUTATION_PROBABILITY){   //it exists in th minority
            var mutationPoint=Math.floor(Math.random()*(AMOUNT_OF_BITS-1));
            var bitMask= 1<<mutationPoint;
            pIndividual=pIndividual^bitMask; //exor of mask
        }
        return pIndividual;
    },
    cross:function (pFather, pMother){
        //variable point
        var crossPoint=Math.floor((Math.random()*(AMOUNT_OF_BITS-1))+1);

        pFather=pFather>>>(AMOUNT_OF_BITS-crossPoint); //erease the less significant bits
        pFather= pFather<<(AMOUNT_OF_BITS-crossPoint); //returns most significant bits to current position
        
        var motherMask=pMother>>>(AMOUNT_OF_BITS-crossPoint); //creates mask of most significant bits of mother
        motherMask=motherMask<<(AMOUNT_OF_BITS-crossPoint); //return mask to actual position
        pMother=pMother^motherMask; //exors the bits to get the less significant bits
        return this.mutation(pFather+pMother);
    }
});



