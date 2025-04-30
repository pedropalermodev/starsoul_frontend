import './styles.scss'

function SubmitButton({ children, isValid, loading }) {
    return (
        <button
            type="submit"
            className={`sign__form-button-submit ${isValid ? 'active' : ''}`}
            disabled={!isValid || loading}
        >
            {loading ? '...' : children}
        </button>
    );
}
export default SubmitButton;
