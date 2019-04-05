const data = {
    'users': [
        {
            id: 0,
            username: 'Toni',
            password: 'Valev',
            name: 'Toni Valev',
            role: 'user',
            team: 'Front End',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 1,
            username: 'Kiril',
            password: 'Dolashkov',
            name: 'Kiril Dolashkov',
            role: 'user',
            team: 'Front End',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 2,
            username: 'Peter',
            password: 'Chan',
            name: 'Peter Chan',
            role: 'user',
            team: 'Front End',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 3,
            username: 'Hristo',
            password: 'Kostov',
            name: 'Hristo Kostov',
            role: 'user',
            team: 'Back End',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 4,
            username: 'Petromir',
            password: 'Dzhunev',
            name: 'Petromir Dzhunev',
            role: 'user',
            team: 'Back End',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 5,
            username: 'Plamen',
            password: 'Kamenov',
            name: 'Plamen Kamenov',
            role: 'user',
            team: 'Back End',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 6,
            username: 'Georgi',
            password: 'Petrov',
            name: 'Georgi Petrov',
            role: 'user',
            team: 'Database',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 7,
            username: 'Dimitar',
            password: 'Stefanov',
            name: 'Dimitar Stefanov',
            role: 'user',
            team: 'Database',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 8,
            username: 'Datsko',
            password: 'Petrunov',
            name: 'Datsko Petrunov',
            role: 'user',
            team: 'Int',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 9,
            username: 'Vladimir',
            password: 'Angelov',
            name: 'Vladimir Angelov',
            role: 'user',
            team: 'QA',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 10,
            username: 'Silviya',
            password: 'Ivanova',
            name: 'Silviya Ivanova',
            role: 'user',
            team: 'QA',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 11,
            username: 'Veselin',
            password: 'Petrov',
            name: 'Veselin Petrov',
            role: 'user',
            team: 'QA',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 12,
            username: 'admin',
            password: 'admin',
            name: 'Petar Hadzhiev',
            role: 'admin',
            team: 'TL',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
        {
            id: 13,
            username: 'Leslie',
            password: 'Leahy',
            name: 'Leslie Leahy',
            role: 'admin',
            team: 'PO',
            remainingDays: 25,
            remoteDays: [],
            sickLeave: [],
            unpaidLeave: [],
            holidays: []
        },
    ]
};
export {data};

export default class AuthenticationService {
    static Login(username) {
        if (localStorage.getItem(username)) {
            let retrievedObject = localStorage.getItem(username);
            return (
                Promise.resolve(JSON.parse(retrievedObject))
                    .then(visitors => visitors)
            );
        } else {
            let visitor = {'username': username, 'events': []};
            localStorage.setItem(username, JSON.stringify(visitor));
            let retrievedObject = localStorage.getItem(username);
            return (
                Promise.resolve(JSON.parse(retrievedObject))
                    .then(visitors => visitors)
            );
        }
    }

    static Logout() {
        return (
            Promise.resolve().then(function () {
                return true;
            })
        )
    }
}