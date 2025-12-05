import { Link, NavLink } from 'react-router-dom';
import avatarIcon from '../assets/images/avatar-icon.png';

export default function Header() {
  const activeStyles = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  };

  function fakeLogOut() {
    localStorage.removeItem('loggedin');
  }

  return (
    <header>
      <Link className='site-logo' to='/vanlife'>
        #VanLife
      </Link>
      <nav>
        <NavLink
          to='host'
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          Host
        </NavLink>
        <NavLink
          to='about'
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          About
        </NavLink>
        <NavLink
          to='vans'
          style={({ isActive }) => (isActive ? activeStyles : undefined)}
        >
          Vans
        </NavLink>
        <Link to='login' className='login-link'>
          <img src={avatarIcon} className='login-icon' alt='avatar' />
        </Link>
      </nav>
    </header>
  );
}
// <button onClick={fakeLogOut}>X</button>
