import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

class RegisterScreen extends Component{
    render(){
        return(
            <div class="container">
                <form name="form" class="form-auth">
                    <h2>Register</h2>
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" placeholder="Username" class="form-control"/>
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" placeholder="Password" class="form-control"/>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">Register</button>
                    </div><br/>
                    <div>
                    <div class="d-flex links">
                        Already have an account?&nbsp;&nbsp;<Link to="/login">Sign-in</Link>
                    </div>
			    </div>
                </form>
            </div>
        );
    }
}

export default RegisterScreen;