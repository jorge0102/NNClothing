import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ILogin } from '../../interfaces/ILogin';
import { LogoutAction } from '../../redux/actions';
import { URL_ADMIN } from '../../constants';

import './style.css';

interface IProps {
    login: ILogin | null;
}

interface IGlobalActionProps {
    logout(): void;
}

interface IState {
    articles: any;
    articulos: string;
    to: string;
    id: string;
    arraySearch: string[];
}

type TProps = IProps & IGlobalActionProps;

class Navbar extends React.PureComponent<TProps, IState>{
    constructor(props: TProps) {
        super(props)

        this.state = {
            articles: [],
            articulos: "",
            to: '#',
            id: "",
            arraySearch: []
        }
        this.logout = this.logout.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.getImagen = this.getImagen.bind(this);
    }

    logout() {
        let { logout } = this.props;
        localStorage.removeItem("token");
        logout()
    }

    getImagen = async () => {
        try {
            const response = await fetch(URL_ADMIN);
            const imageJson = await response.json();

            this.setState({ articles: imageJson })

        } catch (e) {
            console.log("error" + e);
        }
    };

    async componentDidMount() {

        this.getImagen();
    }

    // Buscador
    onSearch(event: any) {

        const { arraySearch } = this.state;
        const { articles } = this.state;
        const search = event?.target.value;
        const indice = search.length;
        articles.map((arti: any) => {

            const descripcion = arti.description.toLowerCase()

            if (indice > 2 && descripcion.includes(search) === true) {
                const articulos = arti.description;

                arraySearch.push(articulos);

                this.setState({ to: `/details/` })
            }
            else if (search === arti.description) {

                this.setState({ id: arti._id });
            }
        });
    }

    render() {

        const { login } = this.props;
        const { id, to, arraySearch } = this.state;

        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light colore">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <div ><img className="logo1" src="http://localhost:5000/avatars/imagen.jpg" /></div>
                        <i className="fas fa-user-astronaut"></i>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            {login?.token && login.isAdmin === true && <Link to="/admin"><button type="button" className="btn btn-danger admin">ADMIN</button></Link>}
                        </ul>
                        <Link to={`${to}${id}`}>
                            <img className="logo2" src="http://localhost:5000/fijas/lupa.svg" />
                        </Link>&nbsp;
                        <div className="icons">
                            <div className="md-form">
                                <input type="search" id="form1" onChange={this.onSearch} placeholder="Buscar.." className="form-control logo3" list="listaArticulos" />
                                <datalist id="listaArticulos">
                                    {arraySearch.map((productos: string, i: number) =>
                                        <option value={productos} />
                                    )}
                                </datalist>
                            </div>
                        </div>
                        <div className="icons">
                            <Link to="/buy/user" >
                                {login?.token && <img className="logo2" src="http://localhost:5000/fijas/carritoBueno.svg" />}
                            </Link>
                            <Link to="/">
                                <a onClick={this.logout}>
                                    {login?.token && <img className="logo2" src="http://localhost:5000/fijas/cerrarBien.svg" />}
                                </a>
                            </Link>
                            <Link to="/">
                                <img className="logo2" src="http://localhost:5000/fijas/home.svg" />
                            </Link>
                            <Link to="/login">
                                {!login?.token && <img className="logo2" src="http://localhost:5000/fijas/login.svg" />}
                            </Link>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
};

const mapStateToProps = ({ login }: IProps) => ({ login });

const mapDispatchToProps = {
    logout: LogoutAction
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);