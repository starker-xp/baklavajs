// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NodeInterface } from "@starker-xp/baklavajs-core/dist/nodeInterface";

declare module "@starker-xp/baklavajs-core/dist/nodeInterface" {
    interface NodeInterface {
        allowMultipleConnections?: boolean;
    }
}
