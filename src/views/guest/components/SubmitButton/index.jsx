import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './styles.scss'

function SubmitButton({ children, isValid, loading }) {
    return (
        <button
            type="submit"
            className={`sign__form-button-submit ${isValid ? 'active' : ''} ${loading ? 'loading' : ''}`}
            disabled={!isValid || loading}
        >
            {loading ? (
                <div className="dot-container">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            ) : (
                children
            )}
        </button>
    );
}
export default SubmitButton;
