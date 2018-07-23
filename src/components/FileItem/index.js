import React, { Component } from 'react'
import ItemStatusIcon from '../ItemStatusIcon'
import {noPropagation, range, foreach, attemptJson} from '../../utils'
import imageIcon from '../../icons/imageIcon.svg'
import './fileItem.css'

export default class FileItem extends Component {

    constructor(props) {
        super(props)

        this.state = {
            progress: 0,
            shouldAnimate: true,
            status: 'uploading'
        }
    }

    componentWillMount() {
        if(!this.props.file.uploaded) {
            this.upload(this.props.file)
        } else {
            this.setState({
                status: 'completed',
                shouldAnimate: false
            })
        }
    }

    validate(_file) {
	    let self = this;
	    let errors = [];
	    let tests = [
	        function size(file) {
	            const maxFilesize = self.props.maxFilesize * 1024 * 1024;
	            if (file.size > maxFilesize) {
	                errors.push(`File is ${self.formatBytes(file.size).human}. Thats larger than the maximum file size ${self.formatBytes(maxFilesize).human}`);
	            }
	        },
	        function type(file) {
	            const baseMimeType = file.type.split('/')[0];
	            const mimeType = file.type.split('/')[1];
	            let acceptedFiles = self.props.acceptedFiles.replace(/ /g, '').split(',');
	            // Check if mimeType is allowed
	            if (acceptedFiles.indexOf(mimeType) < 0) {
	                errors.push(`File type ${mimeType} is not allowed`);
	            }
	        }
	    ];

	    foreach(tests, (fn) => {
	        fn(_file);
	    });

	    return errors;
	}

    upload(file) {

	    const headers = {
	        'X-Requested-With': 'XMLHttpRequest',
	        'Accept': '*/*'
	    };

	    let formData = new FormData();

	    let errors = this.validate(file);
	    if (errors.length) {
	        foreach(errors, (err) => {
	            if (this.props.showErrors) {
	                console.log(err)//TODO show error shomehow
	            }
	        });
	        //TODO remove file if not allowed
	        //this.remove(document.querySelectorAll('.uid-' + file.uid));
	        return;
	    }
	    formData.append('file', file, file.name);

	    let xhr = new XMLHttpRequest();
	    //add tailing slash if doesn't exists
	    let url = this.props.url;
	    xhr.open('POST', url, true);
	    for (var key in headers) {
	        xhr.setRequestHeader(key, headers[key]);
	    }

	    xhr.onreadystatechange = (e) => {
	        if (xhr.readyState !== 4)
	            return;
	        var data = attemptJson(xhr.responseText);
	        if (xhr.status === 200) {
                this.setState({status: 'completed'})
                this.props.onSuccess()
	        } else {
	            //this.uploadError(data);
	            //TODO show this to the user
	        }
	    };

	    xhr.upload.addEventListener('progress', (e) => {
            console.log(e.loaded)
            this.setState({progress: (e.loaded / e.total * 100).toFixed()})
            // this.chunkTotal.totals[id] = e.total;
	        // this.chunkTotal.loads[id] = e.loaded;
	        
	    }, false);

	    xhr.send(formData);
    }

    render() {
        return (
            <div className={`fileItem animated ${this.state.shouldAnimate && 'fadeInUp'}`}>
                <div className="icon">
                    <img src={imageIcon} alt="file" />
                </div>
                <div className="info">
                    <div className="title-row">
                        <div><p className="filename">{this.props.file.name}</p></div>
                        <div className="icon"><ItemStatusIcon /></div>    
                    </div>
                    {this.state.status === 'uploading' && <p className="status">Uploading</p>}
                    {this.state.status === 'completed' && <p className={`status animated ${this.state.shouldAnimate && 'fadeInUp'}`}>Completed</p>}
                    <div className="progress" style={{width: this.state.progress + '%'}}></div>
                </div>
            </div>
        );
    }
}