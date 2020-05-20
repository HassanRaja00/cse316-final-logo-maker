import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AuthContext from '../context/auth-control';


// just get the user's created logos instead of all of them 
const GET_USER = gql`
query getUser($id: String!) {
    getUser(id: $id) {
        username
        createdLogos{
            _id
            text{
                textString
            }
            lastUpdate
        }
    }
}
`

class HomeScreen extends Component {
    static contextType = AuthContext;

    makeTitle = (logo) => {
        let title = '';
        let text = logo.text;
        for(let str of text){
            title += str.textString + ' ';
        }
        if(title == ''){
            return "logo with no text";
        } else{
            return title;
        }
    }

    render() {
        return (
            
            <Query pollInterval={500} query={GET_USER} variables={{ id: this.context.userId}} >
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    let x = data.getUser.createdLogos.sort( (a, b) => {
                        return new Date(b.lastUpdate) - new Date(a.lastUpdate);
                    });
                    

                    return (
                        <div className="container row">
                            <div className="col s4">
                                <h2>Hello {data.getUser.username}!</h2>
                                <h3>Recent Work</h3>
                                {x.map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/edit/${logo._id}`}>{this.makeTitle(logo)}</Link>
                                    </div>
                                ))}
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    Gologolo<br />
                                    List Maker
                                </div>
                                <div>
                                    <Link id="add_logo_button" to="/create">Add Logo</Link>
                                </div>
                            </div>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
