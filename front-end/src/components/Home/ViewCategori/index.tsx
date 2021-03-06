import React from 'react';

import { connect } from 'react-redux';

import './style.css';
import { URL_ADMIN } from '../../../constants';
import Navbar from '../../Navbar';
import { ILogin } from '../../../interfaces/ILogin';
import Footer from '../../Footer';
import { Link } from 'react-router-dom';

interface IProps {
    login: ILogin;
    match: any;
}

interface IState {
    article: any[];
}

class ViewCategori extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)

        this.state = {
            article: []
        }
    }

    async componentDidMount() {
        const response = await fetch(URL_ADMIN);
        const json = await response.json();

        this.setState({ article: json });
    }

    render() {

        // pasamo el numero por id y comprobamos en el if
        const indice = this.props.match.params.id;
        const { article } = this.state;
        const { login } = this.props;

        return (
            <>
                <Navbar />
                <div className="container-fluid fluid3">
                    <div className="row fondoI">
                        <div className="col-2 marginTextDiv">
                            <div className="marginText">
                                {login?.token && <h4 className="textPrin">Hola de nuevo {login?.username}!</h4>}
                                <p className="textPrin">
                                    N/N es una iniciativa que nace en 2017 intentando alejarse de las marcas comerciales y basándose más en el amor al realizar las prendas , eso si siempre apoyando la naturaleza y todo lo que ella engloba .
                                Para ello utilizamos pinturas base agua 100% eco y tejidos 100% algodón además de que todo el proceso es realizado a mano .
                            Si quieres una prenda única y  realizada con amor no dudes en ver nuestra página y hacerte con uno de ellos .
                            <div className="redesSocial2">
                                        <img className="redesSocial2" src="http://localhost:5000/fijas/reciclar.svg" />
                                    </div>
                                </p>
                            </div>
                        </div>
                        <div className="col-8 fondoI">
                            <div className="cardAd">
                                {article.map(article => {
                                    if (article?.categori === indice) {
                                        return <div className="card styleard" >
                                            <Link to={`/details/${article?._id}`}><img className="card-img-top" src={`http://localhost:5000/avatars/${article.img}`} alt="Card image cap" /></Link>
                                            <div className="card-body" key={article._id}>
                                                <h5 className="card-title">{article.description}</h5>
                                            </div>
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }
}

const mapStateToProps = ({ login }: IProps) => ({ login })

export default connect(mapStateToProps)(ViewCategori);