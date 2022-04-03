import '../styles/NavBar.scss';
import {useState} from 'react';
const NavBar = () => {
  const [active, setActive] = useState (false);

  return (
    <div className="navbar mb-3">
      <a class="navbar-brand" href="/">Service App</a>
      <div
        className={
          active
            ? 'navbar__menuItems navbar__menuItems-active'
            : 'navbar__menuItems'
        }
      >
        <ul class="nav nav-tabs mb-5">
          <li class="nav-item">
            <a class="nav-link" href="/meetingrooms">
              Meeting Rooms
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Bookings">Bookings</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/meetingrooms/new">New Room</a>
          </li>
        </ul>
      </div>
      <div
        className="navbar__collapsedMenuIcon"
        onClick={() => setActive (!active)}
      >
        =
      </div>
    </div>
  );
};

export default NavBar;
