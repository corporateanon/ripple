import clsx from 'clsx';
import React, { FC, useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    root: {
        background  : 'red',
        position    : 'absolute',
        top         : (theme) => -theme.size / 2,
        left        : (theme) => -theme.size / 2,
        width       : (theme) => theme.size,
        height      : (theme) => theme.size,
        borderRadius: (theme) => theme.size / 2,
    },
    notRunning: {
        transform: (theme) => `scale(${1 / theme.size})`,
    },
    running: {
        transitionProperty: 'transform, opacity',
        transitionDuration: '0.8s',
        transform         : 'scale(1)',
        opacity           : 0,
    },
});

export interface IRippleBodyProps {
    active?: boolean;
    size?: number;
    onEnd?: () => void;
}
export const RippleBody: FC<IRippleBodyProps> = ({
    active,
    onEnd,
    size = 1000,
}) => {
    const [running, setRunning] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRunning(true);
        }, 1);
    }, []);
    const classes = useStyles({ size });
    const rootClass = clsx(classes.root, {
        [classes.notRunning]: !running,
        [classes.running]   : running,
    });
    return <div className={rootClass}></div>;
};
