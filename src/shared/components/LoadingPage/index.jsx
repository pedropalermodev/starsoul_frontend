import './styles.scss';

function LoadingPage(props) {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>{props.message}</p>
        </div>
    );
}

export default LoadingPage;
