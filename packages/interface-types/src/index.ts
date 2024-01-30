/**
 * @module @starker-xp/baklavajs-interface-types
 */

import type { Editor, NodeInterface } from "@starker-xp/baklavajs-core";
import type { IBaklavaViewModel } from "@starker-xp/baklavajs-renderer-vue";
import type { BaseEngine } from "@starker-xp/baklavajs-engine";

export interface IConversion<I, O> {
    targetType: string;
    transformationFunction(value: I): O;
}

export interface BaklavaInterfaceTypesOptions {
    viewPlugin?: IBaklavaViewModel;
    engine?: BaseEngine<any, any>;
}

export class NodeInterfaceType<T> {
    public conversions: Array<IConversion<T, any>> = [];
    public constructor(public name: string) {}

    /**
     * A conversion makes it possible to connect two node interfaces although they have different types.
     * @param to Type to convert to
     * @param transformationFunction
     * Will be called to transform the value from one type to another.
     * A transformation to convert the type `string` to `number` could be `parseInt`.
     *
     * @returns the instance the method was called on for chaining
     */
    public addConversion<O>(to: NodeInterfaceType<O>, transformationFunction: (value: T) => O = (value: any) => value) {
        this.conversions.push({
            targetType: to.name,
            transformationFunction,
        });
        return this;
    }
}

export function setType<T>(intf: NodeInterface<T>, type: NodeInterfaceType<T>) {
    intf.type = type.name;
}
/** Use this function to set the type for a NodeInterface with `allowMultipleConnections` */
export function setTypeForMultipleConnections<T>(intf: NodeInterface<T[]>, type: NodeInterfaceType<T>) {
    intf.type = type.name;
}

export function getType<T>(intf: NodeInterface<T>): string | undefined {
    return intf.type;
}

export class BaklavaInterfaceTypes {
    private editor: Editor;
    private types: Map<string, NodeInterfaceType<any>> = new Map();

    public constructor(editor: Editor, options?: BaklavaInterfaceTypesOptions) {
        this.editor = editor;

        this.editor.graphEvents.checkConnection.subscribe(this, ({ from, to }, prevent) => {
            const fromType = from.type;
            const toType = to.type;
            if (!fromType || !toType) {
                return;
            } else if (!this.canConvert(fromType, toType)) {
                return prevent();
            }
        });

        if (options?.engine) {
            options.engine.hooks.transferData.subscribe(this, (value, connection) => {
                const fromType = connection.from.type;
                const toType = connection.to.type;
                if (!fromType || !toType) {
                    return value;
                }
                return this.convert(fromType, toType, value);
            });
        }

        if (options?.viewPlugin) {
            options.viewPlugin.hooks.renderInterface.subscribe(this, ({ intf, el }) => {
                if (intf.type) {
                    el.setAttribute("data-interface-type", intf.type);
                }
                return { intf, el };
            });
        }
    }

    /**
     * Add a new node interface type
     * @param types The types to add
     */
    public addTypes(...types: Array<NodeInterfaceType<unknown>>): this {
        types.forEach((t) => {
            this.types.set(t.name, t);
        });
        return this;
    }

    public getConversion<I = any, O = any>(from: string, to: string): IConversion<I, O> | null {
        return this.types.get(from)?.conversions.find((c) => c.targetType === to) ?? null;
    }

    public canConvert(from: string, to: string): boolean {
        return (
            from === to || (this.types.has(from) && this.types.get(from)!.conversions.some((c) => c.targetType === to))
        );
    }

    public convert<I = any, O = any>(from: string, to: string, value: I): O {
        if (from === to) {
            return value as unknown as O;
        } else {
            const c = this.getConversion(from, to);
            if (c) {
                return c.transformationFunction(value);
            } else {
                throw Error(`Can not convert from "${from}" to "${to}"`);
            }
        }
    }
}
