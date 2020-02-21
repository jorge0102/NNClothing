import React from 'react';

import Login from './Login';
import Details from './VistaProducto';
import Formulario from './Formulario';
import Home from './Home';
import Admin from './Admin';
import vistaEdit from './Admin/vistaEdit';
import ViewLogueado from './Home/View';
import ViewCategori from './Home/ViewCategori';
import Cesta from './Cesta';

import { Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import { ILogin } from '../interfaces/ILogin';
import { SetLoginAction } from '../redux/actions';
import { generarTokenComprobar } from '../utils';

interface IProps {
  login: ILogin;
};

interface IGlobalActionProps {
  setLogin(login: ILogin): void;
};

type TProps = IGlobalActionProps & IProps;

class App extends React.Component<TProps> {
  componentWillMount() {
    const { setLogin } = this.props;
    const token = localStorage.getItem("token");
    if (token) {
      setLogin(generarTokenComprobar(token));
    }
  }

  render() {

    return (

      <>
        <Switch>
          {/** User*/}
          <Route path='/' exact component={Home} />
          <Route path='/formu' exact component={(props: any) => <Formulario {...props} />} />
          <Route path='/login' exact component={(props: any) => <Login {...props} />} />
          <Route path='/view' exact component={ViewLogueado} />
          <Route path='/details/:id' exact component={(props: any) => <Details {...props} />}/>
          <Route path='/categoti/:id' exact component={ViewCategori} />
          <Route path='/buy' exact component={ViewCategori} />
          <Route path='/buy/cesta/olvidada' exact component={Cesta} />
          
          {/** Admin*/}
          <Route path='/admin' exact component={Admin} />
          <Route path='/show/:id' exact component={vistaEdit} />
          <Route path='/show/:id' exact component={vistaEdit} />
          <Route path='/buy/user' exact component={Cesta} />
        </Switch>
      </>

    )
  }
}

const mapStateToProps = ({ login }: TProps) => ({ login });

const mapDispatchToProps = {
  setLogin: SetLoginAction
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
