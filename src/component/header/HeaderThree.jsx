import React from "react";
import {FaLinkedinIn, FaGithub, FaRegUser  } from "react-icons/fa";
import { FiX, FiMenu } from "react-icons/fi";
import Scrollspy from 'react-scrollspy'

const SocialShare = [
    {Social: <FaGithub size="20" /> , link: 'https://github.com/jerkodeur'},
    {Social: <FaLinkedinIn size="20" /> , link: 'https://www.linkedin.com/in/j%C3%A9r%C3%B4me-poti%C3%A9/'},
]
const HeaderThree = (props) => {

    const { toogleConnexion, logo, color='default-color' } = props;
    const menuTrigger = () => document.querySelector('.header-wrapper').classList.toggle('menu-open')

    const CLoseMenuTrigger = () => document.querySelector('.header-wrapper').classList.remove('menu-open')

    // stickyHeader () {}

    window.addEventListener('scroll', function() {
        const value = window.scrollY;
        if (value > 100) {
            document.querySelector('.header--fixed').classList.add('sticky')
        }else{
            document.querySelector('.header--fixed').classList.remove('sticky')
        }
    });

    const elements = document.querySelectorAll('.has-droupdown > a');
    for(const i in elements) {
        if(elements.hasOwnProperty(i)) {
            elements[i].onclick = function() {
                this.parentElement.querySelector('.submenu').classList.toggle("active");
                this.classList.toggle("open");
            }
        }
    }

    return(
        <header className={`header-area header-style-two header--fixed ${color}`}>
            <div className="header-wrapper">
                <div className="header-left d-flex align-items-center">
                    <nav className="mainmenunav d-lg-block ml--50">
                        <Scrollspy className="mainmenu" items={['about','project','contact']} currentClassName="is-current" offset={-200}>
                            {/* <li><a href="#home">Home</a></li> */}
                            <li><a href="#about">À propos de moi</a></li>
                            <li><a href="#project">Mes projets</a></li>
                            <li><a href="#contact">Me contacter</a></li>
                        </Scrollspy>
                    </nav>
                </div>
                <div className="header-right">
                    <div className="social-share-inner">
                        <ul className="social-share social-style--2 color-theme d-flex justify-content-start liststyle">
                            {SocialShare.map((val , i) => (
                                <li key={i}><a href={`${val.link}`} target="_blank" >{val.Social}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="header-btn">
                        <a className="rn-btn dark-color" href="/assets/files/Potié Jérôme - Développeur Web Fullstack.pdf" download>
                            <span>Télécharger mon CV</span>
                        </a>
                    </div>
                    <div className="social-share-inner">
                        <ul className="social-share social-style--2 color-theme d-flex justify-content-start liststyle ml-2">
                                <li><a href="#" onClick={toogleConnexion}><FaRegUser size="20" color="#000" /></a></li>
                        </ul>
                    </div>
                    {/* Start Humberger Menu  */}
                    <div className="humberger-menu d-block d-lg-none pl--20">
                        <span onClick={menuTrigger} className="menutrigger text-white"><FiMenu /></span>
                    </div>
                    {/* End Humberger Menu  */}
                    <div className="close-menu d-block d-lg-none">
                        <span onClick={CLoseMenuTrigger} className="closeTrigger"><FiX /></span>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default HeaderThree;