import React from "react";
import Link from "components/common/Link"
import "./styles.scss"

const TopBar = () => {
    const handleAboutMeClick = () => {
        console.log('About me')
    }

    const handleContactMeClick = () => {
        console.log('Contact me')
    }

    const handleInstagramClick = () => {
        window.open("https://www.instagram.com/art_ritascorner/")
    }

    const handleLanguageClick = () => {
        console.log('Language')
    }

    return <div className="top-bar">
        <Link onClick={handleAboutMeClick}>Sur moi</Link>
        <Link onClick={handleContactMeClick}>Contactez moi</Link>
        <Link onClick={handleInstagramClick}>Instagram</Link>
        <Link onClick={handleLanguageClick}>FR</Link>
    </div>
}

export default TopBar;