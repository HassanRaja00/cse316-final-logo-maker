import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

class LoginScreen extends Component{
    render(){
        return(
            <div class="container">
                <form name="form" class="form-auth">
                    <h2>Login</h2>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Username" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" class="form-control"/>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div><br/>
                    <div>
                    <div class="d-flex links">
                        Don't have an account?&nbsp;&nbsp;<Link to="/register">Sign Up</Link>
                    </div>
                    <div class="d-flex">
                        <a href="#">Forgot your password?</a>
                    </div>
			    </div>
                </form>
            </div>
        );
    }
}

export default LoginScreen;