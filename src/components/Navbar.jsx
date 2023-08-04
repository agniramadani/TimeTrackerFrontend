import React from "react";


const Navbar = (page) => {
    const logoutHandler = () => {
        // Remove user data when logout
        localStorage.removeItem("is_authenticated")
        localStorage.removeItem("token")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        localStorage.removeItem("is_superuser")
    }
    const username = localStorage.getItem('username');

    return(<nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
            <a className="navbar-brand" href="/"> {username} </a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <a className={page === "Users" ? "nav-link active": "nav-link"}
                           aria-current="page" href="/">Users</a>
                    </li>
                    <li className="nav-item">
                        <a className={page === "Projects" ? "nav-link active": "nav-link"}
                           href="/projects">Projects</a>
                    </li>
                    <li className="nav-item">
                        <a className={page === "Account" ? "nav-link active": "nav-link"}
                           aria-current="page" href="/account">Account</a>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <button className="btn btn-outline-danger"
                            onClick={()=> logoutHandler()}>Logout</button>
                </form>
            </div>
        </div>
    </nav>
    )
}

export default Navbar;
