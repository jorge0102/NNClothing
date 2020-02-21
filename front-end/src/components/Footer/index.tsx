import React, { Component } from 'react';
import './style.css';

class Footer extends React.PureComponent {

    render() {

        return (
            <>
                <div className="footer">
                    <div className="redesSocial2">
                        <img className="redesSocial2" src="http://localhost:5000/fijas/733558.svg" />
                        <p className="textFooter">@nnclothing__</p>
                    </div>
                    <div className="redesSocial2">
                        <img className="redesSocial2" src="http://localhost:5000/fijas/733585.svg" />
                        <p className="textFooter">672 258 993</p>
                    </div>
                    <div className="redesSocial2">
                        <img className="redesSocial2" src="http://localhost:5000/fijas/732200.svg" />
                        <p className="textFooter">sergiopatasat@hotmail.com</p>
                    </div>
                    <div className="redesSocial2">
                        <img className="redesSocial2" src="http://localhost:5000/fijas/2487592.svg" />
                        <p className="textFooter">Almuñecar</p>
                    </div>

                </div>
            </>
        )
    }
}

export default Footer;
