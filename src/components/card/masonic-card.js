import React, {useRef, useState} from "react";
import classes from "./masonic-card.module.css"
import {CSSTransition} from "react-transition-group";
import {ReactComponent as Pin} from "../icons/pin.svg"
import {ReactComponent as Menu} from "../icons/menu.svg"
import {ReactComponent as Upload} from "../icons/upload.svg"
import {isSearching, setScrollSaver} from "../utils/ScrollSaver/ScrollSaver";

const MasonryCard = ({data, index, data: {image_url}, width}) => {
    const main = useRef(null)

    const [descOn, setDescOn] = useState(false);
    const [imageHeight, setImageHeight] = useState("450px");

    const onImageLoad = (e) => {
        setImageHeight(e.target.naturalHeight > 450 ? "450px" : e.target.naturalHeight + "px")
    };

    const onImageError = () => {
        try {
            // If we have an error in loading the image
            main.current.style.display = "none"
        } catch (e) {
            console.log(e);
        }
    };

    const onContainerOver = () => {
        if (!isSearching) {
            setScrollSaver(index)
        }
    };

    const renderUtils = () => {
        return <>
            <CSSTransition in={descOn} timeout={300} classNames="save" unmountOnExit>

            <span onMouseOver={() => setDescOn(true)}
                  onMouseOut={() => setDescOn(false)}
                  className={classes.btn}
                  style={{maxWidth: width * 0.75, height: 'auto', maxHeight: "50%"}}>
                Save
            </span>

            </CSSTransition>

            <CSSTransition in={descOn} timeout={300} classNames="save" unmountOnExit>

                <div onMouseOver={() => setDescOn(true)}
                     onMouseOut={() => setDescOn(false)}
                     className={classes.pin}
                     style={{maxWidth: width * 0.75, height: 'auto', maxHeight: "50%"}}>
                    <Pin className={classes.pin_icon}/>
                </div>

            </CSSTransition>

            <CSSTransition in={descOn} timeout={300} classNames="save" unmountOnExit>

                <div onMouseOver={() => setDescOn(true)}
                     onMouseOut={() => setDescOn(false)}
                     className={classes.upload}
                     style={{maxWidth: width * 0.75, height: 'auto', maxHeight: "50%"}}>
                    <Upload className={classes.upload_icon}/>
                </div>

            </CSSTransition>

            <CSSTransition in={descOn} timeout={300} classNames="save" unmountOnExit>

                <div onMouseOver={() => setDescOn(true)}
                     onMouseOut={() => setDescOn(false)}
                     className={classes.menu}
                     style={{maxWidth: width * 0.75, height: 'auto', maxHeight: "50%"}}>
                    <Menu className={classes.menu_icon}/>
                </div>

            </CSSTransition>

            <CSSTransition in={descOn} timeout={300} classNames="save" unmountOnExit>
                <div onMouseOver={() => setDescOn(true)}
                     onMouseOut={() => setDescOn(false)}
                     className={classes.desc}
                     style={{maxWidth: width * 0.75, height: 'auto', maxHeight: "35%"}}>
                    <p className={classes.desc_p}>{data.description}</p>
                </div>
            </CSSTransition>
        </>
    };

    return <div key={index} ref={main} onMouseOver={onContainerOver}
                style={{minHeight: "20px"}}
                onTouchEndCapture={onContainerOver} className={classes.container}>

        {renderUtils()}

        <img src={image_url} className={classes.image}
             onMouseOver={() => setDescOn(true)}
             onMouseOut={() => setDescOn(false)}
             onLoad={onImageLoad}
             onError={onImageError}
             style={{width: width, height: imageHeight, maxHeight: '450px', maxWidth: "85%"}}
             alt={data.description}/>

    </div>
};

export default MasonryCard;
