import React, {Component} from 'react'
import {noPropagation, range, foreach, attemptJson} from './utils'
import FileItem from './components/FileItem'
import uploadIcon from './icons/upload.svg'
import uploadIconSmall from './icons/upload-small.svg'
import './droppad.css'

class Droppad extends Component {

	constructor(props) {
		super(props)
		// Binded methods
		this.dragenter = this.dragenter.bind(this)
		this.dragover = this.dragover.bind(this)
		this.dragleave = this.dragleave.bind(this)
		this.drop = this.drop.bind(this)
		this.setDropMode = this.setDropMode.bind(this)

		// class Variables
		this.chunkTotal = {totals: 0, loads: 0}
		this.filesLenght

		this.state = {
			stateCls: 'dragidle',
			filesMode: false,
			files: [],
		}

	}
	//TODO remove envent on unmount
	dragenter(e) {
		noPropagation(e)
        this.setState({stateCls: 'dragenter'})
    }

    dragover(e) {
    	noPropagation(e)
        this.setState({stateCls: 'dragover'})
    }

    dragleave(e) {
    	noPropagation(e)
        this.setState({stateCls: 'dragleave'})
    }

    drop(e) {
    	noPropagation(e)
    	this.setState({stateCls: 'idle'})
        
        var files = e.target.files || e.dataTransfer.files;
		
		/*
        //Add reference id to each file so we can access it throug thumbnails
        for(let i = 0; i < files.length; i++) {
            files[i].uid = ++this.uid;
        }
        if (this.defaults.backgroundLoading) {
            this.showAsBackground(files);
        }
        if (this.defaults.thumbnailLoading) {
            this.createThumbnails(files);
        }
        */
        this.upload(files);
        
	}
	
	setDropMode() {
		this.setState({
			filesMode: false
		})
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

    uploadSingle(file, id) {

	    let headers = {
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
	            //this.uploadSuccess(data, file);
	        } else {
	            //this.uploadError(data);
	            //TODO show this to the user
	        }
	    };

	    xhr.upload.addEventListener('progress', (e) => {
	        this.chunkTotal.totals[id] = e.total;
	        this.chunkTotal.loads[id] = e.loaded;
	        this.uploadProgress();
	    }, false);

	    xhr.send(formData);
	}

	upload(files) {
		console.log(files)
		this.setState({
			filesMode: true,
		})
	    this.chunkTotal = {
	        totals: range(files.length, 0, 0),
	        loads: range(files.length, 0, 0), // returns e.q [0,0,0] for three files
	    };

		this.filesLenght = files.length//Do I need this?
		
		let fileList = this.state.files
	    for (let i = 0; i < files.length; i++) {
	        let file = files[i];
			let counter = i + 1;
			fileList.push(file);
			this.setState({files: fileList})
	        if (counter > this.props.maxFiles) {
	            const err = 'The maximum amount of files you can upload is ' + this.props.maxFiles;
	            if (this.props.showErrors) {
	                console.log(err)//TODO show error somehow
	            }
	            break;
	        }
			// this.uploadSingle(file, i);
	    }
	}

	uploadProgress() {
        let loaded = this.chunkTotal.loads.reduce((a, b) => a + b, 0); // returns sum of array values
        let total = this.chunkTotal.totals.reduce((a, b) => a + b, 0);
        let percentage = (loaded / total * 100).toFixed();
        console.log(percentage + '%');
    }


    uploadError(data) {
        console.log('uppload error') //TODO show this in a component that will disappear
    }

  	render() {

		return (
			<div
				className={`droppad ${this.state.stateCls} ${this.state.filesMode ? 'files-mode' : 'drop-mode'}`}
				onDragEnter={this.dragenter}
				onDragOver={this.dragover}
				onDragLeave={this.dragleave}
				onDrop={this.drop}>
				{/* droppad header */}
				<div className="header">
					<h3>{this.props.label}</h3>
					<div>
						{this.state.filesMode && <img src={uploadIconSmall} className="smallCloud" alt="upload" onClick={this.setDropMode}/>}
					</div>
				</div>

				{/* droppad */}
				{!this.state.filesMode && 
					<div className="dashed">
						<img className="cloudIcon" src={uploadIcon} width="60" alt="upload" />
						<p className="title">{this.props.title}</p>
						<p className="subtitle">{this.props.subTitle}</p>
					</div>
				}

				{/* files list */}
				{this.state.filesMode &&
					<div className="droppad-files">
						{this.state.files.map((file, i) => <FileItem key={i} file={file} />)}
					</div>
				}
				
			</div>
		)		
    }
}

Droppad.defaultProps = {
	url: '',
	backgroundImage: '',
	maxFilesize: 8, //in MB
	maxFiles: 20,
	paramName: "file", //TODO
	acceptedFiles: 'jpeg, jpg, png, gif',
	showErrors: true,
	label: 'My files',
	title: 'Drag & drop',
	subTitle: 'your files here or browse',
	thumbnailLoading: false,
	thumbnails: [] // ['http://example.jpg', 'http://example2.jpg']
};

export default Droppad
