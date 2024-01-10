import { type ComponentOptions, markRaw } from "vue";
import { NodeInterface } from "@starker-xp/baklavajs-core";
import MultiSelectInterfaceComponent from "./MultiSelectInterface.vue";

export class MultiSelectInterface<V = string> extends NodeInterface<V> {
    component = markRaw(MultiSelectInterfaceComponent) as ComponentOptions;
    baseUri: string;

    constructor(name: string, value: V, baseUri: string) {
        super(name, value);
        this.baseUri = baseUri;
    }
}

export { MultiSelectInterfaceComponent };
