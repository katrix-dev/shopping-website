import React from "react";
import { Link } from "react-router-dom";

const Header = () =>{
  if(localStorage.getItem("vendorid")==null){
      var menu1 =
      <>
        <li className="nav-item">
        <Link className="nav-link active" to="/register"><i className="fa fa-suitcase"></i> Sell Your Product</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/login"><i className="fa fa-lock"></i> Vendor Login</Link>
        </li>
      </>
  }else{
     menu1 = 
      <>
        <li className="nav-item ">
        <Link className="nav-link active" to="/orderlist"><i className="fa fa-phone"></i> Order List</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/manageproduct"><i class="fa-solid fa-screwdriver-wrench"></i> Manage Product</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active text-warning logout" to={logout}>
           Welcome - {localStorage.getItem("name")} - Logout <i class="fa fa-power-off fa-lg text-warning" onClick={logout}></i></Link>
        </li>
      </>
  }
    return(
        <>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark p-3">
        <div className="container-fluid">
        <Link className="navbar-brand" to="#">
            <i className="fa fa-shopping-cart fa-lg text-warning"></i> Keep Shopping 
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item">
        <Link className="nav-link active" to="/"><i className="fa fa-home"></i> Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/cart"><i className="fa fa-shopping-cart"></i> My Cart</Link>
        </li> 
        {menu1}
        
      </ul>
    </div>
  </div>
</nav>

        </>
    )
}

const logout = () =>{
  localStorage.clear(); //clear all data from local storage
  window.location.href="http://localhost:3000/#/login"; //redirection
	window.location.reload(); //reloading
}

export default Header;