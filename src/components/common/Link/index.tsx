import React, { PropsWithChildren } from "react";
import "./styles.scss"

type LinkProps = {
    onClick: () => void
}

const Link = ({ onClick, children }: PropsWithChildren<LinkProps>) => {
    return <div className="link-button" onClick={onClick}>{children}</div>
}

export default Link;