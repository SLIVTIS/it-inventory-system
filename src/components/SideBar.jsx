import { Outlet, useNavigate } from 'react-router-dom';
import './SideBar.css';
import { SideBarData } from './SideBarData';
import Button from './Buttons/Button';

function SideBar() {
    const navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        navigate("/login");
    };

    return (
        <>
            <div className='sb-container'>
                <div className="sidebar">
                    <ul className='sidebar-list'>
                        {SideBarData.map((val, key) => {
                            return <li key={key}
                                className='row'
                                id={window.location.pathname == val.link ? "active" : ""}
                                onClick={() => navigate(val.link)}>
                                <div id='icon'>{val.icon}</div>
                                <div id='title'>{val.title}</div>
                            </li>;
                        })}
                    </ul>
                </div>
                <div className='section-content'>
                    <header>
                        <div className='navigation-content'>
                            <Button className="w-full" onClick={logout}>
                                Cerrar sesión
                            </Button>
                        </div>
                    </header>
                    <div className='w-full h-full overflow-auto'>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>);
}

export default SideBar;