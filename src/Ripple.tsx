import React, { FC, useCallback, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { RippleBody } from './RippleBody';

const useStyles = createUseStyles({
    root: {
        position: 'absolute',
        top     : 0,
        bottom  : 0,
        left    : 0,
        right   : 0,
    },
});

interface IRippleBodyGeometry {
    x: number;
    y: number;
    size: number;
    id?: number;
}

interface HavingID {
    id?: number;
}

class Stack<T extends HavingID> {
    private static instanceCounter = 0;
    private instances: T[];
    constructor(instances: T[] = []) {
        this.instances = instances; //TODO: fix Babel (or Storybook?) config in order to add it as an init arg
    }
    push(instance: T) {
        return new Stack<T>([
            ...this.instances,
            { ...instance, id: ++Stack.instanceCounter },
        ]);
    }
    pop() {
        return new Stack<T>(this.instances.slice(1));
    }
    map(fn: (item: T, index: number) => void) {
        return this.instances.map(fn);
    }
}

export const Ripple: FC = () => {
    const [stack, setStack] = useState<Stack<IRippleBodyGeometry>>(
        new Stack<IRippleBodyGeometry>([])
    );

    const handleMouseUp = useCallback(
        (e: React.MouseEvent) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const halfDiagonal =
                Math.sqrt(rect.width ** 2 + rect.height ** 2) / 2;

            const distanceFromCenter = Math.sqrt(
                (rect.width / 2 - x) ** 2 + (rect.height / 2) ** 2
            );
            const rippleRadius = halfDiagonal + distanceFromCenter;

            setStack(stack.push({ x, y, size: rippleRadius * 2 }));
            setTimeout(() => setStack((stack) => stack.pop()), 800); //TODO: unhardcode timeout
        },
        [stack]
    );

    const classes = useStyles();

    return (
        <div className={classes.root} onMouseUp={handleMouseUp}>
            {stack.map((item) => (
                <div
                    key={item.id}
                    style={{
                        left    : item.x,
                        top     : item.y,
                        position: 'absolute',
                    }}
                >
                    <RippleBody size={item.size} />
                </div>
            ))}
        </div>
    );
};
