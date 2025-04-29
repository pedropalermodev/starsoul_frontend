import { useContext } from 'react';
import './styles.scss'
import { AuthContext } from '../../../../shared/contexts/AuthContext';

function Aside() {
    const { logout } = useContext(AuthContext);


    return (
        <div className="aside__container">
            <p>Aside</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Aside;