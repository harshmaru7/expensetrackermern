import React,{useState,useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie ,Line} from 'react-chartjs-2';
import '../styles/piechart.css'
ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart(props) {
   
    const [startDate,setStartDate] = useState('')
    const [endDate,setEndDate] = useState('')

    let dates = props.expensesdata.map(e=>e.date)
    let orderedDates = props.expensesdata.map(e=>e.date).sort(function(a,b){return Date.parse(a)>Date.parse(b)})
    //console.log(orderedDates) // i can find the earliest and latest date , find the total and number of months and get avg
    //finding the number of months
    let n = orderedDates.length
    let earliestDate = orderedDates?.[0] 
    let latestDate = orderedDates?.[n-1]
    //console.log(earliestDate)
    //console.log(latestDate)
    useEffect(()=>{
      setStartDate(earliestDate);
      setEndDate(latestDate);
      //console.log(startDate)
    },[])
 
    //const expensedata = props.expensesdata.filter(a=> a.date>=startDate && a.date<=endDate) added the below just to be sure and not depend on js string comparisons
    const expensedata = props.expensesdata.filter(a=> new Date(a.date)>= new Date(startDate) && new Date(a.date)<=new Date(endDate))
    let food = expensedata.filter(item=>item.type=='food').map(item=>item.amount).reduce((total,item)=>total+item,0)
    let transport = expensedata.filter(item=>item.type=='transport').map(item=>item.amount).reduce((total,item)=>total+item,0)
    let medical = expensedata.filter(item=>item.type=='medical').map(item=>item.amount).reduce((total,item)=>total+item,0)
    let entertainment = expensedata.filter(item=>item.type=='entertainment').map(item=>item.amount).reduce((total,item)=>total+item,0)
    let business = expensedata.filter(item=>item.type=='business').map(item=>item.amount).reduce((total,item)=>total+item,0)
    let misc = expensedata.filter(item=>item.type=='misc').map(item=>item.amount).reduce((total,item)=>total+item,0)

    const data = {
        labels: [
          'Food',
          'Transport',
          'Medical',
          'Entertainment',
          'Business',
          'Misc'
        ],
        datasets: [{
          data: [food, transport, medical,entertainment,business,misc],
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
  return (
    <div>
      <div className='heading-chart'>
      Category wise expenses <input type="date" onChange={(e)=>setStartDate(e.target.value)} /> <input type="date" onChange={(e)=>setEndDate(e.target.value)} /> 
      </div>
    <Pie data={data}/>
    </div>
  )
  
}

export default PieChart;


 // async function getExpenses(){

    //     const token = localStorage.getItem('token')
    //     const user = jwt.decode(token)
    //     const name = user.username

    //     const req =  await fetch('http://localhost:1337/api/expense',{
    //         method:'GET',
    //         headers:{
    //             'Content-Type':'application/json',
    //             'x-access-token': localStorage.getItem('token'),
    //         },
    //         body:JSON.stringify({author:name})
            
    //     })
    //     expensedata = await req.json()
    //          if(expensedata.status !=='ok'){
    //            alert(expensedata.error)
    //          }
    //     }
       
    // const data = {
    //     labels: ['Food', 'Transport', 'Medical', 'Entertainment', 'Business', 'Misc.'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [food, transport , medical, entertainment, business, misc],
    //         backgroundColor: [
    //           'rgba(255, 99, 132, 0.2)',
    //           'rgba(54, 162, 235, 0.2)',
    //           'rgba(255, 206, 86, 0.2)',
    //           'rgba(75, 192, 192, 0.2)',
    //           'rgba(153, 102, 255, 0.2)',
    //           'rgba(255, 159, 64, 0.2)',
    //         ],
    //         borderColor: [
    //           'rgba(255, 99, 132, 1)',
    //           'rgba(54, 162, 235, 1)',
    //           'rgba(255, 206, 86, 1)',
    //           'rgba(75, 192, 192, 1)',
    //           'rgba(153, 102, 255, 1)',
    //           'rgba(255, 159, 64, 1)',
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   };
  
     //const [charges,setCharges] = useState([])
    //let expensedata
    // function getExpenses(){
    //     axios.get('http://localhost:1337/api/expense')
    //     .then((response)=>{
    //             setCharges(response.data)
    //     })
    //     .catch((error) => {
    //         console.log(error)
    //     })
    // }

    // function getAllExpenses(){
    //     axios.get('http://localhost:1337/api/allexpense')
    //             .then((response)=>{
    //                 setCharges(response.data)
    //                 console.log(response.data)
    //             })
    // }
    
    // useEffect(()=>{
    //     const token = localStorage.getItem('token')
    //     if(token){
    //         const user = jwt.decode(token)
    //         if(!user){
    //             localStorage.removeItem('token')
    //             // navigate('/login')
    //         }else{
    //             getAllExpenses()
    //             console.log(charges)
    //         }
    //     }
    // },[])

    // const expenseCategories = async (params) => {
    //     //const query = queryString.stringify(params)
    //     try {
    //       let response = await fetch('/api/expense', {
    //         method: 'GET',
    //       })
    //       return await response.json()
    //     }catch(err){
    //       console.log(err)
    //     }
    //   }
    //getExpenses()
    //console.log(charges)

    // useEffect(() => {
    //     expenseCategories({'username': 'a'}).then((response) => {
    //       if (response.error) {
    //         console.log(response.error)
    //       } else {
    //         setCharges(response.data)
    //       }
    //     })
    // }, [])

    //let foodx = expensedata.filter(item => item.type==='food').map(item=> item.amount ).reduce((acc,item)=>acc+item)
    //console.log(foodx)
    //let food = 100
    // let transport = charges.filter(item => item.type==='transport').map(item=> item.amount ).reduce((acc,item)=>acc+item)
    // let medical = charges.filter(item => item.type==='medical').map(item=> item.amount ).reduce((acc,item)=>acc+item)
    // let entertainment = charges.filter(item => item.type==='entertainment').map(item=> item.amount ).reduce((acc,item)=>acc+item)
    // let business = charges.filter(item => item.type==='business').map(item=> item.amount ).reduce((acc,item)=>acc+item)
    // let misc = charges.filter(item => item.type==='misc').map(item=> item.amount ).reduce((acc,item)=>acc+item)
    //let food = 100
    //console.log(props)
    //console.log(expensedata.filter(item=> item.type=='food'))
    //let foodx = expensedata.filter(item=>item.type=='food').map(item=>item.amount).reduce((total,item)=>total+item,0)
    //console.log(foodx)

    {/* <Pie data={data} redraw />; */}
    {/* <h1>Pie Chart ! total data and food cost {food} {transport} </h1> */}