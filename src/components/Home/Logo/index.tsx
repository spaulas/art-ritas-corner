import React from "react"
import Circle from "components/Home/Logo/Circle"
import "./styles.scss"

const Logo = () => {
    return <div className="circles">
        <Circle color="blue" />
        <Circle color="pink" />
    </div>
}

export default Logo;