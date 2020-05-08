import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import AuthContext from '../context/auth-control';

class LoginScreen extends Component{
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
    }

    static contextType = AuthContext;

    handleSubmit = (event) => {
        event.preventDefault();
        const user = this.username.current.value;
        const pwd = this.password.current.value;

        if(user.trim().length === 0 || pwd.trim().length === 0){
            return; //notify user later
        }

        const reqBody = {
            query: `
                query {
                    login(username: "${user}", password: "${pwd}") {
                        _id
                        token
                        tokenExpiration
                    }
                }
            `
        };

        fetch('http://localhost:3000/graphql', {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Login Failed!');
            }
            return res.json();
        })
        .then(resData => {
            if(resData.data.login.token){
                this.context.login(resData.data.login.token, 
                    resData.data.login._id, 
                    resData.data.login.tokenExpiration)
            }
        })
        .catch(err => {
            console.log(err);
        });

    }


    render(){
        return(
            <div className="container">
                <form name="form" className="form-auth"  onSubmit={this.handleSubmit} >
                    <h2>Login</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Username" id="username" className="form-control" ref={this.username} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" id="password" className="form-control"  ref={this.password} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div><br/>
                    <div>
                    <div className="d-flex links">
                        Don't have an account?&nbsp;&nbsp;<Link to="/register">Sign Up</Link>
                    </div>
                    <div className="d-flex">
                        <a href="#">Forgot your password?</a>
                    </div>
			    </div>
                </form>
            </div>
        );
    }
}

export default LoginScreen;