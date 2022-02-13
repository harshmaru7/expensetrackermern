import React,{useState,useEffect} from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import {Bar,Line} from 'react-chartjs-2';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

export function YearlyBars(props){

    const [year,setYear] = useState('')
    console.log(props.expensesdata)
    const expensedata = props.expensesdata
    //console.log(expensedata)
    let currentYear = new Date().getFullYear()
    let yearArray = [currentYear,currentYear-1,currentYear-2,currentYear-3,currentYear-4]
    let yearlyExpense = [] 
    console.log(yearArray)
    yearArray.forEach((e)=>{
        let t = expensedata.filter(a => { 
             var[year_date,month]=a.date.split('-');
             console.log(e)
             return (e==year_date)
           }).map(e=>e.amount).reduce((total,e)=>total+e,0)
        yearlyExpense.push(t)
    })

    console.log(yearlyExpense)

    const options = {
        indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
        responsive: true,
       // maintainAspectRatio: false, //helps in the sizing 
        plugins: {
          legend: {
            position: 'top' ,
          },
          title: {
            display: true,
            text: 'Yearly Expenditure Bar Chart',
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
      
      const labels = yearArray
      const data = {
        labels,
        datasets: [
          {
            label: 'Year-wise Spending ',
            data: yearlyExpense,
            // backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
        ],
      };



    return (<div>
        <Bar options={options} data={data} />
       </div>
       )
}
