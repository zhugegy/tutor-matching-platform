import React, {Component} from 'react'
import {Col, Container, Row, Card, Button} from "react-bootstrap";
let dialogStyle ={
    width:'500px',
    maxWidth:'100%',
    margin:'0 auto',
    position:'fixed',
    left:'50%',
    top:'50%',
    transform:'translate(-50%,-50%)',
    zIndex:'999',
    backgroundColor:'#eee',
    padding:'10px 20px 40px',
    borderRadius:'8px',
    flexDirection:'column'
};
let dialogCloseButtonStyles={
    marginBottom:'15px',
    padding:'3px 8px',
    cursor:'pointer',
    borderRadius:'50%',
    border:'none',
    width:'30px',
    height:'30px',
    fontWeight:'bold',
    alignSelf:'flex-end'
};

export default class Dialog extends Component{
    constructor(props){
        super(props)
        this.state={
            items:"0",
            click:true
        }
    }



    getValue=(e)=>{
        this.setState({
            items:e.target.value
        })

    }


    handleBook=event=>{
        event=event.nativeEvent;
        var b=event.id;
        const tr=event.target.parentNode;
        var a= "a"
        // var b=document.getElementById("book").value
        var isAutoSend = document.getElementsByName("group");


        var c="a"
        for (var i=0; i<isAutoSend.length; i++){
            if(isAutoSend[i].checked == true){

                c= isAutoSend[i].value
                isAutoSend[i].disabled= true;

            }
        }

        var button = this.state.items;
        // document.getElementById(button).disabled=true;
        console.log("c" + c)

        const formData ={
            "funID": "userSelectATimePoint",
            "paramNum" :2,
            "param1":tr.id,
            "param2":c
        }

        fetch(
            '/getData',{
                method:'POST',
                credentials: 'include',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Access-Token': sessionStorage.getItem('access_token') || ''
                },
            }
        )
            .then(res => res.json())
            .then((data) => {
                alert("You have successfully submitted your appointment request")


            })
            .catch(e => console.log('error in Tutor Application:', e))

    }



    render(){
        const data = this.props.data;
        console.log(data)
        let dialog = (


            <div style={dialogStyle}>
                <button style={dialogCloseButtonStyles} onClick={this.props.onClose}>x</button>



                <h3>Available Time</h3>
                <div>

                    {
                        this.props.data.time.map((ele,index)=>{

                            return(
                                <div key={index}>
                                        <input type="radio" name="group" value={ele._id}
                                           onChange={(e)=>this.getValue(e)}/>
                                    &nbsp;
                                        <span>Time: {ele.startTime}</span>
                                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span>Venue: {ele.location}</span>

                                </div>
                            )
                        })


                     }
                </div>
                <br/>
                <div id={this.props.data.pass}>
                    {console.log("============== " + this.props.data.pass)}
                    <Button name="book" id="but" value={this.props.data.pass} onClick={this.handleBook} variant="warning">Book</Button>
                </div>

            </div>

        );
        if(!this.props.isOpen){
            dialog = null;
        }
        return (
            <div>
                {dialog}
            </div>

        );
    }
}
