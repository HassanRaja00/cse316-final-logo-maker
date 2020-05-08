import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AuthContext from '../context/auth-control';

class RegisterScreen extends Component{
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
    }
    static contextType = AuthContext;

    handleSubmit = (event) =>{
        event.preventDefault();
        const user = this.username.current.value;
        const pwd = this.password.current.value;

        if(user.trim().length === 0 || pwd.trim().length === 0){
            return; //notify user later
        }

        const reqBody = {
            query: `
                mutation {
                    addUser(username: "${user}", password: "${pwd}") {
                        _id
                        username
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
                throw new Error('Register Failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
        this.props.history.push('/login')
        
        

           
    }

    render(){
        return(
            <div className="container">
                <form name="form" className="form-auth" onSubmit={this.handleSubmit} >
                    <h2>Register</h2>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text"id="username" placeholder="Username" className="form-control" ref={this.username}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" placeholder="Password" className="form-control"  ref={this.password} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div><br/>
                    <div>
                    <div className="d-flex links">
                        Already have an account?&nbsp;&nbsp;<Link to="/login">Sign-in</Link>
                    </div>
			    </div>
                </form>
            </div>
        );
    }
}

export default RegisterScreen;