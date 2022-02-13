import React, { useEffect,useState } from 'react'
import jwt from 'jsonwebtoken'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PieChart } from './PieChart';
import '../styles/expensecard.css'
import BarGraph from './BarGraph';
import { ScatterGraph } from './ScatterGraph';
import TotalSpent from './TotalSpent';
import CategoryStats from './CategoryStats';
import { YearlyBars } from './YearBarGraph';
import { SubTypeChart } from './SubType';

function Expense(){
   
    const navigate = useNavigate();
    const [tempAmount,setTempAmount] = useState('')
    const [tempType,setTempType] = useState('')
    const [tempSubType,setTempSubType] = useState('')
    const [tempDate,setTempDate] = useState([])
    const [costs,setCosts] = useState([])
    
    async function getExpenses(){
        axios.get('https://expense-trackermern.herokuapp.com/api/allexpensex')
                .then((response)=>{
                    setCosts(response.data)
                })
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            const user = jwt.decode(token)
            if(!user){
                localStorage.removeItem('token')
                navigate('/login')
            }
            else{
                //getBlogs()
                //get previous expenses 
                getExpenses()
            }
        }
    },[])
    // console.log(costs)
    const token = localStorage.getItem('token')
    const user = jwt.decode(token)
    const name = user.username
    let userexpenses = costs.filter(item => item.username==name)

    async function createExpense(){

         const req =  await fetch('https://expense-trackermern.herokuapp.com/api/expensex',{
             method:'POST',
             headers:{
                 'Content-Type':'application/json',
                 'x-access-token': localStorage.getItem('token'),
             },
             body:JSON.stringify({
                author:name,
                amount:tempAmount,
                type:tempType,
                subtype:tempSubType.charAt(0).toUpperCase() + tempSubType.slice(1),
                date:tempDate.slice(0,10)
             })
             
         })
         const data = await req.json()
              if(data.status !=='ok'){
                alert(data.error)
              }
    }

    return ( 
    <div>
    <div className="dashboard">
    <div className='reportContainer'>

    <form onSubmit={createExpense} className='expense-box'>
    <div className="expense-form-title">
        Add an Expense
      </div>
        <input 
        type="number"
        placeholder="Amount"
        min="0"
        value={tempAmount}
        onChange={(e)=>setTempAmount(e.target.value)}
        className='expense-forminput'/><br/>
        <select value={tempType} onChange={(e)=>setTempType(e.target.value)}
        className='expense-forminput'>
            <option value="" disabled selected>Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="medical">Medical</option>
            <option value="entertainment">Entertainment</option>
            <option value="business">Business</option>
            <option value="misc">Miscelleneous</option>
        </select><br/>
        <input type="date" onChange={(e)=>setTempDate(e.target.value)} className='expense-forminput'/><br/>
        <input type="text"  onChange={(e)=>setTempSubType(e.target.value)} placeholder="Remark" className='expense-forminput'/>
        <input className="expense-submitbutton" type="submit" value="Save" />
    </form>

    <div className='totalspent'><TotalSpent expensesdata={userexpenses}/></div>
    <div className='categorystats'><CategoryStats expensesdata={userexpenses}/></div> 
    <div className='piechart'><PieChart expensesdata={userexpenses}/></div>
    <div className='bargraph'><BarGraph expensesdata={userexpenses}/></div>
    <div className='scatterchart'><ScatterGraph expensesdata={userexpenses}/></div>
    <div className='yearlychart'><YearlyBars expensesdata={userexpenses}/></div>
    <div className='donutchart'><SubTypeChart expensesdata={userexpenses}/></div>
    </div>
    </div>
    </div>
    )
}

export default Expense;


