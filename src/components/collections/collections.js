import React, {useState} from 'react';
import classes from './collections.module.css'
import Navbar from "../navbar/navbar";
import "../masonic/load.css"
import Masonry from "../masonic/Masonry";

const Collections = () => {
    const [searchItem, setSearchItem] = useState("");

    return (
        <div className={classes.container}>
            <Navbar setSearchItem={setSearchItem}/>
            <Masonry searchItem={searchItem}/>
        </div>
    );
};

export default Collections;
