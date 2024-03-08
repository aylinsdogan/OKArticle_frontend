import React, { FC, memo } from 'react';
import classes from './Header2.module.css';
import resets from '../../../_reset.module.css';

interface Props {
    className?: string;
}

export const Header2: FC<Props> = memo(function Header2(props) {
    // Your component logic goes here

    return (
        <div className={`${resets.projectResets} ${classes.header2}`}>
            <div  className={classes.header_bar2}>
               <h1> OKArticle </h1>
               
            </div>
        </div>
    );
});
