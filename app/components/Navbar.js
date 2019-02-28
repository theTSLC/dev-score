var React   = require('react');
// var Link    = require('react-dom-router').Link; /*if no style changes necessary when active*/
var NavLink = require('react-router-dom').NavLink; /*allows changing style based on if a is active*/

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