var React   = require('react');
var NavLink = require('react-router-dom').NavLink; /*versus .Link, allows changing style if <a> is active*/

function Navbar () {
  return (
    <ul className='nav'>
      <li>
        <NavLink exact activeClassName='active-link' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active-link' to='/battle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active-link' to='/popular'>
          Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Navbar;
