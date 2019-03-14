import React from 'react'
import ReactDOM from 'react-dom'
import './index.css' // works here because of webpack 'style-loader'

import App from './components/App'

ReactDOM.render(<App />, document.getElementById('app'));
