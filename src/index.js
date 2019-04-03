import React from 'react';
import ReactDOM from "react-dom";
import moment from 'moment'
import LoginForm from './pages/loginForm';
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Redirects from "./components/Redirects";
import * as AuthenticationActions from "./actions/AuthenticationActions";
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import 'bootstrap/dist/css/bootstrap.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'

library.add(faArrowLeft, faArrowRight);


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            toHome: false,
            date: moment().startOf('year')
        };
        this.logOutClicked = this.logOutClicked.bind(this);
    }

    logOutClicked(){
        AuthenticationActions.LogOutAuth();
    }

    render() {
        return (
            <div>
                {/*<Header onClick={this.logOutClicked}/>*/}
                <br/>
                {this.props.children}
                <br/>
                <Footer/>
            </div>
        )
    }
}


const root = document.getElementById('root');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={LoginForm} />

            <Route component={Redirects}>
                <Route path="/Home" component={Home} />
            </Route>
        </Route>
    </Router>,
    root);
