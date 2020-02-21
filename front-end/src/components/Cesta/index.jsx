import React, { Component } from 'react';

import './style.css';
import Navbar from '../Navbar';
import swal from 'sweetalert2';

import { PayPalButton } from 'react-paypal-button-v2';
import { PAYPAL_CLIENT_ID } from '../../constants';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { URL_CART, URL_USER, URL_ELIMINAR } from '../../constants';
import { decode } from 'jsonwebtoken';

class Cesta extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            quantity: 0,
            array: [],
            carritoOlvidado: []
        }
        this.delete = this.delete.bind(this);
        this.renderizar = this.renderizar.bind(this);
    }

    async componentWillMount() {
        this.renderizar();
    }

    async renderizar() {
        const token = localStorage.getItem("token");

        if (token) {
            console.log(token)
            const { _id } = decode(token);
            const response = await fetch(URL_USER + _id);
            const json = await response.json();
            console.log(json)
            this.setState({ carritoOlvidado: json });
        }
        else {
            console.log("vacio");
        }
    }

    suma() {
        let { quantity } = this.state;
    }

    submitAdd() {

        const { login, cesta } = this.props;

        try {
            fetch(URL_CART + login._id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    idCart: cesta
                })
            });
        } catch {
            console.log("Error")
        };

    }

    delete(id) {

        const { login } = this.props;

        fetch(URL_ELIMINAR + login._id, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id
            })
        });
        this.renderizar();
    }

    render() {

        const { cesta } = this.props;

        let { quantity, array, carritoOlvidado } = this.state;
        let price = 0;

        if (carritoOlvidado) {
            for (let i = 0; i < carritoOlvidado.length; i++) {
                quantity = i + 1;
                price = price + parseInt(carritoOlvidado[i].preci);
            }
        }

        for (let i = 0; i < cesta.order.length; i++) {
            quantity = quantity + 1;
            price = price + parseInt(cesta.order[i]?.preci);
        }

        array.push(price);

        return (
            <>
                <Navbar />
                <div className="container-fluid fondo">
                    <div className="row fondo">
                        <div className="col-6 divCarro">
                            <h3>Mi cesta({quantity})</h3>
                            <div className="scroll">
                                {quantity === 0 ? <h5>Su carrito esta vacio</h5> : carritoOlvidado?.map(articuloCarrito =>
                                    <div className="subDivCarro">
                                        <div className="row">
                                            <div className="col-3 imaSubDiv">
                                                <img className="imagenCarro " src={`http://localhost:5000/avatars/${articuloCarrito.img}`} />
                                            </div>
                                            <div className="col3 d-flex justify-content-center ml-5 ">
                                                <div>
                                                    <ul>
                                                        <li><h4>{articuloCarrito.description}</h4></li>
                                                        <li><h6>{articuloCarrito.preci}€</h6>
                                                        </li>
                                                        <button onClick={() => this.delete(articuloCarrito._id)}>Eliminar</button>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="col-6 divCarro2">
                            <h3 className="textDivCarro">Resúmen del pedido: {quantity} productos</h3>
                            <table className="table table-borderless">
                                <thead>
                                    <tr >
                                        <th scope="col">Subtotal</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                        <th scope="col">{price}€</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="tabla">
                                        <th scope="row">Gastos de envio</th>
                                        <td></td>
                                        <td></td>
                                        <th scope="col">6€</th>
                                    </tr>
                                    <tr className="tabla">
                                        <th scope="row">Importe total estimado</th>
                                        <td></td>
                                        <td></td>
                                        {price === 0 ? <th></th> : <th scope="col">{price + 6}€</th>}
                                    </tr>
                                </tbody>
                            </table>
                            <Link to="/view"><div className="d-flex justify-content-center"><button className="textDivBoton">Añadir mas Aticulos</button></div></Link>
                            <br />
                            {quantity !== 0 && <PayPalButton
                                style={{ layout: "horizontal", color: "black" }}
                                clientId={PAYPAL_CLIENT_ID}
                                amount={price + 6}
                                onSuccess={(details, data) => {
                                    console.log(details);
                                    console.log(data);
                                    swal.fire({
                                        title: "Transacción realizada correctamente",
                                        text: "¡Gracias por su compra!",
                                        icon: "success",
                                        timer: 2000
                                    });
                                }}
                            />}
                            <p className="textDivCarro">Los costes de envío no serán confirmados hasta llegar al checkout.
                                Regístrate o crea una cuenta en el siguiente paso para obtener la opción de gastos de envío gratuitos</p>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = ({ cesta, login }) => ({ cesta, login });



export default connect(mapStateToProps)(Cesta);
