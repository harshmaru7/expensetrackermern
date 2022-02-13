import React,{useState,useEffect} from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

export function BarGraph(props) {

  const [year,setYear] = useState('')

  const expensedata = props.expensesdata
  //console.log(year)
  //let currentMonth = new Date().getMonth() + 1 index of months is 0 , jan 0 and dec is 11
  let currentYear = new Date().getFullYear()
  //setYear(currentYear) - inifinite re-rendering 

  useEffect(()=>{
    setYear(currentYear);
  },[])

  let yearexpense = expensedata.filter(e => { 
    var[year_date,month]=e.date.split('-');
    return (year==year_date)
  })
  let jan = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('01' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let feb = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('02' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let march = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('03' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let april = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('04' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let may = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('05' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let june = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('06' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let july = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('07' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)  
  let aug = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('08' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let sept = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('09' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let oct = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('10' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let nov = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('11' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)
  let dec = expensedata.filter(e => { var[year_date,month]=e.date.split('-');
    return ('12' == month) && (year_date == year)}).map(e=>e.amount).reduce((total,e)=>total+e,0)  

  const options = {
    responsive: true,
   // maintainAspectRatio: false, //helps in the sizing 
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Monthly Expenditure Bar Chart',
      },
    },
    scales:{
      y:{
        title:{
          display:false,
          text: 'Amount'
        }
      }
    }
  };
  
  const labels = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July','Aug','Sept','Oct','Nov','Dec'];
  const data = {
    labels,
    datasets: [
      {
        label: 'Monthly Spending ',
        data: [jan,feb,march,april,may,june,july,aug,sept,oct,nov,dec],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (<div>
   {/* <input type="date"  className='forminput'/> */}
   Your monthly expenditure in <input type="number" min="1900" max="2099" step="1" placeholder={currentYear} onChange={(e)=>setYear(e.target.value)}/>
    <Bar options={options} data={data} />
  </div>

  )
}

export default BarGraph;


//onChange={(e)=>setTempDate(e.target.value)}