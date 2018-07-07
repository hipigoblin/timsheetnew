import React, { Component , Fragment } from 'react'
import axios from 'axios';
import "./Timesheet.css";
import loading from './loader.gif'
import TextField from '@material-ui/core/TextField';
import moment from 'moment'
import TwH from './TWH'

export default class Timesheet extends Component {
  constructor(props){
    super(props);
    this.state={
    tasks:[],
    data:'',
    type:'',
    time:'',
    endtime:null,
    duration:'00:00',
    error: null,
    editing:false,
    editIndex: null,
    declare:false,
    notifi:null,
    loading:true,
    beginInminits:"",
    endInminits:"",
    realbegin:"",
    realend:"",
    chaa:false,
    total:0


    }

    this.apiURL = 'https://5b3e9b66c3c3fb00147427f1.mockapi.io';
    
  }



  async componentDidMount(){

    const response = await axios.get(`${this.apiURL}/time`)
    setTimeout(() => {
      this.setState({
        tasks:response.data,
        loading:false
      })      
    }, 2000);


  }
  handleChange= (e)=>{
    this.setState({
        data: e.target.value
       
        
    })
}

alert = (notifi) =>{
this.setState({
  notifi: notifi
})

setTimeout(() => {
  this.setState({
    notifi:null
  })
}, 4000);

}
  selectChange=(b)=>{
 this.setState({
   type: b.target.value
 })
    
  }
  async changeState (){
  if(this.state.data.length > 0 && this.state.type.length > 0 && this.state.duration !== "00:00" ){
   const response = await axios.post(`${this.apiURL}/time`,{
    data: this.state.data,
    type: this.state.type,
    time: this.state.time,
    endtime: this.state.endtime,
    duration: this.state.duration,
    realbegin:this.state.realbegin,
    realend:this.state.realend,
    beginInminits:this.state.beginInminits,
    endInminits:this.state.endInminits,
    total:this.state.total


   });

    const old = this.state.tasks
    old.push(response.data);
    this.setState({
      tasks: old,
      data:'',
      type:'',
      time:'00:00',
      endtime:'00:00',
      duration:'00:00',
      realbegin:"",
      realend:""
    
    })
    this.alert("Task Added Succcesfully")
   return this.error(null)
  }
   return this.error("Please Fill All The Fields ")
 

  }
  error =(err)=>{
    this.setState({
      error:err
    })

    setTimeout(()=>{
      this.setState({
        error: null
      })
    },4000)
  }


  async deleteData(i) {
    const parse = parseInt(i ,16)
    const tasks = this.state.tasks
    const task = tasks[parse - 1]
    console.log(task)
    await axios.delete(`${this.apiURL}/time/${task.id}`);
    delete tasks[parse - 1]
    this.setState({
    tasks: tasks,
    })
    this.alert('Task Deleted Succcefully')

  }



