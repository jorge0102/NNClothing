import React from 'react';

import produce from 'immer';
import './style.css';
import Navbar from '../Navbar';

import { URL_ADMIN, URL_IMG } from '../../constants';
import { Link } from 'react-router-dom';

interface IProps { }

interface IState {
    stockArray: any[];
    add: any[];
    article: any[];
    description: string;
    categori: string;
    preci: string;
    color: string;
    unidades: string;
    talla: string;
    stock: {
        talla: string;
        color: string;
        unidades: string;
    };
}

class Admin extends React.PureComponent<IProps, IState> {
    inputFileRef: React.RefObject<HTMLInputElement>;
    constructor(props: IProps) {
        super(props)

        this.state = {
            stockArray: [],
            add: [],
            description: "",
            categori: "",
            preci: "",
            color: "",
            unidades: "",
            talla: "",
            stock: {
                talla: "",
                color: "",
                unidades: ""
            },
            article: []
        }
        this.inputFileRef = React.createRef();
        this.subirAdd = this.subirAdd.bind(this);
        this.objectAdd = this.objectAdd.bind(this);
        this.objectDelete = this.objectDelete.bind(this);
        this.renderizar = this.renderizar.bind(this);
    }

    async componentDidMount() {
        this.renderizar();
    }

    async renderizar() {
        const response = await fetch(URL_ADMIN);
        const json = await response.json();
        console.log(json)
        this.setState({ article: json });
    }

    // Anadir al array de objetos
    objectAdd() {

        const { color, talla, stock, unidades, add, stockArray } = this.state;

        for (let i = add.length; i < add.length + 1; i++) {
            stock.talla = talla;
            stock.color = color;
            stock.unidades = unidades;
        }

        produce(stock, draftState => {
            stockArray.push(draftState.talla)
            stockArray.push(draftState.color)
            stockArray.push(draftState.unidades)
        });

        const json = JSON.stringify(stock); // Para pasar un objeto pro formData
        add.push(json);
        this.setState({ talla: "", color: "", unidades: "" })

        return add
    }

    // Eliminar del array
    objectDelete() {
        const { stockArray } = this.state;
        stockArray.splice(0, 3);
        this.objectAdd();
    }

    // Subir Articulo
    subirAdd() {

        const { description, categori, preci, add } = this.state;
        let articleParse = [];

        for (let i = 0; i < add.length; i++) {
            articleParse.push(JSON.parse(add[i]));
        }

        const json = JSON.stringify(articleParse); // Para pasar un objeto pro formData

        if (this.inputFileRef.current?.files) {

            const avatar = this.inputFileRef.current.files[0];
            const formData = new FormData();

            formData.append("avatar", avatar);
            formData.append("description", description);
            formData.append("categori", categori);
            formData.append("preci", preci);
            formData.append("stock", json);

            fetch(URL_IMG, {
                method: "POST",
                body: formData
            });
        }
        this.setState({ description: "", categori: "", preci: "", color: "", talla: "", unidades: "", stockArray: [] });
        setTimeout(() => {
            this.renderizar();
        }, 1000)
    }

    render() {

        const { description, categori, preci, article, color, talla, unidades, stockArray } = this.state;

        return (
            <>
                <Navbar />
                <div className="card mb-5 stiloCard float-right" >
                    <div className="row no-gutters">
                        <div className="col-md-3">

                        </div>
                        <div className="col-md-5 float-right">
                            <div className="card-body">
                                <h5 className="card-text">Precio</h5>
                                <input className="form-control" type="text" name="preci"
                                    value={preci}
                                    onChange={({ target: { value } }) => this.setState({ preci: value })} />
                                <h5 className="card-text">Descripcion</h5>
                                <input className="form-control" type="text" name="description"
                                    value={description}
                                    onChange={({ target: { value } }) => this.setState({ description: value })} />
                                <h5 className="card-text">Categoria</h5>
                                <input className="form-control" type="text" name="preci"
                                    value={categori}
                                    onChange={({ target: { value } }) => this.setState({ categori: value })} />
                                <h5 className="card-text">Stock</h5>
                                <input className="form-control" type="number" value={unidades}
                                    onChange={({ target: { value } }) => this.setState({ unidades: value })} />
                                <p className="card-text">
                                    <select value={color}
                                        onChange={({ target: { value } }) => this.setState({ color: value })} >
                                        <option value="Blanca">Blanca</option>
                                        <option value="Negra">Negra</option>
                                        <option value="Amarilla">Amarilla</option>
                                    </select>
                                    <select value={talla}
                                        onChange={({ target: { value } }) => this.setState({ talla: value })} >
                                        <option value="XL">XL</option>
                                        <option value="L">L</option>
                                        <option value="M">M</option>
                                    </select></p>

                                <h5>Añadir Imagen</h5>
                                <input type="file" ref={this.inputFileRef} />
                                <br />
                                <br />
                                <button onClick={this.objectAdd}>Añadir +</button>
                                <button onClick={this.objectDelete}>Eliminar</button>
                                <button onClick={this.subirAdd} className=" btn">Subir</button>
                            </div>
                            <h4 className="h4Stock">STOCK</h4>
                        </div>
                    </div>
                    <table>
                        {stockArray.map(stock =>
                            <th><h2 className="letraStock">{stock}</h2></th>
                        )}
                    </table>
                </div>
                <div className="cardAd">
                    {article.map(article =>
                        <div className="card styleard" >
                            <img className="card-img-top" src={`http://localhost:5000/avatars/${article.img}`} alt="Card image cap" />
                            <div className="card-body" key={article._id}>
                                <p className="card-text">Nombre:  {article.description}</p>
                                <p className="card-text">Precio:  {article.preci}€</p>
                                <p className="card-text">Categoria:   {article.categori}</p>
                                <p className="card-text">unidades:  {article.stock[0].unidades}</p>
                                <p className="card-text">talla:  {article.stock[0].talla}</p>
                                <Link to={`/show/${article._id}`} className="btn bg-primary">Edit</Link>&nbsp;
                            </div>
                        </div>
                    )}
                </div>
            </>
        )
    }
}



export default Admin;