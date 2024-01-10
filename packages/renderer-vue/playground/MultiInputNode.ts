import { NodeInterface, defineNode } from "@starker-xp/baklavajs-core";
import { allowMultipleConnections } from "@starker-xp/baklavajs-engine";
import { setTypeForMultipleConnections } from "@starker-xp/baklavajs-interface-types";
import { stringType } from "./interfaceTypes";
import { TextInterface } from "../src";

export default defineNode({
    type: "MultiInputNode",
    inputs: {
        data: () =>
            new NodeInterface<string[]>("Data", [])
                .use(allowMultipleConnections)
                .use(setTypeForMultipleConnections, stringType),
    },
    outputs: {
        output: () => new TextInterface("Output", ""),
    },
    calculate({ data }) {
        return { output: data.join(", ") };
    },
});
