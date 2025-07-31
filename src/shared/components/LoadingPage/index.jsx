import './styles.scss';
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


function LoadingPage(props) {
    return (
        <div className="loading-container">
            <DotLottieReact
            src="https://lottie.host/7ea51d60-8fd5-4a7f-81f8-cb165165a129/z1A1uIOFrT.json"
            style={{width: 220, height: 'auto'}}
            loop
            autoplay
            />
            <p>{props.message}</p>
        </div>
    );
}

export default LoadingPage;
