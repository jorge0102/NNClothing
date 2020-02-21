import React, { Component } from 'react';

import { URL_ADMIN, URL_USER } from '../../constants';
import { connect } from 'react-redux';
import { SetArticleAction } from '../../redux/actions';
import { IArticle, IArticles } from '../../interfaces/IArticle';
import { ILogin } from '../../interfaces/ILogin';
import { Link } from 'react-router-dom';

import Navbar from '../Navbar';
import './style.css';
import Footer from '../Footer';
import APITiempo from '../APITiempo';

interface IGlobalStateProps {
    setArticulo(articulo: IArticle[]): void;
}

interface IProps {
    articles: IArticles;
    login: ILogin;
}

type TProps = IProps & IGlobalStateProps;

interface IState {
    buscar: string;
}

class Home extends React.PureComponent<TProps, IState> {
    constructor(props: TProps) {
        super(props);

        this.state = {
            buscar: ""
        }
        this.getImagen = this.getImagen.bind(this);
    }

    getImagen = async () => {
        try {
            const response = await fetch(URL_ADMIN);
            const imageJson = await response.json();
            this.props.setArticulo(imageJson)

        } catch (e) {
            console.log("error" + e);
        }
    };

    async componentDidMount() {

        this.getImagen();
        const { login } = this.props;

        if (login !== null) {
            const response = await fetch(URL_USER + login._id);
            const json = await response.json();
        }
    }

    render() {

        const { articles, login } = this.props;
        const newImagen = articles.order.splice(0, 3);

        return (
            <>
                <Navbar />
                <img src="http://localhost:5000/avatars/gris.jpg" className="imge" />
                <div className="fixed-bottom alerta">
                    <h6 className="textAlert" ><APITiempo/>Málaga</h6>
                    <div className="contenedor">
                    </div>
                </div>
                <div className=" contenedor23">
                    <div className="container">
                        <h3 className="textP">Espero que le gusten nuestros producto echos 100% ecologicos, con mucha dedicación cuidado cada detalle
                                    al maximo. Hecho totalmente a mano , y como digo siempre cuidando nuestra TIERRA que es lo unico que
                                    nos da la vida.
                                    </h3>
                    </div>
                </div>
                <React.Fragment>
                    <div className="vide vid">
                        <video loop autoPlay muted>
                            <source src='http://localhost:5000/videos/nn.mp4' type='video/mp4' />
                        </video>
                    </div>
                </React.Fragment>
                <div className="contenedor2">

                </div>

                <div className="contenedor4">
                    <div className="subCont2"><img src="http://localhost:5000/avatars/IMG.jpg" className="imge2" /></div>
                    <div className="subCont2"><img src="http://localhost:5000/avatars/largaNegra.jpg" className="imge2" /></div>
                </div>
                <div className="contenedor2">
                    <Link to="/View" onClick={()=>{window.scrollTo(0, 0);}}><h2>TODOS LOS PRODUCTOS </h2></Link>
                </div>
                <div className="container9">
                    <div className="cardTAS">
                        <Link to={`/categoti/${1}`} onClick={()=>{window.scrollTo(0, 0);}}><img className="imageCard" src="http://localhost:5000/avatars/gorroNegro.jpg" /></Link>
                        <h4 className="card-title h4view">ACCESORIOS</h4>
                        <p className="card-text">
                            Nuestra colección curada de accesorios de calidad y atemporales. Encuentra tu próxima gorra favorita,
                             una nueva billetera diaria, una bolsa para tus viajes o el regalo perfecto.
                            </p>
                    </div>
                    <div className="cardTAS">
                        <Link to={`/categoti/${2}`} onClick={()=>{window.scrollTo(0, 0);}}><img className=" imageCard" src="http://localhost:5000/avatars/tidi.jpg" /></Link>
                        <h4 className="card-title h4view">MANGA CORTA</h4>
                        <p className="card-text">
                            Una prenda cotidiana que utiliza principios de diseño clásico.
                        Las camisetas NN están cuidadosamente diseñadas para acompañarte en todas las aventuras con comodidad y estilo.
                            </p>
                    </div>
                    <div className="cardTAS">
                        <Link to={`/categoti/${3}`} onClick={()=>{window.scrollTo(0, 0);}}><img className=" imageCard" src="http://localhost:5000/avatars/negra.jpg" /></Link>
                        <h4 className="card-title h4view">SUDADERAS</h4>
                        <p className="card-text">
                            Una colección clásica de camisas inspiradas en nuestra herencia y exploraciones en el camino.
                            Vea nuestra última colección de sudaderas aquí.
                            </p>
                    </div>
                </div>
                <div className="contenedor2">
                    <h2>
                        NEW ARRIVALS
                    </h2>
                </div>
                <div className="contenedor3">
                    {newImagen.map((newImagen) => (
                        <div className="containere">
                            <Link to={`/details/${newImagen}`} ><img className="imagenHome" src={`http://localhost:5000/avatars/${articles.byId[newImagen].img}`} alt="Card image cap" /></Link>&nbsp;
                            <label >{articles.byId[newImagen].description}</label>
                        </div>
                    ))}
                </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = ({ login, articles }: TProps) => ({ login, articles });

// Mando al store
const mapDispatchToProps = {
    setArticulo: SetArticleAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
