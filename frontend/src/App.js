import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { ContactPage } from './views/ContactPage';
import { HomePage } from './views/HomePage';
import { StatisticPage } from './views/StatisticPage';
import { ContactDetailsPage } from './views/ContactDetailsPage';
import { ContactEditPage } from './views/ContactEditPage';
import { Signup } from './views/Signup';
import { AppHeader } from './cmps/AppHeader/AppHeader';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="flex column app">
        <AppHeader />
        <Switch>
          <Route component={ContactEditPage} path="/contact/edit/:id?" />
          <Route component={ContactDetailsPage} path="/contact/:id" />
          <Route component={ContactPage} path="/contact" />
          <Route component={StatisticPage} path="/statistic" />
          <Route component={Signup} path="/signup" />
          <Route component={HomePage} path="/" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
