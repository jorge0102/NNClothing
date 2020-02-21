import React, { Component } from 'react';

import { URL_ID, URL_EDIT, URL_DELETE } from '../../../constants';
import './style.css';
import Navbar from '../../Navbar';
import { Link } from 'react-router-dom';

interface IProps {
    match: any;
    history: any[]
}

interface IState {
    article: any
}

class Edit extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props);


        this.state = {
            article: {}
        };
        this.modificarAdd = this.modificarAdd.bind(this);
        this.onChange = this.onChange.bind(this);
        this.delete = this.delete.bind(this);
    };

    async componentDidMount() {
        const response = await fetch(URL_ID + this.props.match.params.id);
        const json = await response.json();

        this.setState({ article: json[0] });
    }

    onChange(event: any) {
        const state = this.state.article
        state[event.target.name] = event.target.value;
        this.setState({ article: state });
    }

    // Modificar Articulo
    modificarAdd(event: any) {
        event.preventDefault();

        const { article } = this.state;
        const { unidades, categori, preci, description } = article;

        fetch(URL_EDIT + this.props.match.params.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                preci: preci,
                description: description,
                unidades: unidades,
                categori: categori
            })
        });
        this.props.history.push('/admin')
    }

    delete(id: any) {
        return fetch(URL_DELETE + id, {
            method: 'delete'
        })
    }

    render() {

        const { article } = this.state;

        return (
            <>
                <Navbar />
                <div className="container-fuid">
                    <div className="row">
                        <div className="col-6 cardAd1">
                            <h1>Modificar Articulo</h1>
                            <div className="card styleard1" >
                                <img className="card-img-top" src={`http://localhost:5000/avatars/${article.img}`} alt="Card image cap" />
                                <div className="card-body">
                                    <li> Nombre  <input type="text" name="description"
                                        placeholder={article.description}
                                        onChange={this.onChange} />
                                        Precio  <input type="text" name="preci"
                                            placeholder={article.preci}
                                            onChange={this.onChange} />
                                        <br />
                                    </li>
                                </div>
                                <Link to="/admin"><button onClick={this.modificarAdd} className="btn btn-danger actu">Actualizar</button>
                                    <button onClick={this.delete.bind(this, this.state.article._id)} className="btn btn-danger actu">Delete</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Edit;    