import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import AuthContext from '../context/auth-control';

class RegisterScreen extends Component{
    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();

        this.state = {
            unfilled: false,
            error: false
        }
    }
    
    static contextType = AuthContext;


    handleSubmit = (event) =>{
        event.preventDefault();
        const user = this.username.current.value;
        const pwd = this.password.current.value;

        if(user.trim().length === 0 || pwd.trim().length === 0){
            this.setState( {unfilled: true} )
            return;
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
                this.setState( {error: true} );
                throw new Error('Register Failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            this.setState( {error: true} );
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
                        <label>E-mail</label>
                        <input type="email"id="username" placeholder="E-mail" className="form-control" ref={this.username}/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" id="password" placeholder="Password" className="form-control"  ref={this.password} />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div><br/>
                    {this.state.unfilled && <h6
                    style={{backgroundColor: '#f38484', color:'#870606', textAlign: 'center', padding: 5, borderRadius: 5}}
                    >Must enter both email and password</h6>}
                    {this.state.error && <h6
                    style={{backgroundColor: '#f38484', color:'#870606', textAlign: 'center', padding: 5, borderRadius: 5}}
                    >An error occured. Please try again</h6>}
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