import React from 'react';
import "./navbar.css"
import Spotify from "../icons/spotify.png"


const Navbar = ({setSearchItem}) => {
    const onInputChanged = (e) => {
        setSearchItem(e.target.value)
    };

    return (
        <div className="pinterest">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
                  integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
                  crossOrigin="anonymous" referrerPolicy="no-referrer"/>

            <div className="left">
                <a href="#" className="logo"><i className="fab fa-pinterest"/></a>
                <a href="#" className="home">Home</a>
            </div>
            <div className="search">
                <i className="fas fa-search"/>
                <input className="search-input" onChange={onInputChanged} type="search" name=""
                       placeholder="Search" id=""/>
            </div>
            <div className="right">
                <a href="#" className="items"><i className="fas fa-bell"/></a>
                <a href="#" className="items"><i className="far fa-comment-dots"/></a>
                <a href="#" className="avatar">
                    <div className="img"><img
                        src={Spotify}
                        alt=""/></div>
                </a>
                <a href="#" className="items-down"><i className="fas fa-chevron-down"/></a>
            </div>
        </div>
    );
};

export default React.memo(Navbar);
