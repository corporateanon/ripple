import { Meta } from '@storybook/react/types-6-0';
import React, { FC } from 'react';
import { createUseStyles } from 'react-jss';
import { Ripple } from '../src/Ripple';

export default {
    title: 'Ripple',
} as Meta;

const useStyles = createUseStyles({
    button: {
        position: 'relative',
        fontSize: 18,
        padding : '18px 36px',
        margin  : 16,
    },
});

const rainbowColors = [
    'red',
    'orange',
    'yellow',
    'green',
    'aqua',
    'blue',
    'violet',
];

export const Main: FC = () => {
    const classes = useStyles();
    return (
        <div>
            <button className={classes.button}>
                <Ripple />
                Hello
            </button>
            <button className={classes.button}>
                <Ripple color={rainbowColors} />
                Rainbow
            </button>
            <button className={classes.button}>
                <Ripple unbounded unboundedSize={400} />
                Unbounded
            </button>
        </div>
    );
};
