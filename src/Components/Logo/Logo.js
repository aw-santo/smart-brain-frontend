import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Limg from './logoimg.png';

const Logo = () => {
    return(
        <div className="ma4 nt0 center">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3">
                    <img alt="Logo" src={Limg} style={{paddingTop:'6px'}}></img>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;