import React from 'react';
import PropTypes from 'prop-types';

export default class Ensure extends React.Component {
    constructor(props){
        super(props);
        this.ensure = this.ensure.bind(this);
    }

    // componentDidMount() {
    //     //this.ensure(this.props);
    // }

    componentWillReceiveProps(nextProps) {
        this.ensure(nextProps);
    }

    ensure (props) {
        if(!props.visible) {
            props.ensureAction && props.ensureAction();
        }
    }

    render () {
        return (
            <React.Fragment>
                {
                    this.props.visible ? this.props.children : null
                }
            </React.Fragment>
        )
    }
}

Ensure.propTypes = {
    visible: PropTypes.bool.isRequired,
    ensureAction: PropTypes.func,
};