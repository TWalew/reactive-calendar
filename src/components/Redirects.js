import React from 'react';
import LoginStore from "../stores/LoginStore";
import Ensure from "./Ensure";
import * as AuthenticationActions from "../actions/AuthenticationActions";

export default class Redirects extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedInUser: null,
        };
        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.redirectToLogin = this.redirectToLogin.bind(this);
    }

    componentDidMount() {
        LoginStore.on("change", this.loginStoreChanged);
        this.loginStoreChanged();
    }

    componentWillUnmount() {
        LoginStore.removeListener("change", this.loginStoreChanged);
    }

    loginStoreChanged() {
        let loggedInUser = LoginStore.getVisitor();
        this.setState({
            loggedInUser,
        });
    }

    redirectToLogin() {
        AuthenticationActions.UnLoggedAuth();
    }

    render() {
        return (
            <Ensure
                visible={this.state.loggedInUser !== null}
                ensureAction={this.redirectToLogin}
            >
                { this.props.children }
            </Ensure>
        )
    }
}

