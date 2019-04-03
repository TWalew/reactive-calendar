import React from "react";

export default class Footer extends React.Component {
    render() {
        const currYear = new Date().getFullYear();
        const centered = {
            textAlign: 'center',
        };
        return (
            <footer style={centered}>&copy; Copyright {currYear} Toni Valev</footer>
        )
    }
}