import React, {Component} from 'react'
import {render} from 'react-dom'
import './theme.css'
import Droppad from '../../src'

class Demo extends Component {

  constructor(props) {
    super(props)
    this.onUploaded = this.onUploaded.bind(this)
    this.state = {
      uploadedFiles: []
    }
  }

  onUploaded(file) {
    this.setState(prevState => ({
      uploadedFiles: [...prevState.uploadedFiles, file]
    }))
  }

  render() {

    return (
    	<div className="container">
      		<h1>react-droppad Demo</h1>
      		<Droppad url="https://tweecode.com/icloud/upload/ghostlamp" onUploaded={this.onUploaded} headers={{Authorization: 'JWT 123'}}/>
          <br/><hr/><br/>
          {this.state.uploadedFiles.map((file, i) => <img key={i} src={'https://tweecode.com/' + file.image} alt="uploaded"/>)}
    	</div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
