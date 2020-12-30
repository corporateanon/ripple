import React, { FC, useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { RippleBody } from './RippleBody';
import clsx from 'clsx';
import { ImmutableStack } from './ImmutableStack';
import { randomElement } from './randomElement';

const useStyles = createUseStyles({
    root: {
        position: 'absolute',
        overflow: 'hidden',
        top     : 0,
        bottom  : 0,
        left    : 0,
        right   : 0,
    },
    unbounded: {
        overflow: 'visible',
    },
});

interface IRippleBodyInstance {
    x: number;
    y: number;
    size: number;
    color: string;
}

interface IRippleProps {
    color?: string | string[];
    unbounded?: boolean;
    unboundedSize?: number;
    timeout?: number;
}

const getRippleRadius = (rect: DOMRect, targetX: number, targetY: number) => {
    const halfDiagonal = Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2;

    const distanceFromCenter = Math.sqrt(
        (rect.width / 2 - targetX) ** 2 + (rect.height / 2 - targetY) ** 2
    );
    return halfDiagonal + distanceFromCenter;
};

export const Ripple: FC<IRippleProps> = ({
    color = '#888',
    unboundedSize = 1000,
    unbounded,
    timeout = 800,
}) => {
    const classes = useStyles();

    const rootClass = clsx(classes.root, {
        [classes.unbounded]: unbounded,
    });

    const [stack, setStack] = useState<ImmutableStack<IRippleBodyInstance>>(
        new ImmutableStack<IRippleBodyInstance>()
    );

    const handleMouseUp = useCallback(
        (e: React.MouseEvent) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rippleRadius =
                unbounded && unboundedSize
                    ? unboundedSize / 2
                    : getRippleRadius(rect, x, y);

            setStack(
                stack.push({
                    x,
                    y,
                    size : rippleRadius * 2,
                    color: Array.isArray(color) ? randomElement(color) : color,
                })
            );
            setTimeout(() => setStack((stack) => stack.pop()), timeout);
        },
        [stack]
    );

    return (
        <div className={rootClass} onMouseUp={handleMouseUp}>
            {stack.map((item, id) => (
                <div
                    key={id}
                    style={{
                        left    : item.x,
                        top     : item.y,
                        position: 'absolute',
                    }}
                >
                    <RippleBody
                        size={item.size}
                        color={item.color}
                        timeout={timeout}
                    />
                </div>
            ))}
        </div>
    );
};
