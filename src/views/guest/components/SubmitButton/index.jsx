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
                <DotLottieReact
                src="https://lottie.host/bd66456c-aceb-45a3-9d1c-21470934ccbc/6PaBsnmXVr.lottie"
                height={22}
                loop
                autoplay
                />
            ) : (
                children
            )}
        </button>
    );
}
export default SubmitButton;
