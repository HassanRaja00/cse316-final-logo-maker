import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../navbar.css';
import AuthContext from '../context/auth-control'

class Navbar extends Component{

    render() {
        return <AuthContext.Consumer> 
            {(context) => {
                return <div className="topnav">
                {context.token && <Link to='/'>Home</Link>}
                {/* {!context.token && <Link to='/login'>Login</Link>} */}
                {context.token && <a onClick={context.logout}>Logout</a>}
                {context.token && <a>User Id: {context.userId}</a>}
              </div>
            }}
        
      </AuthContext.Consumer>
        
    //     return <div id='main' class="container">
    //     <nav class="navbar-fluid navbar-default navbar-fixed-top">
    //         <div class="container">
    //             <a class="navbar-brand"> GoLogoLo </a>
    //             <p class="navbar-text"> Logo Maker</p>
    //             <p class="navbar-right navbar-text"><Link to='/login'>Login</Link> or <Link to='/register'>Register</Link></p>
    //             <p class="navbar-right navbar-text" ><a>Logout</a></p>
    //             <p class="navbar-right navbar-text" >Current user</p>
    //         </div>
    //     </nav>
    //     <div class="col-md-offset-2 col-md-8">
    //     </div>
    // </div>
    }

}

export default Navbar;