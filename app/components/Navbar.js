import React from 'react';
import { NavLink } from 'react-router-dom'; /*versus .Link, allows changing style if <a> is active*/

export default function Navbar () {
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
