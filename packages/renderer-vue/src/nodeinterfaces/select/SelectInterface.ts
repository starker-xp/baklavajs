import { type ComponentOptions, markRaw } from "vue";
import { NodeInterface } from "@starker-xp/baklavajs-core";
import SelectInterfaceComponent from "./SelectInterface.vue";

export interface IAdvancedSelectInterfaceItem<V> {
    text: string;
    value: V;
}

export type SelectInterfaceItem<V> = string | IAdvancedSelectInterfaceItem<V>;

export class SelectInterface<V = string> extends NodeInterface<V> {
    component = markRaw(SelectInterfaceComponent) as ComponentOptions;
    items: SelectInterfaceItem<V>[];

    constructor(name: string, value: V, items: SelectInterfaceItem<V>[]) {
        super(name, value);
        this.items = items;
    }
}

export { SelectInterfaceComponent };
