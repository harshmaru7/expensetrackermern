import React from 'react';
import '../styles/totalspent.css'

export default function TotalSpent(props){
    
    const expensedata = props.expensesdata
    let currentMonth = new Date().getMonth() + 1 // +1 as jan is 0 
    let currentYear = new Date().getFullYear()

    // Or, var month = e.date.split('-')[1];
    let thisMonth = expensedata.filter(e => {
    var [year, month] = e.date.split('-');
    //console.log("month",month,"-",year)
    return (currentMonth == month) && (currentYear == year);}).map(e=>e.amount).reduce((total,e)=>total+e,0);
    //console.log(thisMonth)
    //new Date() results in Wed Feb 02 2022 23:15:29 GMT+0530 (India Standard Time)
    //what is toISOString , new Date().toISOString() ='2022-02-02T17:45:01.708Z'
    //The toISOString() method returns a string in simplified 
    //extended ISO format (ISO 8601), which is always 24 or 27 characters long 
    //( YYYY-MM-DDTHH:mm:ss. sssZ or ±YYYYYY-MM-DDTHH:mm:ss. sssZ , respectively).
    let todayDate = new Date().toISOString().slice(0, 10);
    let yesterdayDate = (new Date(new Date().setDate(new Date().getDate()-1))).toISOString().split('T')[0]
    let spentToday = expensedata.filter(e => e.date==todayDate).map(e=>e.amount).reduce((total,e)=>total+e,0);
    let spentYesterday = expensedata.filter(e => e.date==yesterdayDate).map(e=>e.amount).reduce((total,e)=>total+e,0);

    //console.log(spentToday)
    //console.log(spentYesterday)

    return (
    <div className="card-spent">
    <div className='heading'>You've spent</div>
    <div className="flexrow">
    <div className="circle-with-text">
        {thisMonth} <br/>
        so far this month
    </div>       
    <div className='day'>
    <div className='solid'>
        {spentToday} INR spent today
    </div>
    <div className='solid'>
        {spentYesterday} INR spent yesterday
    </div>
    </div>
    </div>
  </div>)
}




{/* <div className="circle-with-text multi-line-text">
      200000000000000000000000
    </div> */}
//console.log(thisMonth)
    //return <div className='circle'>Test</div>
    //console.log(todayDate);
    // console.log(yesterdayDate)  
//     <div><fieldset>
//   <legend>Amount spent today</legend>
// </fieldset></div>