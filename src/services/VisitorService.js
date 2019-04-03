export default class VisitorService {
    static RequestEvent(event) {
        return (
            Promise.resolve(event)
                .then(event => event)
        );
    }
}