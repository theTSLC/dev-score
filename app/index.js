var React = require('react');
var ReactDOM = require('react-dom');

class App extends React.Component {
    render () {
        return (
            <div>
                Hello Worlds, it's TSLC
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
