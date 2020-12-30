# ripple

An example of ripple effect component

## Usage

```tsx
import React, { FC } from 'react';
import {Ripple} from 'ripple'

export const App: FC = () => {
    return (
        <div>
            <button>
                <Ripple />
                Hello
            </button>
            <button>
                <Ripple color="red" />
                Red
            </button>
            <button>
                <Ripple unbounded unboundedSize={400} />
                Unbounded
            </button>
        </div>
    );
};

```

## API

**color?: string | string[];** - ripple color. If an array is specified, each time it will be picked randomly.
**unbounded?: boolean;** - do not bound to the element
**unboundedSize?: number;** - maximum size of ripple circle if it is not bounded. (The size of a bounded ripple is calculated from the parent element)
**timeout?: number;** - a time interval of ripple animation
