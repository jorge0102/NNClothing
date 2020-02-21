import React, { Component } from 'react';

import { connect } from 'react-redux';
import { SetLoginAction } from '../../redux/actions';
import { ILogin } from '../../interfaces/ILogin';
import { myFetch } from '../../utils';
import { Link } from 'react-router-dom';
import { ITokenLogin } from '../../interfaces/ITokenLogin';
import { decode } from 'jsonwebtoken';

import Navbar from '../Navbar';
import "../Formulario";
import Swal from 'sweetalert2';

interface IProps {
    history: any[];
    login: ILogin;
}

interface IGlobalActionProps {
    setLogin(login: ILogin): void
}

interface IState {
    _id: string;
    username: string;
    password: string;
    error: string;
}

type TProps = IProps & IGlobalActionProps;

class Login extends React.PureComponent<TProps, IState> {
    constructor(props: TProps) {
        super(props);

        this.state = {
            _id: "",
            username: "",
            password: "",
            error: ""
        }
        this.onUser = this.onUser.bind(this);
        this.onPassword = this.onPassword.bind(this);
        this.login = this.login.bind(this);
    }

    onUser(event: any) {
        const username = event.target.value;
        this.setState({ username, error: "" });
    }

    onPassword(event: any) {
        const password = event.target.value;
        this.setState({ password, error: "" });
    }

    login() {

        const { _id, username, password } = this.state;

        myFetch({
            method: "POST",
            json: { _id, username, password }
        }).then(json => {

            if (json) {

                const { token } = json;
                localStorage.setItem("token", token);
                this.add(_id, username, token);
                if (token) {
                    this.props.history.push('/');
                }

            } else {

                Swal.fire({
                    icon: 'error',
                    text: 'Contraseña o Usuario no coinciden',
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: 'Custom image',
                });
            }
        });
    }

    // Para guardar en el store
    add(_id: string, username: string, token: string) {
        const { isAdmin } = decode(token) as ITokenLogin;
        console.log(isAdmin);
        this.props.setLogin({ _id, username, token, isAdmin });
    }

    render() {

        const { username, password } = this.state;

        return (
            <>
                <Navbar />
                <div className="bodypr">
                    <div className="box">
                        <span className="text-center">login</span>
                        <div className="input-container">
                            <input type="text"
                                value={username}
                                onChange={this.onUser}
                            />
                            <label>Name</label>
                        </div>
                        <div className="input-container">
                            <input type="password"
                                value={password}
                                onChange={this.onPassword} />
                            <label>Password</label>
                        </div>
                        <Link to="/formu"><p className="input-container">Crear Cuenta</p></Link>
                        {<button onClick={this.login} className=" btn">Aceder</button>}
                    </div>
                </div>
            </>
        )
    }
};

const mapDispatchToProps = {
    setLogin: SetLoginAction
};

const mapStateToProps = ({ login }: TProps) => ({ login });

export default connect(mapStateToProps, mapDispatchToProps)(Login);