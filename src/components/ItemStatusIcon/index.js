import React, { Component } from 'react'
import xMark from '../../icons/x-mark.svg'
import vMark from '../../icons/v-mark.svg'

export default class ItemStatusIcon extends Component {
    render() {
        return (
            <div>
                <img src={xMark} width="15" alt="uploading" />
                <img src={vMark} width="15" alt="complete" />
            </div>
        );
    }
}