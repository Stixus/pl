import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Home from './Home';
import Table from './Table';
import TeamsInfo from './TeamsInfo';
import Teams from './Teams';
import Details from './Details';
import Fixtures from './Fixtures';
import Players from './Players';
import PlayerDetails from './PlayerDetails';
import Livescores from './Livescores';
import Issue from './Issue';

function Routing() {
  return (
    <div className='Routing'>
        <Router>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/table' exact component={Table}/>
                <Route path='/teamsinfo' exact component={TeamsInfo}/>
                <Route path='/teams' exact component={Teams}/>
                <Route path='/fixtures' exact component={Fixtures}/>
                <Route path='/details/:id' exact component={Details}/>
                <Route path='/players/:id' exact component={Players}/>
                <Route path='/players/playerdetails/:id' exact component={PlayerDetails}/>
                <Route path='/livescores' exact component={Livescores}/>
                <Route path='/issue' exact component={Issue}/>
            </Switch>
        </Router>
    </div>
  );
}

export default Routing;