import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

const Nesting = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
      </div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/topics">
          <Topics />
        </Route>
      </Switch>
    </Router>
  );
};

const Home = () => <div>Home</div>;

const Topics = () => {
  const { path, url } = useRouteMatch();
  // console.log(a.params);
  return (
    <div>
      <ul>
        <li>
          <Link to={`${path}/render`}>Redering</Link>
        </li>
        <li>
        <Link to={`${path}/component`}>Components</Link>
        </li>
        <li>
        <Link to={`${path}/prop`}>Props vs State</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path={path}>
          <div> Please select something </div>
        </Route>
        <Route path={`${path}/:topicId`}>
          <Topic/>
        </Route>
      </Switch>
    </div>
  );
};

const Topic = () => {
  const {topicId} = useParams();
  return <div>Id: {topicId}</div>
}

export default Nesting;
