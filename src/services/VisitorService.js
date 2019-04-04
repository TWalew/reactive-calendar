export default class VisitorService {
    static RequestEvent(event) {
        let retrievedObject = JSON.parse(localStorage.getItem(event.username));
        retrievedObject.events.push({
          title: event.title,
          descr: event.descr,
          day: event.day
        });
        localStorage.setItem(event.username, JSON.stringify(retrievedObject));
        return (
            Promise.resolve(retrievedObject)
                .then(event => event)
        );
    }
    static DeleteEvent(event) {
        let retrievedObject = JSON.parse(localStorage.getItem(event.username));
        console.log(retrievedObject);
        localStorage.setItem(event.username, JSON.stringify(retrievedObject));
        return (
            Promise.resolve(retrievedObject)
                .then(event => event)
        );
    }
}