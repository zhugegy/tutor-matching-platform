import React from 'react'
import 'whatwg-fetch'
import { withRouter } from "react-router-dom";
import {Button} from "react-bootstrap";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userUnikey: '',
            userPassword: '',
            isLogin: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const formData ={
            "funID": "verifyUserPassword",
            "paramNum" :2,
            "param1":this.state.userUnikey,
            "param2":this.state.userPassword
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
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
                if (data) {
                    this.props.history.push('/homepage');

                } else {
                    alert('failed');
                }
            })
            .catch(e => console.log('error:', e))

    }

    render() {
            return (

                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="inputUnikey">Unikey</label>
                        <input type="email" className="form-control" id="inputUnikey"
                               placeholder="Unikey" value={this.state.userUnikey} onChange={this.handleChange} name="userUnikey"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPassword1">Password</label>
                        <input type="password" className="form-control" id="inputPassword1"
                               placeholder="Password" value={this.state.userPassword} onChange={this.handleChange} name="userPassword"/>
                    </div>
                    <div className="text-center pt-2">
                        <Button type="submit" variant="warning">LOGIN</Button>
                    </div>
                </form>

            )
    }
}

export default withRouter(LoginForm);