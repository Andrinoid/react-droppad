import React, { Component } from 'react';
import {simpleMimeType} from '../../utils'

export default class  extends Component {
    render() {
        const mimeType = simpleMimeType(this.props.label)
        return (
            <svg width="39px" height="50px" viewBox="0 0 39 50">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g fill="#C6C6C6">
                        <g id="document">
                            <path d="M26.8967234,0 L0,0 L0,50 L39,50 L39,12.155 L26.8967234,0 Z M27.3829787,2.845 L36.1671064,11.6666667 L27.3829787,11.6666667 L27.3829787,2.845 Z M1.65957447,48.3333333 L1.65957447,1.66666667 L25.7234043,1.66666667 L25.7234043,13.3333333 L37.3404255,13.3333333 L37.3404255,48.3333333 L1.65957447,48.3333333 Z" id="Shape" fillRule="nonzero"></path>
                            <text fontFamily="Roboto-Bold, Roboto" fontSize="12" fontWeight="bold" x="20" y="32" textAnchor="middle">
                                {mimeType}
                            </text>
                        </g>
                    </g>
                </g>
            </svg>
        );
    }
}