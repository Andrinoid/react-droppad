import React, {Component} from 'react'
import {render} from 'react-dom'
import './theme.css'
import Droppad from '../../src'

class Demo extends Component {
  render() {
    return (
    	<div className="container">
      		<h1>react-droppad Demo</h1>
      		<Droppad url="https://tweecode.com/icloud/upload/ghostlamp"/>
    	</div>
    )
  }
}

render(<Demo/>, document.querySelector('#demo'))
