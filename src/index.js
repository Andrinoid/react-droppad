import React, {Component} from 'react'
import {noPropagation, injectStyle} from './utils'
import FileItem from './components/FileItem'
import UploadIcon from './components/icons/Upload'
import UploadSmallIcon from './components/icons/UploadSmall'
import droppadStyles from './droppadStyles'
// import './droppad.css'

class Droppad extends Component {

	constructor(props) {
		super(props)
		// Binded methods
		this.click = this.click.bind(this)
		this.dragenter = this.dragenter.bind(this)
		this.dragover = this.dragover.bind(this)
		this.dragleave = this.dragleave.bind(this)
		this.drop = this.drop.bind(this)
		this.setDropMode = this.setDropMode.bind(this)
		this.input = null

		this.state = {
			stateCls: 'dragidle',
			filesMode: false,
			files: [],
		}

		injectStyle(droppadStyles, 'react-droppad-styles')

	}
	//TODO remove envent on unmount
	click(e) {
		this.input.click()
	}

	dragenter(e) {
		noPropagation(e)
        this.setState({stateCls: 'droppad_dragenter'})
    }

    dragover(e) {
    	noPropagation(e)
        this.setState({stateCls: 'droppad_dragover'})
    }

    dragleave(e) {
    	noPropagation(e)
        this.setState({stateCls: 'droppad_dragleave'})
    }

    drop(e) {
    	noPropagation(e)
    	this.setState({stateCls: 'idle'})
        var files = e.target.files || e.dataTransfer.files;
        this.upload(files);
	}
	
	setDropMode() {
		this.setState({
			filesMode: false
		})
	}

	upload(files) {//TODO rename method
		this.setState({
			filesMode: true,
		})
		let fileList = [];
	    for (let i = 0; i < files.length; i++) {
			let file = files[i];
			let counter = i + 1;
			file['delay'] = i; //TODO
			fileList.push(file);
	        if (counter > this.props.maxFiles) {
				const errMsg = 'The maximum amount of files you can upload is ' + this.props.maxFiles;
	            if (this.props.showErrors) {
					// push an error object insted of the files exieeding the max files
					fileList.push({error: errMsg})
					this.setState({
						files: [...this.state.files, {error: errMsg}]
					})
					var cancel = true;
	            }
				break;
			}
		}
		if(cancel) return
		this.setState({
			files: [...this.state.files, ...fileList]
		})
	}

  	render() {

		return (
			<div
				className={`droppad_droppad ${this.state.stateCls} ${this.state.filesMode ? 'droppad_files-mode' : 'droppad_drop-mode'}`}
				onDragEnter={this.dragenter}
				onDragOver={this.dragover}
				onDragLeave={this.dragleave}
				onDrop={this.drop}>
				{/* droppad header */}
				<div className="droppad_header">
					<h3>{this.props.label}</h3>
					<div>
						{this.state.filesMode && (<span className="droppad_smallCloud droppad_animated droppad_fadeInUp droppad_delay-1s" onClick={this.setDropMode}><UploadSmallIcon /></span>)}
					</div>
				</div>

				{/* droppad */}
				{!this.state.filesMode && 
					<div className="droppad_dashed droppad_animated droppad_fadeInUp" onClick={this.click}>
						{/* <img className="cloudIcon" src={uploadIcon} width="60" alt="upload" /> */}
						<span className="droppad_cloudIcon"><UploadIcon /></span>
						<p className="droppad_title">{this.props.title}</p>
						<p className="droppad_subtitle">{this.props.subTitle}</p>
					</div>
				}

				{/* files list */}
				{this.state.filesMode &&
					<div className="droppad_droppad-files">
						{this.state.files.map((file, i) => <FileItem key={i} file={file} onSuccess={()=> {file['uploaded'] = true}} {...this.props} />)}
					</div>
				}
				<input type="file" multiple="true" ref={(node) => { this.input = node; }} onChange={this.drop} style={{visibility: 'hidden', position: 'absolute', top: '-100px'}}/>
			</div>
		)		
    }
}

Droppad.defaultProps = {
	url: '',
	maxFilesize: 8, //in MB
	maxFiles: 20,
	acceptedFiles: 'jpeg, jpg, png, gif',
	label: 'My files',
	title: 'Drag & drop',
	subTitle: 'your files here or browse',
	headers: null,
	showErrors: true,
	onUploaded: ()=>{}
};

export default Droppad
