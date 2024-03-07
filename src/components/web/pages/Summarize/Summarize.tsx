import { FC, memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './Summarize.module.css';
import resets from '../../../_reset.module.css';
import { Header } from '../../shared/Header/Header';


interface Props {
    className?: string;
}

export const Summarize: FC<Props> = memo(function Summarize(props) {
   
    return (
        <div className={`${resets.projectResets} ${classes.summarize_page}`}>
            <Header />
            <div className={classes.summarize_container}>
                <div className={classes.summarize_bar_container}>
                      <div className={classes.summarize_right_bar_container}>

                      </div>
                      <div className={classes.summarize_left_bar_container}>

                      </div>
                </div>
            </div>
        </div>
    );
});
