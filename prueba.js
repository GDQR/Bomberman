class fullAnimKey{
    time;
    translation;
    scale;
    rotation;
    
};

class fullAnim{
    numKeys;
    keys = fullAnimKey;
    
    getKeyAtTimeBinary(time){
        let l=0;
        let h = numkeys-1;
        let m = (l+h) / 2;
        
        while(l<h){
            if(time < this.keys[m].time){
                h = m-1;
            }else{
                l = m;
            }
            m = (l+h+1) / 2;
        }
        return this.keys[m];
    }
}