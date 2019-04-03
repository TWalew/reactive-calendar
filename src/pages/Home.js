import React from 'react'
import Calendar from "../components/Calendar";

export default class Home extends React.Component {

    render() {
        return (
            <div className="container clearfix">
                <Calendar/>
            </div>
        );
    }
}