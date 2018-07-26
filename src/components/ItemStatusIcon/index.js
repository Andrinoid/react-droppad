import React, { Component } from 'react'
import Xmark from '../icons/Xmark'
import Vmark from '../icons/Vmark'
import './itemStatusIcon.css'

export default class ItemStatusIcon extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="statusIconWrapper">
                <span className={`animated ${this.props.complete && 'rotateOut'}`}><Xmark /></span>
                {this.props.complete && <span className="animated rotateIn"><Vmark /></span>}
            </div>
        );
    }
}

ItemStatusIcon.defaultProps = {
    complete: false
};