import dispatcher from '../dispatchers/Dispatcher';
import {OnDeleteEvent, OnRequestEvent} from "./ActionCreators";
import VisitorService from "../services/VisitorService";

export function RequestEvent(userName, day, title, descr) {
    let data = {
        username: userName,
        day: day,
        title: title,
        descr: descr,
    };
    VisitorService.RequestEvent(data).then(response => {
        if (response) {
            dispatcher.dispatch(OnRequestEvent(data));
        }
    });
}

export function DeleteEvent(event) {
    VisitorService.RequestEvent(event).then(response => {
        if (response) {
            dispatcher.dispatch(OnDeleteEvent(event));
        }
    });
}