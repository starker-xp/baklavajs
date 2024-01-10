import { defineNode, NodeInterface, TextInterface } from "@starker-xp/baklavajs";
import { toValue } from "vue";

export const DisplayNode = defineNode({
    type: "DisplayNode",
    title: "Display",
    inputs: {
        value: () => new NodeInterface("Value", ""),
    },
    outputs: {
        display: () => new TextInterface("Display", ""),
    },
    calculate({ value }) {
        return {
            display: toValue(value),
        };
    },
});
