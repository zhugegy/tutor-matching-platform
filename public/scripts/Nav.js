import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from "react-bootstrap";



export default class DefaultNav extends React.Component{

    constructor(){
        super()
        this.state={
            titleList:[
            {name:'', link:''}
        ],
        }

    }
    UNSAFE_componentWillMount(){
        const formData ={
            "funID": "getUserPrivileges",
            "paramNum": 0
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
                this.setState({
                    titleList:data
                });
            })
            .catch(e => console.log('error in Nav:', e))

    }

    render(){

        return(
            <Navbar bg="light" variant="light">
                <Navbar.Brand>USER CENTER</Navbar.Brand>
                <Nav className="mr-auto">
                {this.state.titleList.map((item, key)=>{
                    return <Link to={item.link} className="nav-link" key={key}>
                        <li>{item.name}</li>
                        </Link>
                })}
                </Nav>
            </Navbar>
        )
    }
}


