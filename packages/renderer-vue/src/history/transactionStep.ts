import { Graph } from "@starker-xp/baklavajs-core";
import { IStep } from "./step";

export default class TransactionStep implements IStep {
    public type = "transaction";

    private steps: IStep[];

    public constructor(steps: IStep[]) {
        if (steps.length === 0) {
            throw new Error("Can't create a transaction with no steps");
        }
        this.steps = steps;
    }

    public undo(graph: Graph) {
        for (let i = this.steps.length - 1; i >= 0; i--) {
            this.steps[i].undo(graph);
        }
    }

    public redo(graph: Graph) {
        for (let i = 0; i < this.steps.length; i++) {
            this.steps[i].redo(graph);
        }
    }
}
