import React, { Component } from 'react';

import './style.css';
import Navbar from '../Navbar';

import { URL_ID, URL_CART } from '../../constants';
import { connect } from 'react-redux';
import { ICestas } from '../../interfaces/ICesta';
import { ILogin } from '../../interfaces/ILogin';
import { decode } from 'jsonwebtoken';
import { ITokenLogin } from '../../interfaces/ITokenLogin';

interface IProps {
    match: any;
    cesta: ICestas;
    login: ILogin;
    history: any[];
}

interface IGlobalStateProps { }

type TProps = IProps & IGlobalStateProps;

interface IState {
    article: any;
    talla: string;
    cantidad: number;
}

class View extends React.PureComponent<TProps, IState> {
    constructor(props: TProps) {
        super(props)


        this.state = {
            article: [],
            talla: "",
            cantidad: 1
        }
        this.submitAdd = this.submitAdd.bind(this);
        this.suma = this.suma.bind(this);
        this.resta = this.resta.bind(this);
    }

    async componentDidMount() {
        const response = await fetch(URL_ID + this.props.match.params.id);
        const json = await response.json();

        this.setState({ article: json[0] });
    }

    submitAdd() {

        const { article } = this.state;
        const token: any = localStorage.getItem("token");
        const { _id } = decode(token) as ITokenLogin;

        try {
            fetch(URL_CART + _id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    shopCart: article._id
                })
            });
        } catch {
            console.log("Error")
        };
        this.props.history.push('/View')
    }

    suma() {
        let { cantidad } = this.state;

        this.setState({ cantidad: cantidad + 1 });
    }

    resta() {
        let { cantidad } = this.state;

        this.setState({ cantidad: cantidad - 1 });
    }

    render() {

        const { article } = this.state;
        const { login } = this.props;

        return (
            <>
                <Navbar />
                <div className="container-fluid principal">
                    <div className="row">
                        <div className="col-6 image3">
                            <img className="productoIm" src={`http://localhost:5000/avatars/${article.img}`} />
                        </div>
                        <div className="col-4 image3">
                            <h1 className="letraVista">{article.description}</h1>
                            <h4>{article.preci}€</h4>
                            {login?.token ? <button type="button" className="btn btn-primary h4view" data-toggle="modal" data-target="#exampleModalCenter">
                                Comprar
                            </button> : <h4 className="letraVista">Debes ingresar para comprar</h4>}
                            <div className="modal fade" id="exampleModalCenter" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Añadiste un producto al carrito
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" onClick={this.submitAdd} className="btn btn-secondary" data-dismiss="modal">Seguir comprando</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
};

// Traemos las cosos del Store
const mapStateToProps = ({ cesta, login }: IProps) => ({ cesta, login });

export default connect(mapStateToProps)(View);