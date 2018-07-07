import React, {Fragment}from 'react';




const TwH = ({tasks}) =>{
let sum=[]
tasks.map((task)=>sum.push(task.total))
let tot = sum.reduce(function (a,b) {return a +b;}, 0)
const h = Math.floor(tot / 60);
const m = tot % 60;
const nh = h < 10 ? '0' + h : h;
const nm = m < 10 ? '0' + m : m; 
return(
   
<Fragment>

{
    nh + ':' + nm
}

</Fragment>


  


)
}
export default TwH;