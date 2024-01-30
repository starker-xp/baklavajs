import { type ComponentOptions, markRaw } from "vue";
import { NodeInterface } from "@starker-xp/baklavajs-core";
import TextareaInputInterfaceComponent from "./TextareaInputInterface.vue";

export class TextareaInputInterface extends NodeInterface<string> {
    component = markRaw(TextareaInputInterfaceComponent) as ComponentOptions;
}

export { TextareaInputInterfaceComponent };
