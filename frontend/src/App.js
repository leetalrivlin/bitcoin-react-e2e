import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ContactApp } from './views/contact-app';
import { HomePage } from './views/home-page';
import { Statistic } from './views/statistic';
import { ContactDetails } from './views/contact-details';
import { ContactEdit } from './views/contact-edit';
import { Signup } from './views/signup';
import { AppHeader } from './cmps/app-header/app-header';
import { ToastContainer } from "react-toastify";
import './App.scss';

function App() {
  return (
    <Router>
      <div className="flex column app">
        <AppHeader />
        <ToastContainer autoClose={2000} position="bottom-left" progressClassName={'#07F'}/>
        <Switch>
          <Route component={ContactEdit} path="/contact/edit/:id?" />
          <Route component={ContactDetails} path="/contact/:id" />
          <Route component={ContactApp} path="/contact" />
          <Route component={Statistic} path="/statistic" />
          <Route component={Signup} path="/signup" />
          <Route component={HomePage} path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
