import React, { Component } from 'react';

import { IProfile } from '../../interfaces/IProfile';
import { connect } from 'react-redux';
import { setProfileAction } from '../../redux/actions';
import { URL_CRE } from '../../constants';

import validate from 'validate.js';
import './style.css';
import Navbar from '../Navbar';

interface IProps {
    setProfile(profile: IProfile): void;
    history: any;
}

interface IState {
    username: string;
    password: string;
    email: string;
    text: string;
    boton: boolean;
}

class Formulario extends React.PureComponent<IProps, IState> {
    inputFileRef: React.RefObject<HTMLInputElement>;
    constructor(props: IProps) {
        super(props)

        this.state = {
            username: "",
            password: "",
            email: "",
            text: "",
            boton: true
        }
        this.inputFileRef = React.createRef();
        this.submitAdd = this.submitAdd.bind(this);
    }

    submitAdd() {

        const { username, password, email, text } = this.state;

        try {
            fetch(URL_CRE, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    text: text
                })
            });
            this.add(username, password, email);
            this.props.history.push('/login')
        } catch {
            console.log("Error")
        };

    }

    // Para guardar en el store
    add(username: string, password: string, email: string) {
        this.props.setProfile({ username, password, email });
    }

    render() {

        const constraints = {
            from: {
                email: true
            }
        };

        const { username, password, email, text, boton } = this.state;

        return (
            <>
                <Navbar />
                <div className="bodypr">
                    <div className="box">
                        <span className="text-center">Crear Cuenta</span>
                        <div className="input-container">
                            <input type="text" name="username"
                                value={username}
                                onChange={({ target: { value } }) => this.setState({ username: value })} />

                            <label>Name</label>
                        </div>
                        <div className="input-container">
                            <input type="password" name="password"
                                value={password}
                                onChange={({ target: { value } }) => this.setState({ password: value })} />
                            <label>Password</label>
                        </div>
                        <div className="input-container">
                            <input type="text" name="email"
                                value={email}
                                onChange={(e) => {
                                    this.setState({ email: e.target.value })
                                    const validation = validate({ from: this.state.email }, constraints)
                                    if (validation !== undefined) { this.setState({ boton: true }) }
                                    else { this.setState({ boton: false }) }
                                }}
                            />
                            <label>email</label>
                        </div>
                        <div className="input-container">
                            <input type="text" name="texto"
                                value={text}
                                onChange={({ target: { value } }) => this.setState({ text: value })} />
                            <label>Comentario</label>
                        </div>
                        <button disabled={boton} onClick={this.submitAdd} className=" btn">Registrate</button>
                    </div>
                </div>
            </>
        )
    }
}

// Mando todo al store
const mapDispatchToProps = {
    setProfile: setProfileAction
};

export default connect(null, mapDispatchToProps)(Formulario);