  updateData =(ind) =>{
    const taskno= ind -1
const taskn = this.state.tasks[ind -1];

this.setState({
  editing:true,
  data:taskn.data,
  type:taskn.type,
  time:taskn.realbegin,
  endtime:taskn.realend,
  beginInminits:taskn.beginInminits,
  endInminits:taskn.endInminits,
  editIndex:taskno,
  chaa:true,
  realbegin:taskn.realbegin,
  realend:taskn.realend,
  duration:taskn.duration,
  total:taskn.total

})

setTimeout(() => {
  this.setState({
    chaa:false
  })      
}, 100);
  }
  async editTodo (){
    const task = this.state.tasks[this.state.editIndex]
    const begin = this.state.beginInminits
    const end = this.state.endInminits
    if(begin > 720 && end > 720){
    const response = await axios.put(`${this.apiURL}/time/${task.id}`,{
      data :this.state.data,
      type : this.state.type,
      time : this.state.time + "Pm",
      endtime : this.state.endtime + "Pm",
      duration : this.state.duration ,
      realbegin : this.state.realbegin,
      realend : this.state.realend,
      beginInminits:this.state.beginInminits,
      endInminits:this.state.endInminits,
      total:this.state.total
    }); 
    const taskList = this.state.tasks
    taskList[this.state.editIndex] = response.data;
    this.setState({
      taskList, 
      editing:false,
      editIndex:null,
      data:"",
      type:"",
      time:"",
      endtime:"",
      duration:"",
      realbegin:"",
      realend:"",
      total:0
    })
    this.alert('Updated Succefully')
  }else if (begin < 720 && end < 720){
    const response = await axios.put(`${this.apiURL}/time/${task.id}`,{
      data :this.state.data,
      type : this.state.type,
      time : this.state.time + "Am",
      endtime : this.state.endtime + "Am",
      duration : this.state.duration ,
      realbegin : this.state.realbegin,
      realend : this.state.realend,
      beginInminits:this.state.beginInminits,
      endInminits:this.state.endInminits,
      total:this.state.total
    }); 
    const taskList = this.state.tasks
    taskList[this.state.editIndex] = response.data;
    this.setState({
      taskList, 
      editing:false,
      editIndex:null,
      data:"",
      type:"",
      time:"00:00",
      endtime:"00:00",
      duration:"",
      realbegin:"",
      realend:"",
      total:0
    })
    this.alert('Updated Succefully')

  }else if(begin < 720 && end > 720){
    const response = await axios.put(`${this.apiURL}/time/${task.id}`,{
      data :this.state.data,
      type : this.state.type,
      time : this.state.time + "Am",
      endtime : this.state.endtime + "Pm",
      duration : this.state.duration ,
      realbegin : this.state.realbegin,
      realend : this.state.realend,
      beginInminits:this.state.beginInminits,
      endInminits:this.state.endInminits,
      total:this.state.total
    }); 
    const taskList = this.state.tasks
    taskList[this.state.editIndex] = response.data;
    this.setState({
      taskList, 
      editing:false,
      editIndex:null,
      data:"",
      type:"",
      time:"",
      endtime:"",
      duration:"",
      realbegin:"",
      realend:"",
      tota:0
    })
    this.alert('Updated Succefully')
  }else{
    const response = await axios.put(`${this.apiURL}/time/${task.id}`,{
      data :this.state.data,
      type : this.state.type,
      time : this.state.time + "Pm",
      endtime : this.state.endtime + "Am",
      duration : this.state.duration ,
      realbegin : this.state.realbegin,
      realend : this.state.realend,
      beginInminits:this.state.beginInminits,
      endInminits:this.state.endInminits,
      total:this.state.total
    }); 
    const taskList = this.state.tasks
    taskList[this.state.editIndex] = response.data;
    this.setState({
      taskList, 
      editing:false,
      editIndex:null,
      data:"",
      type:"",
      time:"",
      endtime:"",
      duration:"",
      realbegin:"",
      realend:"",
      total:0
    })
    this.alert('Updated Succefully')
  }
    

  }


  //function 1
btimePicker= (data)=>{
   const btime = data.target.value
  const hours = btime.slice(0, 2)
  const minits = btime.slice(3)
  const beginMinits= (hours * 60) + parseInt(minits, 10)
  const endinMinits = this.state.endInminits
this.setState({
realbegin:btime
})

  if(hours > 11){
   hours === "12" ? 
   this.setState({
     time: hours + ":" + minits + " Pm",
     beginInminits:beginMinits

   })
   
   :this.setState({
     time:(hours - 12) + ":" + minits + " Pm",
     beginInminits:beginMinits
   })
  }else if(hours === "00"){
    this.setState({
      time:"12:" + minits + " Am" ,
      beginInminits:beginMinits
    })
  }else{
    this.setState({
     time:hours + ":" + minits + " Am" ,
     beginInminits:beginMinits
   })
  }
  this.duration(endinMinits , beginMinits) 

} 
// function 2
etimePicker = (data) =>{
  const etime = data.target.value
  const hours = etime.slice(0, 2)
  const minits = etime.slice(3)
  const endtime = hours *60 + parseInt(minits ,10)
  const begintime = this.state.beginInminits
  this.setState({
    realend:etime,
    endInminits:endtime
    })
   if(hours > 11){
  hours === "12" ? 
  this.setState({
    endtime: hours + ":" + minits + " Pm"
  })
  :this.setState({
    endtime:(hours - 12) + ":" + minits + " Pm"
    
  })
  }else if(hours === "00"){
    this.setState({
      endtime: "12:" + minits + " Am" 
      
    })
  }else{
    this.setState({
      endtime:hours + ":" + minits + " Am" 
      
    })
    
  }
  
  this.duration(endtime , begintime)
   
  }
 


//main function
duration =(dur, duri) =>{
  
    const endi = dur
    const begin = duri   
   console.log(duri +","+ dur)

      const sum = endi - begin   
      let result;
      //Math.sign(h) === -1 ? this.error("please Put A logiacl time"):this.setState({duration: nh + ':' + nm })
      //PM AM
      if (begin>=720 && endi<=720)
      {
        result=dur-(duri-1440);
      }
      else
      {
        if (sum<0)
        {
          result=0;
          this.error("please Put A logiacl time");
        }
        else
        {
          result=sum;
        }
      }
      const h = Math.floor(result / 60);
      const m = result % 60;
      const nh = h < 10 ? '0' + h : h;
      const nm = m < 10 ? '0' + m : m;
      this.setState({
        duration: nh + ':' + nm,
        total: result
      });
 
}

   

