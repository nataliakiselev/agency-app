import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MainNav.css";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

const MainNav = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const toggleDrawerHandler = () => {
    drawerIsOpen ? setDrawerIsOpen(false) : setDrawerIsOpen(true);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && (
        <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      )}
      <MainHeader>
        <button
          className="main-navigation__menu-btn"
          onClick={toggleDrawerHandler}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">Talent Management</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNav;
