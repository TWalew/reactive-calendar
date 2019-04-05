import {forEach} from "react-bootstrap/es/utils/ElementChildren";

export default class VisitorService {
    static RequestEvent(event) {
        let participantsArr = event.participants.split(',');
        console.log('partARRR ',participantsArr);
        let retrievedObject = JSON.parse(localStorage.getItem(event.username));
        retrievedObject.events.push({
            title: event.title,
            descr: event.descr,
            participants: participantsArr,
            day: event.day
        });
        if (participantsArr !== []){
            participantsArr.forEach(function (el) {
                alert(JSON.parse(localStorage.getItem(el)));
                if (JSON.parse(localStorage.getItem(el)) !== {}){
                    let retrievedParticipantObject = JSON.parse(localStorage.getItem(el));
                    retrievedParticipantObject.events.push({
                        title: event.title,
                        descr: event.descr,
                        participants: participantsArr,
                        day: event.day
                    });
                    localStorage.setItem(el, JSON.stringify(retrievedParticipantObject));
                }else{
                    let newEventForParticipant = {
                        username: el,
                        events : [{
                            title: event.title,
                            descr: event.descr,
                            participants: participantsArr,
                            day: event.day
                        }]
                    };
                    localStorage.setItem(el, JSON.stringify(newEventForParticipant));
                }
            })
        }
        localStorage.setItem(event.username, JSON.stringify(retrievedObject));
        return (
            Promise.resolve(retrievedObject)
                .then(event => event)
        );
    }

    static DeleteEvent(username, event) {
        let retrievedObject = JSON.parse(localStorage.getItem(username));
        retrievedObject.events = retrievedObject.events.filter(el => el.day !== event.day);
        localStorage.setItem(username, JSON.stringify(retrievedObject));
        return (
            Promise.resolve(retrievedObject)
                .then(event => event)
        );
    }
}