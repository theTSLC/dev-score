import React from 'react';
import { Link } from 'react-router-dom';

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

export default Home;
