// Resources
import './WelcomePage.scss';
import '../../commons/styles/style.scss';
import logoSrc from '../../assets/images/logo.png';

// Libs
import React from 'react';
import {Link} from 'react-router-dom';

function WelcomePage() {
    return (
        <div className="cp-welcome">
            <div className="cp-welcome__bg"></div>
            <div className="cp-welcome__title">CRAZY FOR PIZZA</div>
            <img className="cp-welcome__logo margin-center"
                 src={logoSrc} alt="Logo"/>
            <Link className="cp-welcome__enter-link " to="/home">
                <button className="cp-welcome__enter margin-center">
                    START
                </button>
            </Link>
        </div>);
}

WelcomePage.propTypes = {};
WelcomePage.defaultProps = {};

export default WelcomePage;
