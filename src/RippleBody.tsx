import React, { CSSProperties, FC, useEffect, useMemo, useState } from 'react';

const getStyles = (
    size: number,
    running: boolean,
    color: string,
    timeout: number
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
            transitionDuration: `${timeout / 1000}s`,
            transform         : 'scale(1)',
            opacity           : 0,
        }
        : {}),
});

export interface IRippleBodyProps {
    size?: number;
    color?: string;
    timeout?: number;
}
export const RippleBody: FC<IRippleBodyProps> = ({
    size = 1000,
    color = '#999',
    timeout = 800,
}) => {
    const [running, setRunning] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setRunning(true);
        }, 1);
    }, []);
    const styles = useMemo(() => getStyles(size, running, color, timeout), [
        size,
        running,
        color,
        timeout,
    ]);
    return <div style={styles} />;
};
