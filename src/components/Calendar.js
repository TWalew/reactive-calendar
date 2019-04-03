import React from 'react'
import moment from 'moment'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Modal} from "react-bootstrap";
import DatePicker from 'react-date-picker'
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LoginStore from "../stores/LoginStore";
import '../css/Calendar.scss'
import * as VisitorActions from "../actions/VisitorActions";

export default class Calendar extends React.Component{
    constructor(props){
        super(props);

        this.state={
            loggedInUser: null,
            days: [],
            showModal: false,
            titleValue: '',
            descrValue: '',
            currentDate: moment(new Date()),
            startDate: moment(new Date(new Date().getFullYear(), new Date().getMonth(), -4)),
            stopDate: moment(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1)),
            datePickerDate: new Date(),
        };

        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.getDaysInMonth = this.getDaysInMonth.bind(this);
        this.monthPagination = this.monthPagination.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
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
        console.log(loggedInUser);
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
                id: moment(startDate).get('date') +'/'+ startDate.get('month'),
                date: moment(startDate)._d,
                dayOfWeek: moment(startDate).format('dddd')
            });
            startDate = moment(startDate).add(1, 'days');
        }
        console.log(dateArray);
        return dateArray;
    }

    monthPagination(direction) {
        this.setState({
            startDate: this.state.startDate.add(direction, 'month'),
            currentDate: this.state.currentDate.add(direction, 'month'),
            stopDate: this.state.stopDate.add(direction, 'month')
        });
    }

    handleModalClose() {
        this.setState({showModal: false});
    }

    handleModalShow() {
        this.setState({
            showModal: true,
        });
    }

    updateTitleValue(evt) {
        this.setState({
            titleValue: evt.target.value
        });
    }

    updateDescrValue(evt) {
        this.setState({
            descrValue: evt.target.value
        });
    }

    handleModalSubmit() {
        //TODO REQUEST TO ACTIONS ANT THEN INSERT EVENT IN SERVICE
        //VisitorActions.RequestEvent();
        this.setState({
                showModal: false
            }
        );
    }

    ontValueChange = datePickerDate => this.setState({datePickerDate});

    render() {
        const days = this.getDaysInMonth();
        console.log(days);
        const today = new Date;
        return(
            <div className='calendar-wrapper'>
                <Modal show={this.state.showModal} onHide={this.handleModalClose}>
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
                                        <div className="descr">
                                            <TextField
                                                id="desc"
                                                label="Details text"
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
                                onClick={this.handleModalSubmit}>Submit</Button>

                        <Button variant="outlined" color="secondary" size="large" className='pull-left'
                                onClick={this.handleModalClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <div className='controls'>
                    <button onClick={this.handleModalShow}>Add new</button>
                    <button>Refresh</button>
                    <input type="text"/>
                </div>
                <div className='my-calendar'>
                    <div className='month-pagination'>
                        <a onClick={this.monthPagination.bind(this, -1)}>
                            <FontAwesomeIcon icon="arrow-left"/>
                        </a>
                        <span
                            className='text-center'>{this.state.currentDate.format('MMMM')} {this.state.currentDate.get('year')}</span>
                        <a onClick={this.monthPagination.bind(this, +1)}>
                            <FontAwesomeIcon icon="arrow-right"/>
                        </a>
                    </div>
                    <div className='calendar'>{
                        days.map((day) =>{
                            return(
                                <div className={'calendar-day' + (
                                        moment(day.date).format('L') === moment(new Date()).format('L') ? ' today': ''
                                )} key={day.id}>
                                    {day.dayOfWeek}, {moment(day.date).format('L')}
                                </div>
                            )
                        })
                    }</div>
                </div>
            </div>
        )
    }
}