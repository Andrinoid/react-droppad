import React, { Component } from 'react'
import xMark from '../../icons/x-mark.svg'
import vMark from '../../icons/v-mark.svg'
import './itemStatusIcon.css'

export default class ItemStatusIcon extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="statusIconWrapper">
                <img src={xMark} width="15" alt="uploading" className={`animated ${this.props.complete && 'rotateOut'}`} />
                {this.props.complete && 
                    <img src={vMark} width="15" alt="complete" className="animated rotateIn" />
                }
            </div>
        );
    }
}

ItemStatusIcon.defaultProps = {
    complete: false
};