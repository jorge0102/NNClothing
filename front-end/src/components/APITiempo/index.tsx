import React from "react";

import { ICurrentWeather } from "../../interfaces/ICurrentWeather";
import { API_TIEMPO, API_KEY } from '../../constants';

const buildAPIUrl = (cityName: string) =>
    `${API_TIEMPO}?q=${cityName}&appid=${API_KEY}`;
interface IState {
    weather: ICurrentWeather | null;
    logo: string;
    temp: number;
}

class Tiempo extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            weather: null,
            logo: "",
            temp: 0
        };
    }

    componentWillMount() {
        this.getWeather("Malaga,es");
    }

    async getWeather(cityName: string) {
        const weather = await (await fetch(buildAPIUrl(cityName))).json();
        this.setState({ logo: weather?.weather[0].icon, temp: weather?.main.temp })
        this.setState({ weather });
    }

    render() {

        const { weather, logo, temp } = this.state;
        const tiempo = temp - 273.15;

        return (
            <>
                {logo == undefined ? <></> :
                    <img className="logo2" src={`http://openweathermap.org/img/wn/${logo}@2x.png`} />}
                <div>{tiempo.toFixed(2)}</div>
            </>
        )
    }
}
export default Tiempo;
