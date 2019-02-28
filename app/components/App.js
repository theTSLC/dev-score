var React       = require('react');
var ReactRouter = require('react-router-dom');
var Router      = ReactRouter.BrowserRouter;
var Route       = ReactRouter.Route;

var Popular = require('./Popular');
var Navbar  = require('./Navbar');


class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Navbar />
          <Route path='/popular' component={Popular} />
        </div>
      </Router>
    )
  }
}

module.exports = App;
