import { type ComponentOptions, markRaw } from "vue";
import { NodeInterface } from "@starker-xp/baklavajs-core";
import CheckboxInterfaceComponent from "./CheckboxInterface.vue";

export class CheckboxInterface extends NodeInterface<boolean> {
    component = markRaw(CheckboxInterfaceComponent) as ComponentOptions;
}

export { CheckboxInterfaceComponent };
