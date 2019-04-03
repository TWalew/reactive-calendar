import dispatcher from '../dispatchers/Dispatcher';
import {OnRequestEvent} from "./ActionCreators";
import VisitorService from "../services/VisitorService";

export function RequestEvent(userName, day, title, descr) {
    let data = {
        id: userName,
        day: day,
        title: title,
        descr: descr,
    };
    VisitorService.RequestEvent(data).then(response => {
        //if (response) {
        dispatcher.dispatch(OnRequestEvent(data));
        //}
    });
}