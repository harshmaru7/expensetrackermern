import React from 'react';
import '../styles/categorystats.css'

export default function CategoryStats(props){
    let expensedata = props.expensesdata
    let currentMonth = new Date().getMonth() + 1 //index of months is 0 , jan 0 and dec is 11
    let currentYear = new Date().getFullYear()
    //total of each category this month
    let thisMonth = expensedata.filter(e => {
        var [year, month] = e.date.split('-'); 
        return (currentMonth === +month) && (currentYear == year);
        })
    
    let food = thisMonth.filter(e=> e.type=='food').map(e=>e.amount).reduce((total,e)=>total+e,0);
    let transport = thisMonth.filter(e=> e.type=='transport').map(e=>e.amount).reduce((total,e)=>total+e,0);
    let medical = thisMonth.filter(e=> e.type=='medical').map(e=>e.amount).reduce((total,e)=>total+e,0);
    let entertainment = thisMonth.filter(e=> e.type=='entertainment').map(e=>e.amount).reduce((total,e)=>total+e,0);
    let business = thisMonth.filter(e=> e.type=='business').map(e=>e.amount).reduce((total,e)=>total+e,0);            
    let misc = thisMonth.filter(e=> e.type=='misc').map(e=>e.amount).reduce((total,e)=>total+e,0);

    //past average 
    //i will need to find total months .

    let dates = expensedata.map(e=>e.date)
    let orderedDates = dates.sort(function(a,b){return Date.parse(a)>Date.parse(b)})
    // Date.parse returns the number of milliseconds since January 1, 1970, 00:00:00 UTC
    //console.log(orderedDates) // i can find the earliest and latest date , find the total and number of months and get avg
    //finding the number of months
    let n = orderedDates.length
    let earliestDate = orderedDates?.[0] 
    let latestDate = orderedDates?.[n-1]
    //the questiopn mark above is optional chaining operator and it 
    //provides a way to simplify accessing values through connected objects \
    //when it's possible that a reference or function may be undefined or null.
    //so in above case without the ? there was error with split maybe because it spliting an ref 
    // split a variable that is from another variable which is from another variable
    let earliestYear = earliestDate?.split('-')?.[0]
    let earliestMonth = earliestDate?.split('-')?.[1]
    let latestYear = latestDate?.split('-')?.[0]
    let latestMonth = latestDate?.split('-')?.[1]
    //console.log(latestYear)
    //finding the difference in months 
    let differenceMonths = Math.abs(earliestMonth-latestMonth) + Math.abs(12*(latestYear-earliestYear))
    //orderedDates[0] and orderedDates[n-1] where n=orderedDates.length-1
    differenceMonths = differenceMonths > 0 ? differenceMonths : 1 //let differenceMonths = 1 
    //console.log(differenceMonths)   

    let foodAvg = Math.round((expensedata.filter(e=> e.type=='food').map(e=>e.amount).reduce((total,e)=>total+e,0))/differenceMonths);
    let transportAvg = Math.round((expensedata.filter(e=> e.type=='transport').map(e=>e.amount).reduce((total,e)=>total+e,0))/differenceMonths);
    let medicalAvg = Math.round((expensedata.filter(e=> e.type=='medical').map(e=>e.amount).reduce((total,e)=>total+e,0))/differenceMonths);
    let entertainmentAvg = Math.round((expensedata.filter(e=> e.type=='entertainment').map(e=>e.amount).reduce((total,e)=>total+e,0))/differenceMonths);
    let businessAvg = Math.round((expensedata.filter(e=> e.type=='business').map(e=>e.amount).reduce((total,e)=>total+e,0))/differenceMonths);            
    let miscAvg = Math.round((expensedata.filter(e=> e.type=='misc').map(e=>e.amount).reduce((total,e)=>total+e,0))/differenceMonths);

    //find the difference 

    return(<div>
        <table className="content-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Past Average</th>
      <th>This Month</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Food</td>
      <td>{foodAvg}</td>
      <td>{food}</td>
    </tr>
    <tr className="active-row">
      <td>Transport</td>
      <td>{transportAvg}</td>
      <td>{transport}</td>
    </tr>
    <tr>
      <td>Medical</td>
      <td>{medicalAvg}</td>
      <td>{medical}</td>
    </tr>
    <tr className="active-row">
      <td>Entertainment</td>
      <td>{entertainmentAvg}</td>
      <td>{entertainment}</td>
    </tr>
    <tr>
      <td>Business</td>
      <td>{businessAvg}</td>
      <td>{business}</td>
    </tr>
    <tr className="active-row">
      <td>Misc</td>
      <td>{miscAvg}</td>
      <td>{misc}</td>
    </tr>
  </tbody>
</table>

    </div>)

}


// <div>Food<br/>
//         <p>Past average : {foodAvg}</p>
//         <p>This month: {food}</p>
//         <p> Spent Extra or less depending </p>
//         </div>
//         <div>Transport<br/>
//         <p>Past average : {transportAvg}</p>
//         <p>This month: {transport}</p>
//         <p> Spent Extra or less depending </p>
//         </div>
//         <div>Medical<br/>
//         <p>Past average : {medicalAvg}</p>
//         <p>This month: {medical}</p>
//         <p> Spent Extra or less depending </p>
//         </div>
//         <div>Entertainment<br/>
//         <p>Past average : {entertainmentAvg}</p>
//         <p>This month: {entertainment}</p>
//         <p> Spent Extra or less depending </p>
//         </div>
//         <div>Business<br/>
//         <p>Past average : {businessAvg}</p>
//         <p>This month: {business}</p>
//         <p> Spent Extra or less depending </p>
//         </div>
//         <div>Misc<br/>
//         <p>Past average : {miscAvg}</p>
//         <p>This month: {misc}</p>
//         <p> Spent Extra or less depending </p>
//         </div>
//console.log(typeof(earliestDate))
    //let d = '2022-01-01'
    //console.log(d)
    //console.log(d.split('-'))
//console.log(earliestYear)
    //let [latestYear,latestMonth] = latestDate?.split('-')
    // console.log(earliestYear)
    // console.log(earliestMonth)
    // console.log(latestYear)
    // console.log(latestMonth)

// console.log(latestDate?.split('-'))
    // console.log(earliestDate?.split('-'))
    // var a = earliestDate?.split('-')
    // console.log("a",a)