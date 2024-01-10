import { Node } from "@starker-xp/baklavajs-core";
import { MultiSelectInterface } from "../src/nodeinterfaces/multiselect/MultiSelectInterface";
import { NodeInterface } from "@starker-xp/baklavajs";

interface Inputs {
    a: any;
}

export default class CountryNode extends Node<Inputs, Record<string, never>> {
    type = "CountryNode";
    width = 350;
    inputs = {
        a: new MultiSelectInterface("Select", {}, ""),
    };
    outputs = {
        output: new NodeInterface("Output", ""),
    };

    constructor() {
        super();
        this.initializeIo();
        this.title = "CountryNode";
    }

    calculate({ a }) {
        return { output: a };
    }
}
