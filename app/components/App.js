var React       = require('react');
var ReactRouter = require('react-router-dom');
var Router      = ReactRouter.BrowserRouter;
const Route       = ReactRouter.Route;
const Switch      = ReactRouter.Switch;

const Navbar  = require('./Navbar');
const Home    = require('./Home');
const Battle  = require('./Battle');
const Results = require('./Results');
const Popular = require('./Popular');


class App extends React.Component {
  render () {
    return (
      <Router>
        <div className='container'>
          <Navbar />
          <Switch>
            <Route exact path='/'                 component={Home} />
            <Route exact path='/battle'           component={Battle} />
            <Route       path='/battle/results/'  component={Results} />
            <Route       path='/popular'          component={Popular} />
            <Route render={() => <p>Not found</p>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

module.exports = App;
