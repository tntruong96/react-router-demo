import React, { createContext, useContext, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  useParams,
  useRouteMatch,
  useHistory,
  useLocation
} from "react-router-dom";

const Redirect = () => {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Public</Link>
            </li>
            <li>
              <Link to="/protected">Protected</Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/">
            <Public />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </Router>
    </ProvideAuth>
  );
};

function Public() {
  return <div>Public</div>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}

// Create context

const fakeAuth = {
  isAuthenticated: false,
  signIn(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const authContext = createContext();

function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

function useAuth() {
  return useContext(authContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (cb) => {
    return fakeAuth.signIn(() => {
      setUser("user");
      cb();
    });
  };

  const signout = (cb) => {
    return fakeAuth.signOut(() => {
      setUser(null);
      cb();
    });
  };

  return {
    user,
    signin,
    signout
  };
}

function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function LoginPage() {
  let history = useHistory();
  let location = useLocation();
  let auth = useAuth();

  let { from } = location.state || { from: { pathname: "/" } };
  let login = () => {
    auth.signin(() => {
      history.replace(from);
    });
  };

  return (
    <div>
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
    </div>
  );
}

export default Redirect;
