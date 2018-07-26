# react-droppad
React-droppad is a simple to use component that provides drag'n'drop file uploads. 

![Showtime logo](demo/react-droppad.gif)

## Installation
``yarn add react-droppad``
or
``npm install react-droppad``

## Usage

Import `react-droppad` in your React component:

```javascript static
import Droppad from 'react-droppad'
``` 

Then In your render function  
```javascript static
<Droppad url="UPLOAD_URL" onUploaded={this.onUploaded}/>
``` 

Check out the demo

layout inspired by : https://dribbble.com/shots/2473854-Daily-UI-Day-031-File-Upload