import {browserHistory} from 'react-router'
import {EventEmitter} from 'events';
import dispatcher from '../dispatchers/Dispatcher'
import {getLoginStoreToken} from "./LoginStore";

const ACT_LOGIN = 'LOGIN';
const ACT_LOGOUT = 'LOGOUT';
const ACT_UNLOGGED = 'UNLOGGED';

class LocationStore extends EventEmitter {
    constructor() {
        super();

        this._actionMap = {
            [ACT_LOGIN]: this._locLogin.bind(this),
            [ACT_LOGOUT]: this._locLogout.bind(this),
            [ACT_UNLOGGED]: this._locUnlogged.bind(this)
        };
    }

    _locLogin() {
        dispatcher.waitFor([getLoginStoreToken()]);
        browserHistory.push({
            pathname: "/Home"
        });
        this.emit('change');
    }

    _locLogout() {
        browserHistory.push('/');
        this.emit('change');
    }

    _locUnlogged() {
        browserHistory.push('/');
        this.emit('change');
    }

    handleActions(action) {
        this._actionMap[action.type] && this._actionMap[action.type]()
    }
}

const locationStore = new LocationStore();
const LocationStoreToken = dispatcher.register(locationStore.handleActions.bind(locationStore));

const getLocationStoreToken = () => LocationStoreToken;

export {getLocationStoreToken};
export default locationStore;