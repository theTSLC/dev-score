import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar  from './Navbar';
import Home    from './Home';
import Battle  from './Battle';
import Results from './Results';
import Popular from './Popular';

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

export default App;
