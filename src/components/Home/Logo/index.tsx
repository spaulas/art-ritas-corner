import React from "react"
import Circle from "components/Home/Logo/Circle"
import logo from "assets/logo.png"
import branch from "assets/branch.png"
import "./styles.scss"

const Logo = () => {
    return (
        <div className="logo-container">
            <div className="images">
                <img className="branch" src={branch} alt="branch" />
                <div className="branch-cover" />
                <img className="logo" src={logo} alt="logo" />
            </div>
            <Circle color="blue" animationDelay={-2} />
            <Circle color="pink" animationDelay={-1.5} />
            <Circle color="blue" animateOnce animationDelay={-0.5} />
            <Circle color="pink" animateOnce animationDelay={0} />
        </div>
    )
}

export default Logo;