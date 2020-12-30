import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { IRippleBodyProps, RippleBody } from '../src/RippleBody';

export default {
    title    : 'RippleBody',
    component: RippleBody,
} as Meta;

const Template: Story<IRippleBodyProps> = (args) => <RippleBody {...args} />;

export const Main = Template.bind({});
