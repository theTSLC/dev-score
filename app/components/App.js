var React       = require('react');
var ReactRouter = require('react-router-dom');
var Router      = ReactRouter.BrowserRouter;
var Router      = ReactRouter.Route;

var Popular = require('./Popular');


class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    )
  }
}

module.exports = App;
