import * as React from "react";
import { connect } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import breadcrumb from "../../assets/images/align-left.svg";
import bugReport from "../../assets/images/bug-outline.svg";
import docs from "../../assets/images/documents.svg";
import home from "../../assets/images/home.svg";
import postScheduler from "../../assets/images/hourglass-outline.svg";
import link from "../../assets/images/link.svg";
import logoWhite from "../../assets/images/logo.svg";
import tool from "../../assets/images/tool.svg";
import { IGetProfile } from "../../redux/actions/user";
import { RootSchema } from "../../redux/reducers";
import "./Navigation.scss";

export interface NavigationProps {
  hidePaths?: string[];
  isCMSView?: boolean;
  profile: IGetProfile;
  children?: React.ReactElement;
}

const SIDE_NAVBAR = [
  { name: "Growth Tools", icon: "s9icontool", link: "/tools" },
  { name: "URL Shortener", icon: "s9iconlink", link: "/urlshortener" },
  { name: "Comments", icon: "s9iconcomment", link: "/comments" },
  // {
  //   name: "Post Scheduler (coming soon)",
  //   icon: 's9iconhourglass-outline',
  //   link: "/scheduler",
  // },
  { name: "My Account", icon: "s9iconuser", link: "/profile" },
];

const TOP_NAVBAR = [
  [
    { name: "Sites", link: "/sites" },
    // { name: "Installation", link: "/installation" },
    // { name: "Analytics", link: "/analytics" },
  ],
  [],
  [],
  [],
  [{ name: "Change Password", link: "/" }],
];

const SIDE_BOTTOM_NAVBAR = [
  {
    name: "Docs",
    icon: "s9icondocuments",
    link: window.location.host.startsWith("social9")
      ? "https://docs.social9.com"
      : "https://devdocs.social9.com",
  },
  { name: "Bug Report", icon: "s9iconbug-outline", link: "#!" },
];

const Navigation: React.FC<NavigationProps> = props => {
  // Nav UX
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
  const [selectedNav, setSelectedNav] = React.useState<number>(0);

  const { hidePaths, isCMSView, profile } = props;
  const location = useLocation();
  // Hide Navigation based on location change
  const showNav = !(
    isCMSView ||
    (hidePaths && hidePaths.includes(location.pathname))
  );

  React.useEffect(() => {
    setSidebarOpen(false);

    for (let index in SIDE_NAVBAR) {
      if (location.pathname.startsWith(SIDE_NAVBAR[index].link)) {
        setSelectedNav(parseInt(index));
        break;
      }
    }
  }, [location.pathname]);

  return (
    <div className={"main-inner" + (sidebarOpen ? " sidebaropen" : "")}>
      {/* {showNav && (
        <nav
          onMouseEnter={() => setSidebarOpen(true)}
          onMouseLeave={() => setSidebarOpen(false)}
          className="page-sidebar"
        >
          <div className="navigations">
            <div className="page-sidebar-icons">
              <ul>
                {SIDE_NAVBAR.map((item, index) => {
                  return (
                    <li key={index}>
                      <NavLink
                        to={item.link}
                        onClick={() => setSelectedNav(index)}
                      >
                        <span className="icon">
                          <i className={item.icon}></i>
                        </span>
                        <span className="link">{item.name}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <ul className="bottom-list">
                {SIDE_BOTTOM_NAVBAR.map((item, index) => {
                  return (
                    <li key={index}>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        <span className="icon">
                          <i className={item.icon}></i>
                        </span>
                        <span className="link">{item.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </nav>
      )} */}

      {showNav && (
        <header className="d-flex justify-content-between navigation">
          <div
            className="show-on-tablet mobile-menu"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <img src={breadcrumb} />
          </div>
          <Link
            to="/tools/list"
            className="mobile-logo show-on-tablet d-flex align-items-center"
          >
            {/* <img src={logoWhite} alt="Social9" title="Social9" /> */}
            Titan
          </Link>

          <nav className="nav-left hide-on-tablet">
            <ul className="d-flex align-items-stretch">
              <li className="d-flex align-items-stretch">
                <Link
                  to="/tools/list"
                  className="logo d-flex align-items-center"
                >
                  Titan
                  {/* <img src={logoWhite} alt="Social9" title="Social9" /> */}
                </Link>
              </li>
              {(TOP_NAVBAR[selectedNav] || []).map((nav, index) => {
                const base = SIDE_NAVBAR[selectedNav].link;
                return (
                  <li key={index} className="d-flex align-items-stretch">
                    <NavLink
                      className="d-flex align-items-center"
                      to={base + nav.link}
                    >
                      {nav.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
          <nav className="nav-right">
            <ul className="d-flex align-items-stretch">
              <li className="d-flex align-items-center">
                Hi, {profile.FirstName || profile.FullName || "New User"}!
              </li>
              <li className="d-flex align-items-stretch">
                <Link className="d-flex align-items-center" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </header>
      )}

      {props.children}
    </div>
  );
};

const mapState = (state: RootSchema) => {
  return {
    profile: state.user.profile,
  };
};

export default connect(mapState)(Navigation);
