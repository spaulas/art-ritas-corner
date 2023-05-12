import React from "react"
import Circle from "components/Home/Logo/Circle"
import logo from "assets/logo.png"
import branch from "assets/branch.png"
import "./styles.scss"

const Logo = () => {
    return (
        <div className="logo-container">
            <img className="branch" src={branch} alt="branch" />
            <div className="circles">
                <Circle color="blue" />
                <Circle color="pink" />
            </div>
            <img className="logo" src={logo} alt="logo" />
        </div>
    )
}

export default Logo;