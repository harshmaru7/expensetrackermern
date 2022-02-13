import React,{useState,useEffect} from 'react';
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend,} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend)

export function SubTypeChart(props){

    const [type,setType] = useState('')

    const expensedata = props.expensesdata
    let categoryArray = ['food','transport','medical','entertainment','business','misc']
    let subTypesArray =  []
    //create a subtype array for each which has subtypes of each , array of arrays 
    categoryArray.forEach((e)=>{
        let currentSubType = e 
        let unique_subtypes = [...new Set(expensedata.filter((a)=>a.type==e).map(item=>item.subtype))]
        console.log(unique_subtypes)
        subTypesArray.push(unique_subtypes)
    })
    // categoryArray.forEach((e)=>{
    //     let t = expensedata.filter(a => (a==year_date)).map(e=>e.amount).reduce((total,e)=>total+e,0)
    //    yearlyExpense.push(t)
    // })
    console.log(subTypesArray)
    
    let category
    if(type=='food'){category=0}else if(type=='transport'){category=1}else if(type=='medical'){category=2}
    else if(type=='entertainment'){category=3}else if(type=='business'){category=4} else {category=5}
    
    let subTypeExpense = []
    subTypesArray[category].forEach((e)=>{
        let t = expensedata.filter(a => { 
             return (e==a.subtype)
           }).map(e=>e.amount).reduce((total,e)=>total+e,0)
        subTypeExpense.push(t)
    })
    console.log(subTypeExpense)

    const data = {
        labels: subTypesArray[category],
        datasets: [{
          data: subTypeExpense,
          backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A1E6FD',
          '#D2F8DD',
          '#F7DFD5'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#A1E6FD',
          '#D2F8DD',
          '#F7DFD5'
          ]
        }]
      };
    const options={
       aspectRatio:1.9,//(width/height)
      // maintainAspectRatio: false, 
       responsive : true,
    }
    return (<div>
        <select value={type} onChange={(e)=>setType(e.target.value)}
        className='expense-forminput'>
            <option value="" disabled selected>Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="medical">Medical</option>
            <option value="entertainment">Entertainment</option>
            <option value="business">Business</option>
            <option value="misc">Miscelleneous</option>
        </select><br/>
        <Doughnut options={options} data={data}/>
    </div>)

}
