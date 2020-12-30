import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { createUseStyles } from 'react-jss';
import { Ripple } from '../Ripple';

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

export const Main = () => {
    const classes = useStyles();
    return (
        <div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
                vero nisi enim inventore earum voluptates! Qui doloribus, labore
                nemo quos aspernatur, neque tenetur minima fugit, ratione
                maiores eum dolorum.
            </p>
            <button className={classes.button}>
                <Ripple />
                Hello
            </button>
            <button className={classes.button}>
                <Ripple color={rainbowColors} />
                Rainbow
            </button>
            <button className={classes.button}>
                <Ripple unbounded />
                Unbounded
            </button>
        </div>
    );
};
