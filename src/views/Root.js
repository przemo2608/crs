import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MainTemplate from '../templates/MainTemplate';
import News from './News';
import Workers from './Workers';
import Cars from './Cars';
import Tasks from './Tasks';
import Customers from './Customers'
import Logout from './Logout'
import store from '../store/store';
import { Provider } from 'react-redux';
import {routes} from '../routes/index';
import DetailsPage from './DetailsPage';
import LoginPage from '../views/LoginPage';
import RegisterPage from '../views/RegisterPage';
import AdminTasks from '../views/AdminTasks';


const Root = () =>(
  <Provider store={store}> 
    <BrowserRouter>
     <MainTemplate> 
     <Switch>
       <Route exact path={routes.login} component={LoginPage} />
       <Route exact path={routes.register} component={RegisterPage} />
        <Route exact path={routes.logout} component={Logout} />
       <Route exact path={routes.home} render={() => <Redirect to="/login"/>}/>
       <Route exact path={routes.news} component={News}/>
       <Route path={routes.new} component={DetailsPage}/>
       <Route exact path={routes.workers} component={Workers}/>
       <Route exact path={routes.customers} component={Customers}/>
       <Route path={routes.worker} component={DetailsPage}/>
       <Route exact path={routes.cars} component={Cars}/>
       <Route path={routes.car} component={DetailsPage}/>
       <Route exact path={routes.tasks} component={Tasks}/>
        <Route exact path={routes.admintasks} component={AdminTasks} />
       <Route path={routes.task} component={DetailsPage}/>
     </Switch>
      </MainTemplate> 
    </BrowserRouter>
  </Provider> 
  );

export default Root;
