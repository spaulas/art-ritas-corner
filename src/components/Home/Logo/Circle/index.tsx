import React from "react"
import "./styles.scss"

type CircleProps = {
    color: "pink" | "blue"
    animationDelay: number
    animateOnce?: boolean
}

const Circle = ({ color, animateOnce, animationDelay }: CircleProps) => {
    return <div className={`circle circle-${color} ${animateOnce ? "show-animation" : "hide-animation"}`} style={{ animationDelay: `${animationDelay}s` }} />
}

export default Circle;