  // const begintime = this.state.time
  //  const endtime = endi
  //  const total = begintime - endtime
  //  const finaltotal = Math.abs(total)
  //  const totalend = parseInt(finaltotal, 16)
  
  //  isNaN(totalend) || finaltotal === 0 ? this.setState({
  //    duration: ''
  //  }):
  //  finaltotal > 1 ? 
  //  this.setState({
  //    duration: finaltotal + " Hours"
  //  }):this.setState({
  //    duration: finaltotal + " Hour"
  //  })



 

  render() {

    return (

      <Fragment>

       
                {
   this.state.notifi &&
   <div id="message" className="alert alert-success">
   <p className="text-center">{this.state.notifi}</p>
   </div>

 }
 {
    this.state.error &&
    <div id="message" className="alert alert-danger">
    <p className="text-center">{this.state.error}</p>
    </div>
 }
        <center>
          <div id="section">
          <h1 className="my-5">Time Sheet</h1>
          <div className="container-fluid">

          <div className="row">
          {/* TASK */}
          <div className="col-md-2">
          <label htmlFor="Task"> Task </label>
          <input id="Task"  
          value ={this.state.data} 
          onChange={this.handleChange}
          type="text" 
          className="form-control" 
          placeholder="Task" />
          </div>
            {/* Company */}
          <div className="col-md-2">
          <label htmlFor="company"> Type</label>
          <select 
          id="company" 
          className="form-control"
          value={this.state.type}
          onChange={this.selectChange}
          >
         <option  defaultValue > Task Type </option>
          <option value="Task">Task</option>
          <option value="Design">Design</option>
            </select></div>
          {/* date begins */}
          <div className="col-md-2">
{
  !this.state.chaa ? <input type="time" class="form-control mtt" defaultValue={this.state.time} onChange={this.btimePicker}/> :  <input type="time" class="form-control mtt" value={this.state.time} onChange={this.btimePicker}/>

}
     

      </div>
          {/* === */}
           {/* date ends */}
           <div className="col-md-2">
           {
  !this.state.chaa ? <input type="time" class="form-control mtt" defaultValue={this.state.endtime} onChange={this.etimePicker}/> :  <input type="time" class="form-control mtt" value={this.state.endtime} onChange={this.etimePicker}/>

}
 

      </div>
          {/* === */}
          {/* Duration */}
          
            <div className="col-md-2">
          <label htmlFor="begin">Duration</label>
          <input  className="form-control text-center" type="text" value={this.state.duration} disabled/>
          </div>
          
         
          <div className="col-md-2">
          {

          !this.state.editing ? <button
           className="btn btn-danger"
           onClick={()=>this.changeState()}
           >Add Task </button> : <button
           className="btn btn-success"
           onClick={()=>this.editTodo()}
           >update </button>
          }
          </div>
           </div>
          </div>
          </div>
          {
            this.state.loading &&
            <img id="loader" src={loading} alt=""/>
          }
          {
            !this.state.loading &&
            !this.state.editing &&
            <div>
          <div className="container mt-5 mb-3">
     
                  <div className="card my-1">
                  <div className="row">
                  <div className="col-md-2"><h6 className="mt-1">Task</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Type</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Begins at</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Ended at</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Duration</h6></div>
                  <div className="col-md-2"><h6 className="mt-1">Delete</h6></div>
                  </div>
                  </div>
 
          </div>
          <div className="container">
          
          {
               this.state.tasks.map((item)=> {
                return (
                  <div  key={item.id} className="card my-1">
                  <div className="row">
                  <div className="col-md-2"><h5 className="mt-1">{item.data}</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.type}</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.time}</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.endtime}</h5></div>
                  <div className="col-md-2"><h5 className="mt-1">{item.duration}</h5></div>
                  <div className="col-md-2"><button 
                  onClick={()=>this.deleteData(item.id)} 
                  className="btn btn-outline-danger m-0 ml-1">x</button>
                  <button 
                  onClick={()=>this.updateData(item.id)}
                  className="btn btn-outline-primary m-0 ml-1">U</button>
                  </div>
                  </div>
                  </div>
                );
               }
              )


          }
         
          </div>
          </div>
          }

        </center>
        <div className="card text-center">
        <p className="mt-2">Total Working Hours | <TwH tasks={this.state.tasks}/></p>
        </div>
      </Fragment>
    )
  }
}
