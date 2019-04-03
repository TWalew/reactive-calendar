import dispatcher from '../dispatchers/Dispatcher';
import {LogIn, LogOut, UnLogged} from "./ActionCreators";
import AuthenticationService from "../services/AuthenticationService";

export function LoginAuth(username) {
    AuthenticationService.Login(username).then(response => {
        if (response) {
            dispatcher.dispatch(LogIn(response));
        }
    });
}

export function LogOutAuth() {
    AuthenticationService.Logout().then(response => {
        if (response) {
            dispatcher.dispatch(LogOut(response[0]));
        }
    })
}

export function UnLoggedAuth() {
    dispatcher.dispatch(UnLogged())
}