import './App.css';
import NavBar from './Components/NavBar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Show from './Pages/Show';
import AllBookings from './Components/AllBookings';
import BookingsDetails from './Components/BookingsDetails';
import NewRoom from './Components/NewRoom';
import Index from './Pages/Index';

function App () {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/meetingrooms">
              <Index />
            </Route>
            <Route exact path="/bookings">
              <AllBookings />
            </Route>
            <Route exact path="/meetingrooms/new">
              <NewRoom />
            </Route>
            <Route exact path="/meetingrooms/:id">
              <Show />
            </Route>
            <Route exact path="/bookings/:id">
              <BookingsDetails />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
