import React, { Component } from 'react'
import imageIcon from '../../icons/imageIcon.svg'
import './fileItem.css'

export default class FileItem extends Component {
    render() {
        console.log(this.props.file)
        return (
            <div className="fileItem">
                <div className="icon">
                    <img src={imageIcon} alt="file" />
                </div>
                <div className="info">
                    <p className="filename">Filename.file</p>
                    <p className="status">Uploading</p>
                    <div className="progress"></div>
                </div>
            </div>
        );
    }
}