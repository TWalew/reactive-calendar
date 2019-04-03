import LoginStore from "../stores/LoginStore";
import React from "react";
import PropTypes from 'prop-types';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import '../css/Header.scss';

const loginButton = {
    fontSize: '16px',
    margin: '5px',
};

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    scrollContainer: {
        height: 400,
        overflow: 'auto',
        marginBottom: theme.spacing.unit * 3,
    },
    scroll: {
        position: 'relative',
        width: '230%',
        backgroundColor: theme.palette.background.paper,
        height: '230%',
    },
    legend: {
        marginTop: theme.spacing.unit * 2,
        maxWidth: 300,
    },
    paper: {
        maxWidth: 400,
        overflow: 'auto',
    },
    select: {
        width: 200,
    },
    popper: {
        zIndex: 1,
        '&[x-placement*="bottom"] $arrow': {
            top: 0,
            left: 0,
            marginTop: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '0 1em 1em 1em',
                borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
            },
        },
        '&[x-placement*="top"] $arrow': {
            bottom: 0,
            left: 0,
            marginBottom: '-0.9em',
            width: '3em',
            height: '1em',
            '&::before': {
                borderWidth: '1em 1em 0 1em',
                borderColor: `${theme.palette.common.white} transparent transparent transparent`,
            },
        },
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
            },
        },
        '&[x-placement*="left"] $arrow': {
            right: 0,
            marginRight: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 0 1em 1em',
                borderColor: `transparent transparent transparent ${theme.palette.common.white}`,
            },
        },
    },
    arrow: {
        position: 'absolute',
        fontSize: 7,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
    },
});

class Header extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedInUser: null,
            arrow: true,
            arrowRef: null,
            disablePortal: true,
            flip: true,
            open: false,
            placement: 'bottom',
            preventOverflow: 'scrollParent',
        };
        this.loginStoreChanged = this.loginStoreChanged.bind(this);
        this.handleClickButton = this.handleClickButton.bind(this);
        this.handleArrowRef = this.handleArrowRef.bind(this);
        this.handleChange = this.handleChange.bind(this);
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

        this.setState({
            loggedInUser,
        });
    }

    handleChange = key => (event, value) => {
        this.setState({
            [key]: value,
        });
    };

    handleClickButton = () => {
        this.setState(state => ({
            open: !state.open,
        }));
    };

    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const {classes} = this.props;
        const {open, placement, disablePortal, flip, preventOverflow, arrow, arrowRef} = this.state;

        const code = `
<Popper
  placement="${placement}"
  disablePortal={${disablePortal}}
  modifiers={{
    flip: {
      enabled: ${flip},
    },
    preventOverflow: {
      enabled: ${preventOverflow !== 'disabled'},
      boundariesElement: '${preventOverflow === 'disabled' ? 'scrollParent' : preventOverflow}',
    },
    arrow: {
      enabled: ${arrow},
      element: arrowRef,
    },
  }}
>
`;
        const id = open ? 'scroll-playground' : null;
        let {loggedInUser} = this.state;
        return (
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        Holiday Portal
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <Navbar.Text>
                            {loggedInUser && loggedInUser.name}
                        </Navbar.Text>
                    </Nav>
                    {loggedInUser ? (
                        <Nav className='legend'>
                            <Button
                                color="primary"
                                style={loginButton}
                                buttonRef={node => {
                                    this.anchorEl = node;
                                }}
                                onClick={this.handleClickButton}
                                aria-describedby={id}
                            >
                                Legend
                            </Button>
                            <Popper
                                id={id}
                                open={open}
                                anchorEl={this.anchorEl}
                                placement={placement}
                                disablePortal={disablePortal}
                                className={classes.popper + ' legend-paper'}
                                modifiers={{
                                    flip: {
                                        enabled: flip,
                                    },
                                    arrow: {
                                        enabled: arrow,
                                        element: arrowRef,
                                    },
                                    preventOverflow: {
                                        enabled: preventOverflow !== 'disabled',
                                        boundariesElement:
                                            preventOverflow === 'disabled' ? 'scrollParent' : preventOverflow,
                                    },
                                }}
                            >
                                {arrow ? <span className={classes.arrow} ref={this.handleArrowRef}/> : null}
                                <Paper className={classes.paper}>
                                    <DialogContent>
                                        <div>
                                            <h2 className='text-center'>Legend</h2>
                                            <div className='text-center'>
                                                <label>
                                                    Holiday :
                                                    <div className='legend-holiday'></div>
                                                </label>
                                                <label>
                                                    Remote :
                                                    <div className='legend-remote'></div>
                                                </label>
                                            </div>
                                            <div className='text-center'>
                                                <label>
                                                    Sick :
                                                    <div className='legend-sick'></div>
                                                </label>
                                                <label>
                                                    Unpaid :
                                                    <div className='legend-unpaid'></div>
                                                </label>
                                            </div>
                                        </div>
                                    </DialogContent>
                                </Paper>
                            </Popper>
                        </Nav>) : null}
                    <Nav pullRight>
                        {loggedInUser ? (
                            <Button variant="text" color="secondary" style={loginButton} onClick={this.props.onClick}>
                                Log Out
                            </Button>) : null}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
