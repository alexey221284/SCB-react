import React from "react";
import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header className='header'>
            <div className='left-text'>
                <Link to='/'><h1>Word Keeper</h1></Link>
            </div>
            <div className='right-text'>
                <Link to='/favorites'>Starred Words</Link>
            </div>
        </header>
    );
}

