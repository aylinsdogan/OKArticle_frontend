import React, { FC, memo } from 'react';
import classes from './Header.module.css';
import resets from '../../../_reset.module.css';
import logo from '../../../../assets/logo.png';

interface Props {
    className?: string;
}

export const Header: FC<Props> = memo(function Header(props) {
    // Your component logic goes here

    return (
        <div className={`${resets.projectResets} ${classes.header}`}>
            <div  className={classes.header_bar}>
                <img src={logo} alt="OKArticle Logo" className={classes.logo} /> {/* Add this line */}
               <h1> OKArticle </h1>
               
            </div>
        </div>
    );
});
