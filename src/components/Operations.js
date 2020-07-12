
  module.exports ={
    
/* potencial2: function(amperage,spacing,depth,resistivity) {
  var powspacing = Math.pow(spacing,2);
  var dpowspacing = Math.pow(2*spacing,2);
  var powdepth = Math.pow(depth,2);
  var dpowdepth = Math.pow(2*depth,2);    
      var ct0 = (resistivity*amperage)/(4*Math.PI);
      var v2_ct1 = 1/spacing;
      var v2_ct2 = 1/(Math.sqrt(powspacing+dpowdepth));
      var v2_ct3 = 1/(2*spacing);
      var v2_ct4 = 1/(Math.sqrt(dpowspacing+(dpowdepth)));
      var v2 = ct0 *(v2_ct1+v2_ct2-v2_ct3-v2_ct4);
      
      return v2;
    },
    
    
    potencial3: function(amperage,spacing,depth,resistivity) {
      var powspacing = Math.pow(spacing,2);
      var dpowspacing = Math.pow(2*spacing,2);
      var powdepth = Math.pow(depth,2);
      var dpowdepth = Math.pow(2*depth,2);   
      var ct0 = (resistivity*amperage)/(4*Math.PI);
      var v3_ct1 = 1/2*spacing;
      var v3_ct2 = 1/(Math.sqrt(dpowspacing+(dpowdepth)));
      var v3_ct3 = 1/(spacing);
      var v3_ct4 = 1/(Math.sqrt(2*powspacing+(dpowdepth))); 
      var v3 = ct0 *(v3_ct1+v3_ct2-v3_ct3-v3_ct4);
      return v3;
    },


    ddp23: function(amperage,spacing,depth,resistivity) {
      var powspacing = Math.pow(spacing,2);
      var dpowspacing = Math.pow(2*spacing,2);
      var powdepth = Math.pow(depth,2);
      var dpowdepth = Math.pow(2*depth,2); 
      var ct0 = (resistivity*amperage)/(4*Math.PI);
      var v_ct1 = 1/spacing;
      var v_ct2 = 2/(Math.sqrt(powspacing+(dpowdepth)));
      var v_ct3 = 2/(Math.sqrt(dpowspacing+(dpowdepth)));
      var v231 = ct0*(v_ct1 + v_ct2 - v_ct3);

      return [v231];
    },

  resolo: function(amperage,spacing,depth,resistivity) {
      var powspacing = Math.pow(spacing,2);
      var dpowspacing = Math.pow(2*spacing,2);
      var powdepth = Math.pow(depth,2);
      var dpowdepth = Math.pow(2*depth,2);     
      var ct0 = (resistivity)/(4*Math.PI);
      var v_ct1 = 1/spacing;
      var v_ct2 = 2/(Math.sqrt(powspacing+(dpowdepth)));
      var v_ct3 = 2/(Math.sqrt(dpowspacing+dpowdepth));
      var rsolo = ct0*(v_ct1 + v_ct2 - v_ct3);
      return rsolo;
    }, */
    reletricasolo: function(spacing,rsolo) {
      
      var cfinal = (2*Math.PI*spacing*rsolo);

      return cfinal;
    },

    depth: function(amperage,spacing,resistivity,rsolo) {
      var rsolol = 0;
      var i = 0
      do {   
        i=((i*10+0.1*10)/10)
        console.log("i:",i);
        var powspacing = Math.pow(spacing,2);
        var dpowspacing = Math.pow(2*spacing,2);
        var dpowdepth = Math.pow(2*i,2);     
        var ct0 = (resistivity)/(4*Math.PI);
        var v_ct1 = 1/spacing;
        var v_ct2 = 2/(Math.sqrt(powspacing+(dpowdepth)));
        var v_ct3 = 2/(Math.sqrt(dpowspacing+dpowdepth));
        rsolol = ct0*(v_ct1 + v_ct2 - v_ct3);
        console.log("cfinal:",rsolol);
        console.log("cfinal:",rsolo);
    }  while(rsolol != rsolo);
  return i; 
  
    },

    isNumberWithinPercentOfNumber(number, percent, media) {
      let valuetotest = Math.abs(number-media);
      let filter = percent * media
      let decimalPercent;
      if(valuetotest< filter){
        decimalPercent = true;
      }else{
        decimalPercent=false;
      }
       return decimalPercent;
   },



  }
