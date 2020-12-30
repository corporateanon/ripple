interface Counted<T> {
    id: number;
    item: T;
}

export class ImmutableStack<T> {
    private static instanceCounter = 0;
    private instances: Counted<T>[] = [];
    push(item: T): ImmutableStack<T> {
        const stack = new ImmutableStack<T>();
        stack.instances = [
            ...this.instances,
            { item, id: ++ImmutableStack.instanceCounter },
        ];
        return stack;
    }
    pop(): ImmutableStack<T> {
        const stack = new ImmutableStack<T>();
        stack.instances = this.instances.slice(1);
        return stack;
    }
    map<R>(fn: (item: T, id: number) => R): R[] {
        return this.instances.map((instance) => fn(instance.item, instance.id));
    }
}
