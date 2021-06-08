import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useParams
} from "react-router-dom";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul className="navbar">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/category">Category</Link>
            </li>
            <li>
              <Link to="/about-us">About us</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          {/* <Route path="/home">
            <Home />
          </Route>
          <Route path="/category">
            <Category />
          </Route>
          <Route path="/about-us">
            <AboutUs />
          </Route> */}

          <Route path="/:id" children={<Child />}></Route>
        </Switch>
      </div>
    </Router>
  );
};

const Home = () => <div>Home</div>;

const Category = () => <div>Category</div>;

const AboutUs = () => <div>About Us</div>;

const Child = () => {
  const { id } = useParams();

  return <div style={{ marginTop: 100}}>id: {id}</div>;
};

export default NavBar;
