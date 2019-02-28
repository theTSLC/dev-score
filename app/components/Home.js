var React = require('react');
var Link  = require('react-router-dom').Link;

class Home extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <h2>Developer Score: compare languages and profiles</h2>
        <Link className='button' to='/battle'>
          Battle
        </Link>
      </div>
      )
  }
}

module.exports = Home;
