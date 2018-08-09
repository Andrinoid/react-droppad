import React, { Component } from 'react'
import ItemStatusIcon from '../ItemStatusIcon'
import {foreach, attemptJson, formatBytes, injectStyle} from '../../utils'
import DynamicFileIcon from './DynamicFileIcon'
import fileItemStyle from './fileItemStyles'

export default class FileItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            progress: 0,
            shouldAnimate: true,
			status: 'uploading',
			errors: null
		}
		injectStyle(fileItemStyle, 'react-droppad-fileitem-styles')
    }

    componentWillMount() {
		console.log(this.props.file)
        if(!this.props.file.uploaded && !this.props.file.error) {
            this.upload(this.props.file)
        } else {
            this.setState({
                status: 'completed',
                shouldAnimate: false
            })
        }
	}
	
	removeFile(file) {
		//TODO remove file from list in parent component
	}

    validate(_file) {
	    let self = this;
	    let errors = [];
	    let tests = [
	        function size(file) {
	            const maxFilesize = self.props.maxFilesize * 1024 * 1024;
	            if (file.size > maxFilesize) {
	                errors.push(`File is ${formatBytes(file.size).human}. Thats larger than the maximum file size ${formatBytes(maxFilesize).human}`);
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
			},
			function hasError(file) {
				if(file.error) {
					errors.push(file.error)
				}
			}
	    ];

	    foreach(tests, (fn) => {
	        fn(_file);
	    });

	    return errors;
	}

    upload(file) {
		console.log(file)
	    const headers = {
	        'X-Requested-With': 'XMLHttpRequest',
			'Accept': '*/*',
			...this.props.headers
		};

	    let formData = new FormData();

	    let errors = this.validate(file);
	    if (errors.length) {
			this.setState({
				status: 'error',
				errors: errors
			})
			
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
				this.props.onSuccess() //this callback will prevent the same file in the list from being uploaded again on next drop
				this.props.onUploaded(data)
	        } else {
	            //this.uploadError(data);
	            //TODO show this to the user
	        }
	    };

	    xhr.upload.addEventListener('progress', (e) => {
            this.setState({progress: (e.loaded / e.total * 100).toFixed()})
	    }, false);

	    xhr.send(formData);
    }

    render() {
		if(this.props.file.error) {
			return (
				<div className={`fileItem animated ${this.state.shouldAnimate && 'fadeInUp'}`}>
					<div className="icon">
						<DynamicFileIcon label={'err'}/>
                	</div>
					<div className="info">
						<div className="title-row">
							<div><p className="filename">{this.props.file.error}</p></div>
							<div className="icon"><span className="pointer" onClick={()=> {this.removeFile(this.props.file)}}><ItemStatusIcon complete={false}/></span></div>
						</div>
						<p className={`status redtext animated ${this.state.shouldAnimate && 'fadeInUp'}`}>Error</p>
                	</div>
				</div>
			)
		}
        return (
            <div className={`fileItem animated ${this.state.shouldAnimate && 'fadeInUp'}`}>
                <div className="icon">
					<DynamicFileIcon label={this.props.file.type.split('/')[1]}/>
                </div>
                <div className="info">
                    <div className="title-row">
                        <div><p className="filename">{this.props.file.name}</p></div>
                        <div className="icon"><span className="pointer" onClick={()=> {this.removeFile(this.props.file)}}><ItemStatusIcon complete={this.state.status === 'completed' ? true : false}/></span></div>
                    </div>
                    {this.state.status === 'uploading' && <p className="status">Uploading</p>}
                    {this.state.status === 'completed' && <p className={`status animated ${this.state.shouldAnimate && 'fadeInUp'}`}>Completed</p>}
                    {this.state.status === 'error' && <p className={`status redtext animated ${this.state.shouldAnimate && 'fadeInUp'}`}><span className="bold">Error:</span> {this.state.errors.join(', ')}</p>}
                    <div className="progress" style={{width: this.state.progress + '%'}}></div>
                </div>
            </div>
        )
    }
}