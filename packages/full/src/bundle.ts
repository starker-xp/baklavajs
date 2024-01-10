import * as Core from "@starker-xp/baklavajs-core";
import * as Engine from "@starker-xp/baklavajs-engine";
import * as InterfaceTypes from "@starker-xp/baklavajs-interface-types";
import * as RendererVue from "@starker-xp/baklavajs-renderer-vue";

import { createApp, h } from "vue";
function createBaklava(element: Element): RendererVue.IBaklavaViewModel {
    let exportViewModel: RendererVue.IBaklavaViewModel;

    createApp({
        setup() {
            const viewModel = RendererVue.useBaklava();
            exportViewModel = viewModel;
            return { viewModel };
        },
        render() {
            return h(RendererVue.EditorComponent, { viewModel: this.viewModel });
        },
    }).mount(element);

    return exportViewModel!;
}

export { Core, Engine, InterfaceTypes, RendererVue, createBaklava };
