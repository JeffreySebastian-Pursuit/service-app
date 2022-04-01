import '../styles/NavBar.scss';
import {useState} from 'react';
import menuData from '../data/menuData.json';
import {NavLink} from 'react-router-dom';
const NavBar = () => {
  const [active, setActive] = useState (false);

  return (
    <div className="navbar">
      <di className="navbar__logo">Service App</di>
      <div
        className={
          active
            ? 'navbar__menuItems navbar__menuItems-active'
            : 'navbar__menuItems'
        }
      >
        <ul>
          {menuData.map ((data, i) => {
            const {text, url} = data;
            return (
              <li key={i}>
                {' '}
                <NavLink exact to={url} >
                  {text}
                </NavLink>
                {/* <a href={url}>{text} </a>{" "} */}
              </li>
            );
          })}

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
