import React from "react"
import "./styles.scss"

type CircleProps = {
    color: "pink" | "blue"
}

const Circle = ({ color }: CircleProps) => {
    return <div className={`circle circle-${color}`} />
}

export default Circle;