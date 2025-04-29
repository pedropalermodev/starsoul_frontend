import './styles.scss'

const Content = ({ children, className = '', ...props }) => {
    return(
        <div className={`content ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Content