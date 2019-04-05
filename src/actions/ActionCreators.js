export function LogIn(visitors) {
    return {
        type: 'LOGIN',
        data: visitors
    }
}

export function LogOut() {
    return {
        type: 'LOGOUT',
        data: null
    }
}

export function UnLogged() {
    return {
        type: 'UNLOGGED',
        data: null
    }
}

export function OnRequestEvent(data) {
    return {
        type: 'REQUESTEVENT',
        data: data
    }
}

export function OnDeleteEvent(username, data) {
    return {
        type: 'DELETEEVENT',
        data: {
            username,
            data
        }
    }
}