import { Meta } from '@storybook/react/types-6-0';
import React from 'react';
import { Ripple } from '../Ripple';

export default {
    title: 'Ripple',
} as Meta;

export const Suka = () => {
    return (
        <div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam est
                vero nisi enim inventore earum voluptates! Qui doloribus, labore
                nemo quos aspernatur, neque tenetur minima fugit, ratione
                maiores eum dolorum.
            </p>
            <button
                style={{
                    position: 'relative',
                    fontSize: 18,
                    padding : '18px 36px',
                    overflow: 'hidden',
                }}
            >
                Hello
                <Ripple />
            </button>
        </div>
    );
};
