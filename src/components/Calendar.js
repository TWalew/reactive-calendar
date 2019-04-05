import React from 'react'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Modal} from "react-bootstrap";
import DatePicker from 'react-date-picker'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoginStore from "../stores/LoginStore";
import '../css/Calendar.scss';
import * as VisitorActions from "../actions/VisitorActions";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedInUser: null,
            showModalBook: false,
            showModalDelete: false,
            titleValue: '',
            descrValue: '',
            participantsValue: '',
            searchString: '',
            days: [],
            eventS: [],
            modalDeleteEvent: {},
            currentDate: moment(new Date()),
            startDate: moment(new Date(new Date().getFullYear(), new Date().getMonth(), -4)),
            stopDate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)),
            datePickerDate: new Date(),
        };

        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.monthPagination = this.monthPagination.bind(this);
        this.handleModalBookShow = this.handleModalBookShow.bind(this);
        this.handleModalDeleteShow = this.handleModalDeleteShow.bind(this);
        this.handleModalBookClose = this.handleModalBookClose.bind(this);
        this.handleModalDeleteClose = this.handleModalDeleteClose.bind(this);
        this.handleModalBookSubmit = this.handleModalBookSubmit.bind(this);
        this.handleModalDeleteSubmit = this.handleModalDeleteSubmit.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._filterItems = this._filterItems.bind(this);
    }

    componentDidMount() {
        LoginStore.on("change", this.loginStoreChanged);
        this.loginStoreChanged();
    }

    componentWillUnmount() {
        LoginStore.removeListener("change", this.loginStoreChanged);
    }

    loginStoreChanged() {
        let loggedInUser = LoginStore.getVisitor();
        console.log("loginStoreChanged", loggedInUser);
        this.setState({
            loggedInUser,
        });
    }

    getDaysInMonth() {
        let dateArray = [];
        let startDate = this.state.startDate;
        let stopDate = this.state.stopDate;
        while (startDate < stopDate) {
            dateArray.push({
                id: moment(startDate).get('date') + '/' + startDate.get('month') + 1,
                date: moment(startDate)._d,
                dayOfWeek: moment(startDate).format('dddd')
            });
            startDate = moment(startDate).add(1, 'days');
        }
        return dateArray;
    }

    monthPagination(direction) {
        this.setState({
            startDate: this.state.startDate.add(direction, 'month'),
            currentDate: this.state.currentDate.add(direction, 'month'),
            stopDate: this.state.stopDate.add(direction, 'month')
        });
    }

    handleModalBookClose() {
        this.setState({showModalBook: false});
    }

    handleModalDeleteClose() {
        this.setState({showModalDelete: false});
    }

    handleModalBookShow() {
        this.setState({showModalBook: true});
    }

    handleModalDeleteShow(event) {
        this.setState({showModalDelete: true, modalDeleteEvent: event});
    }

    handleModalBookSubmit(user, day, title, participants, descr) {
        console.log(user.username);
        console.log(day);
        console.log(title);
        console.log(descr);
        VisitorActions.RequestEvent(user.username, day, title, participants, descr);
        this.setState({
                showModalBook: false
            }
        );
    }

    handleModalDeleteSubmit(event) {
        let username = this.state.loggedInUser.username;
        VisitorActions.DeleteEvent(username, event);
        this.setState({
                showModalDelete: false
            }
        );
    }

    _filterItems(arr, query) {
        console.log(arr);
        if (query !== '') {
            return arr.filter(function (el) {
                return el.title.toLowerCase().indexOf(query.toLowerCase()) > -1;
            })
        }
    }

    _handleKeyPress = (event) => {
        let that = this;
        let RegExpression = /^[a-zA-Z\s]*$/;

        if (RegExpression.test(event.key) && event.key.length === 1) {
            that.state.searchString += event.key;
        } else if (event.key === 'Backspace') {
            that.state.searchString = that.state.searchString.slice(0, -1);
        }
        console.log('omg', this.state.loggedInUser.events);
        let results = this._filterItems(this.state.loggedInUser.events, this.state.searchString);
        console.log(results);
        this.setState({
            eventS: results
        });

        if (this.state.searchString === '') {
            this.setState({
                eventS: []
            });
        }
    };

    _findEvent(date) {
        let monthsBetween = (moment(date).get('month') + 1) - (moment(this.state.currentDate).get('month') + 1);
        alert(monthsBetween);
        this.monthPagination(monthsBetween);
    }

    ontValueChange = datePickerDate => this.setState({datePickerDate});

    updateTitleValue(evt) {
        this.setState({titleValue: evt.target.value});
    }

    updateDescrValue(evt) {
        this.setState({descrValue: evt.target.value});
    }

    updateParticipantsValue(evt){
        this.setState({participantsValue: evt.target.value});
    }

    render() {
        const days = this.getDaysInMonth();
        const events = LoginStore.getVisitor().events;
        console.log('events', events);
        const today = new Date;
        const searchEvents = this.state.eventS;
        return (
            <div className='calendar-wrapper'>
                <Modal show={this.state.showModalBook} onHide={this.handleModalBookClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">Book event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="row clearfix">
                                <div className="col-sm-6 form-group">
                                    <div className="clearfix">
                                        <div className="title">
                                            <TextField
                                                text
                                                label="Title"
                                                className='menu'
                                                onChange={evt => this.updateTitleValue(evt)}
                                                margin="normal"
                                            >
                                            </TextField>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 form-group">
                                    <div className="clearfix">
                                        <div className="date">
                                            <label htmlFor="date">Choose Date:</label>
                                            <DatePicker
                                                id='date'
                                                clearIcon={null}
                                                calendarIcon={null}
                                                onChange={this.ontValueChange}
                                                value={this.state.datePickerDate}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="clearfix">
                                        <div className="participants">
                                            <TextField
                                                id="participants"
                                                label="Participants"
                                                placeholder="Participants"
                                                onChange={evt => this.updateParticipantsValue(evt)}
                                                fullWidth
                                                margin="normal"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 form-group">
                                    <div className="clearfix">
                                        <div className="descr">
                                            <TextField
                                                id="desc"
                                                label="Details"
                                                placeholder="Description"
                                                onChange={evt => this.updateDescrValue(evt)}
                                                fullWidth
                                                margin="normal"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outlined" color="primary" size="large" className='pull-right'
                                onClick={this.handleModalBookSubmit.bind(this,
                                    this.state.loggedInUser,
                                    this.state.datePickerDate,
                                    this.state.titleValue,
                                    this.state.participantsValue,
                                    this.state.descrValue)}>Submit</Button>

                        <Button variant="outlined" color="secondary" size="large" className='pull-left'
                                onClick={this.handleModalBookClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.showModalDelete} onHide={this.handleModalDeleteClose}>
                    <Modal.Header closeButton>
                        <Modal.Title className="text-center">Delete event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h1 className='text-danger text-center'>Are you sure you want to delete this event?</h1>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outlined" color="primary" size="large" className='pull-right'
                                onClick={this.handleModalDeleteSubmit.bind(this, this.state.modalDeleteEvent)}>
                            Delete
                        </Button>

                        <Button variant="outlined" color="secondary" size="large" className='pull-left'
                                onClick={this.handleModalDeleteClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className='controls'>
                    <div className='controls-btn pull-left'>
                        <Button variant='contained' color='primary' onClick={this.handleModalBookShow}>Add new</Button>
                        <Button variant='contained' color='primary' onClick={() => {this.forceUpdate()}}>Refresh</Button>
                    </div>
                    <div className='controls-search pull-right'>
                        <FontAwesomeIcon icon="search"/>
                        <TextField
                            id="standard-search"
                            label="Search for event"
                            type="search"
                            className='search'
                            onKeyDown={this._handleKeyPress}
                        />
                        <ul className="auto-suggest">{
                            searchEvents.map((e) => {
                                return (
                                    <li key={e.title} className="suggestion-box" onClick={() => this._findEvent(e.day)}>
                                        <span>
                                            {e.title}
                                        </span>
                                    </li>
                                )
                            })
                        }</ul>
                    </div>
                </div>
                <div className='my-calendar'>
                    <div className='month-pagination'>
                        <a onClick={this.monthPagination.bind(this, -1)}>
                            <FontAwesomeIcon icon="arrow-left"/>
                        </a>
                        <span
                            className='text-center'>
                            {this.state.currentDate.format('MMMM')} {this.state.currentDate.get('year')}
                        </span>
                        <a onClick={this.monthPagination.bind(this, +1)}>
                            <FontAwesomeIcon icon="arrow-right"/>
                        </a>
                    </div>
                    <div className='calendar'>{
                        days.map((day) => {
                            return (
                                <div className={'calendar-day' + (
                                    moment(day.date).format('L') === moment(new Date()).format('L') ? ' today' : ''
                                ) + (events.map((event) => {
                                    if (moment(event.day).format('L') === moment(day.date).format('L')) {
                                        return ' event '
                                    } else {
                                        return " "
                                    }
                                }))} key={day.id}>
                                    <div className='date'>
                                        {day.dayOfWeek} {moment(day.date).format('D')}
                                        {
                                            moment(day.date).format('L') === moment(new Date()).format('L') ?
                                                <span class="today-span">today</span> : ''
                                        }
                                    </div>
                                    {events.map((event) => {
                                        if (moment(event.day).format('L') === moment(day.date).format('L')) {
                                            return (
                                                <div className='event-info'
                                                     onClick={() => this.handleModalDeleteShow(event)}>
                                                    <h4>{event.title}</h4>
                                                    <span>{event.descr}</span>
                                                </div>
                                            )
                                        }

                                    })}
                                </div>
                            )
                        })
                    }</div>
                </div>
            </div>
        )
    }
}