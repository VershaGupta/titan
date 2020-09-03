import * as React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { addJS } from "../../utils/dom";
export interface HeaderProps {}

const Header: React.FC<HeaderProps> = props => {
  // Add JS
  addJS([
    {
      id: "jq",
      src: "js/jquery-3.4.1.min.js",
    },
  ]).then(() => {
    addJS([
      {
        id: "bs",
        src: "js/bootstrap.bundle.min.js",
      },
      {
        id: "jq-easing",
        src: "js/jquery.easing.min.js",
        async: true,
      },
      {
        id: "sp",
        src: "js/scrollspy.min.js",
        async: true,
      },
      {
        id: "landing-app",
        src: "js/app.js",
        async: true,
      },
    ]);
  });

  const path = useLocation().pathname;
  return (
    <div id="landing-page">
      <header id="topnav" className="defaultscroll sticky">
        <div className="container">
          <div>
            {/* <Link to="/" className="logo">
              <img src="images/logo.svg" alt="Social9" />
            </Link> */}
            Titan
          </div>

          <div className="buy-button">
            <Link to="/tools/list" className="btn btn-primary">
              Dashboard
            </Link>
          </div>
          <div className="menu-extras">
            <div className="menu-item">
              {/* Mobile menu toggle */}
              <a className="navbar-toggle">
                <div className="lines">
                  <span />
                  <span />
                  <span />
                </div>
              </a>
              {/* End mobile menu toggle */}
            </div>
          </div>
          <div id="navigation" className="active">
            {/* Navigation Menu */}
            <ul className="navigation-menu">
              <li className={path === "/" ? "active" : undefined}>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noopener noreferrer">
                  Docs
                </a>
              </li>
              {/* <li className={path === "/shorturl" ? "active" : undefined}>
                <Link to="/shorturl">URL Shortener</Link>
              </li> */}
            </ul>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
