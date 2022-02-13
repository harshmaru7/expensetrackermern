import React, { useState,useEffect } from 'react';
import {Chart as ChartJS,LinearScale,PointElement,LineElement,Tooltip,Legend,} from 'chart.js';
import { Scatter } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export function ScatterGraph(props) {

  const [year,setYear] = useState('')
  const [month,setMonth] = useState('')

  const expensedata = props.expensesdata
  
  let currentYear = new Date().getFullYear() //setYear(currentYear) - inifinite re-rendering 
  let currentMonth = new Date().getMonth()+1  

  useEffect(()=>{
    setYear(currentYear);
    setMonth(currentMonth);
  },[])

  function changeDate(event){
    let userDate = event.target.value
    var[year,month]=userDate.split('-');
    setYear(year)
    setMonth(month)
  }

  const addDay = expensedata.filter(e => { var[year_date,month_date]=e.date.split('-');
  return (month_date == month) && (year_date == year)}).map(item => {var[year,month,day]=item.date.split('-') 
  return {...item,day:day} })  //adding the day in the data for the data to be plotted
  //console.log(addDay)
  //const dailyexpense = expensedata.map(({date,amount})=>({date,amount}))
  //const dailyexpense = expensedata.map( item => { return { x: item.date, y: item.amount} });
  const dailyexpense = addDay.map(item => {return {x:item.day,y:item.amount}});
  //console.log(dailyexpense)
  const options = {
    responsive:true,
    //maintainAspectRatio: false,
    //aspectRatio: 2 ,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Daily Expenses',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title:{
          display:true,
          text:'Amount(INR)'
        }
      },
       x:{
        title:{
          display:true,
          text: 'Day of the month'
        }
     }
    },
  };
  const data = {
    datasets: [
      {
        label: 'Daily Expenses',
      
        data : dailyexpense,    
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  console.log()
  return (<div>
      Expenses scattered over <input type="month" onChange={changeDate}/>
    <Scatter options={options} data={data} />
  </div>) 
}

export default ScatterGraph;

//onChange={(e)=>setYear(e.target.value)}
//import { Chart, registerables } from 'chart.js';

//   data: Array.from({ length: 100 }, () => ({
      //     x: faker.datatype.number({ min: -100, max: 100 }),
      //     y: faker.datatype.number({ min: -100, max: 100 }),
      //   })),
      // data : [
      //     { x: 1, y: 23 },
      //     { x: 2, y: 3 },
      //     { x: 3, y: 15 },
      //     { x: 4, y: 35 },
      //     { x: 5, y: 45 },
      //     { x: 6, y: 25 },
      //     { x: 7, y: 17 },
      //     { x: 8, y: 32 },
      //     { x: 9, y: 43 },],