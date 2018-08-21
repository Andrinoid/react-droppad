import React, { Component } from 'react'
import Xmark from '../icons/Xmark'
import Vmark from '../icons/Vmark'
// import './itemStatusIcon.css'

const wrapperStyle = {
    width: '16px',
    height: '16px',
    position: 'relative',
    display: 'inline-block'
}

const spanStyle = {
    position: 'absolute',
    top: 0,
    left: 0
}


export default class ItemStatusIcon extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={wrapperStyle}>
                <span style={spanStyle} className={`droppad_animated ${this.props.complete && 'droppad_rotateOut'}`}><Xmark /></span>
                {this.props.complete && <span style={spanStyle} className="droppad_animated droppad_rotateIn"><Vmark /></span>}
            </div>
        );
    }
}

ItemStatusIcon.defaultProps = {
    complete: false
};