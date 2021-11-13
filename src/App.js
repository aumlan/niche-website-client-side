import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/Home.js";
import About from "./pages/About.js";
import Contact from "./pages/Contact.js";
import Services from "./pages/Services.js";
import Login from "./pages/Login.js";
import Signup from "./pages/Signup.js";
import PageNotFound from "./pages/PageNotFound.js";
import AuthProvider from "./contexts/AuthProvider.js";
import Reset from "./pages/Reset.js";
import Details from "./pages/Details.js";
import PrivateRoute from "./route/PrivateRoute.js";
import Footer from "./components/footer/Footer.js";
import Header from "./components/header/Header.js";
import Dashboard from "./pages/Dashboard.js";
import AdminPanel from "./pages/AdminPanel.js";
import Checkout from "./pages/Checkout";
import MakeAdmin from "./pages/makeAdmin";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Header> </Header>

          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>

            <Route path="/home">
              <Home></Home>
            </Route>

            <Route path="/about">
              <About></About>
            </Route>

            <Route path="/make-admin">
              <MakeAdmin />
            </Route>


            <PrivateRoute path="/admin">
              <AdminPanel />
            </PrivateRoute>

            <Route path="/contact">
              <Contact></Contact>
            </Route>

            <Route exact path="/courses">
              <Services></Services>
            </Route>

            <PrivateRoute path="/dashboard">
              <Dashboard></Dashboard>
            </PrivateRoute>

            <Route path="/login">
              <Login></Login>
            </Route>

            <Route path="/checkout">
              <Checkout/>
            </Route>

            <Route path="/signup">
              <Signup></Signup>
            </Route>

            <Route path="/reset">
              <Reset></Reset>
            </Route>

            <PrivateRoute path="/courses/:id">
              <Details></Details>
            </PrivateRoute>

            <Route path="*">
              <PageNotFound></PageNotFound>
            </Route>
          </Switch>
          <Footer></Footer>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
