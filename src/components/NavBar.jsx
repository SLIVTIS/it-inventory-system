import { Outlet } from "react-router-dom";

function NavBar() {

    return (
        <>
            <header>
                <div>
                    <img src="../assets/react.svg" alt="imagen de perfil" />
                </div>
            </header>

            <Outlet />

        </>
    );
}

export default NavBar;