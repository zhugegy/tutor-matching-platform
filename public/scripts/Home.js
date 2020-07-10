import React from 'react'
import Dialog from "./components/User_Component/Dialog";

export default class Home extends React.Component{
    constructor(){
        super()
        this.state={
            isOpen:false

        }


    }


    render(){
        return <div>
            <h1>Home</h1>
            <button onClick={(e) => this.setState({isOpen:true})}>Open Dialog</button>
            <Dialog isOpen={this.state.isOpen} onClose={(e=> this.setState({isOpen:false}))}>
                DDDDDDDDDDDD
            </Dialog>
        </div>
    }
}

