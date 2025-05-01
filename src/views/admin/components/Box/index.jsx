import './styles.scss'

const Box = ({children, className = '', ...props}) => {
    return(
        <div className={`box ${className}`} {...props}>
            {children}
        </div>
    )
}

export default Box