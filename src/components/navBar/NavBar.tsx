import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import './NavBar.scss'
import Svg from "../svg/Svg";

const NavBar: React.FC = () => {
  const [isOpen, openMenu] = useState(false)

  const toggleMenu = () => {openMenu(!isOpen)}

  return (
    <nav className="nav-bar">
      <div
        role="button"
        className="nav-bar__menu"
        onClick={toggleMenu}
      >
        Menu
        <div
          className={classNames('nav-bar__menu-hamburger', {
            'nav-bar__menu-hamburger--open': isOpen
          })}
        />
        <div
          className={classNames('nav-bar__menu-body', {
            'nav-bar__menu-body--open': isOpen,
            'nav-bar__menu-body--close': !isOpen,
          })}>
          <ul>
            <li>
              <Link to="/">Home</Link>
              <Link to="/resume">Resume</Link>
              <a href="mailto:petenelson.webdesign@gmail.com">Contact</a>
              <a className="nav-bar__link-mobile" href="https://github.com/pbn04001">GitHub</a>
              <a className="nav-bar__link-mobile" href="https://twitter.com/petenelsonweb">Twitter</a>
            </li>
          </ul>
        </div>
      </div>

      <a className="nav-bar__github" title="Pete Nelson GitHub" href="https://github.com/pbn04001">
        <Svg name="github" />
      </a>
      <a className="nav-bar__twitter" title="Pete Nelson Twitter" href="https://twitter.com/petenelsonweb">
        <Svg name="twitter" />
      </a>
    </nav>
  );
}

export default NavBar;
