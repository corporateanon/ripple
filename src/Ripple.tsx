import React, { FC, useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { RippleBody } from './RippleBody';
import clsx from 'clsx';
import { ImmutableStack } from './ImmutableStack';

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

interface IRippleBodyGeometry {
    x: number;
    y: number;
    size: number;
}

interface IRippleProps {
    color?: string | string[];
    unbounded?: boolean;
    unboundedSize?: number;
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
}) => {
    const rippleColor = Array.isArray(color)
        ? color[Math.floor(Math.random() * color.length)]
        : color;

    const [stack, setStack] = useState<ImmutableStack<IRippleBodyGeometry>>(
        new ImmutableStack<IRippleBodyGeometry>()
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

            setStack(stack.push({ x, y, size: rippleRadius * 2 }));
            setTimeout(() => setStack((stack) => stack.pop()), 800); //TODO: unhardcode timeout
        },
        [stack]
    );

    const classes = useStyles();

    const rootClass = clsx(classes.root, {
        [classes.unbounded]: unbounded,
    });

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
                    <RippleBody size={item.size} color={rippleColor} />
                </div>
            ))}
        </div>
    );
};
