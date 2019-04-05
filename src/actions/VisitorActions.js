import dispatcher from '../dispatchers/Dispatcher';
import {OnDeleteEvent, OnRequestEvent} from "./ActionCreators";
import VisitorService from "../services/VisitorService";

export function RequestEvent(userName, day, title, participants, descr) {
    let data = {
        username: userName,
        day: day,
        title: title,
        participants: participants,
        descr: descr,
    };
    VisitorService.RequestEvent(data).then(response => {
        if (response) {
            dispatcher.dispatch(OnRequestEvent(data));
        }
    });
}

export function DeleteEvent(username, event) {
    VisitorService.DeleteEvent(username, event).then(response => {
        if (response) {
            dispatcher.dispatch(OnDeleteEvent(username, event));
        }
    });
}