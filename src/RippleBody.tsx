import clsx from 'clsx';
import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
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

const getStyles = (
    size: number,
    running: boolean,
    color: string
): CSSProperties => ({
    background   : color,
    position     : 'absolute',
    top          : -size / 2,
    left         : -size / 2,
    width        : size,
    height       : size,
    borderRadius : size / 2,
    transform    : `scale(${1 / size})`,
    zIndex       : 0,
    pointerEvents: 'none',
    ...(running
        ? {
            transitionProperty: 'transform, opacity',
            transitionDuration: '0.8s',
            transform         : 'scale(1)',
            opacity           : 0,
        }
        : {}),
});

export interface IRippleBodyProps {
    size?: number;
    color?: string;
}
export const RippleBody: FC<IRippleBodyProps> = ({
    size = 1000,
    color = '#999',
}) => {
    const [running, setRunning] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRunning(true);
        }, 1);
    }, []);
    const styles = useMemo(() => getStyles(size, running, color), [
        size,
        running,
        color,
    ]);
    return <div style={styles} />;
};
