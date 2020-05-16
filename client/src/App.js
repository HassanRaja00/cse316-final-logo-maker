import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { Redirect, BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';

// THESE ARE OUR REACT SCREENS, WHICH WE WILL ROUTE HERE
import HomeScreen from './components/HomeScreen';
import EditLogoScreen from './components/EditLogoScreen';
import CreateLogoScreen from './components/CreateLogoScreen';
import ViewLogoScreen from './components/ViewLogoScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import AuthContext from './context/auth-control';
import Navbar from './components/Navbar';


class App extends Component {
    constructor(props){
        super(props);
        this.httpLink = new HttpLink({ uri: 'http://localhost:3000/graphql' });
        this.authLink = new ApolloLink((operation, forward) => {
            // get token from state
            operation.setContext({
                headers: {
                    authorization: this.state.token ? `Bearer ${this.state.token}` : ''
                }
            });

            return forward(operation);
        });

        this.client = new ApolloClient({ 
            link: this.authLink.concat(this.httpLink),
            cache: new InMemoryCache({
                addTypename: false
            })
        });

    }
    state = {
        token: null,
        userId: null
    };

    login = (token, userId, tokenExpiration) => {
        this.setState({ token: token, userId: userId });
        console.log('logged in!');
    }
    
    logout = () => {
        this.setState({ token: null, userId: null });
        console.log('logged out!');
    }
    
    render(){
        return <ApolloProvider client={this.client}>
            <Router>
                <AuthContext.Provider value={{
                     token: this.state.token,
                     userId: this.state.userId, 
                     login: this.login,
                     logout: this.logout
                     }}>
                <Navbar />
                <div>
                    {!this.state.token && <Redirect to='/login'/>}
                    {this.state.token && <Redirect to='/'/>}
                    {this.state.token && <Route exact path='/' component={HomeScreen} />}
                    <Route path='/edit/:id' component={EditLogoScreen} />
                    {this.state.token && <Route path='/create' component={CreateLogoScreen} />}
                    {!this.state.token && <Route path='/register' component={RegisterScreen} />}
                    {!this.state.token && <Route path='/login' component={LoginScreen} />}
                </div>
                </AuthContext.Provider>
            </Router>
        </ApolloProvider>
    }
}

export default App;