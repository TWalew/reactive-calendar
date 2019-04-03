import { EventEmitter } from 'events';
import dispatcher from '../dispatchers/Dispatcher'
import {getLocationStoreToken} from "./LocationStore";

const ACT_LOGIN = 'LOGIN';
const ACT_LOGOUT = 'LOGOUT';

class LoginStore extends EventEmitter {
    constructor(){
        super();

        this.data = {
          loggedIn: null,
        };

        this._actionMap = {
            [ACT_LOGIN]: this._login.bind(this),
            [ACT_LOGOUT]: this._logout.bind(this),
        };
    }

    getVisitor() {
        return this.data.loggedIn;
    }

    _login(actionData) {
        this.data.loggedIn = {...actionData};
        this.emit('change');
    }

    _logout(actionData) {
        dispatcher.waitFor([getLocationStoreToken()]);
        this.data.loggedIn = null;
        this.emit('change');
    }

    handleActions(action) {
        this._actionMap[action.type] && this._actionMap[action.type](action.data);
    }
}
const loginStore = new LoginStore();
const LoginStoreToken = dispatcher.register(loginStore.handleActions.bind(loginStore));
const getLoginStoreToken = () => LoginStoreToken;

export { getLoginStoreToken };
export default loginStore;