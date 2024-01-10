<script setup>
import ApiLink from "../components/ApiLink.vue";
</script>

# Setup

## View Model

There is one key component you need when using the visual editor: the _view model_. You can create a new view model by using the <ApiLink type="functions" module="@starker-xp/baklavajs-renderer-vue" name="useBaklava"><code>useBaklava</code></ApiLink> function. The view model has the following type:

```ts
interface IBaklavaViewModel {
    editor: Editor;
    /** Currently displayed graph */
    displayedGraph: Graph;
    /** True if the currently displayed graph is a subgraph, false if it is the root graph */
    isSubgraph: Readonly<boolean>;
    settings: IViewSettings;
    commandHandler: ICommandHandler;
    history: IHistory;
    clipboard: IClipboard;
    hooks: {
        /** Called whenever a node is rendered */
        renderNode: SequentialHook<{ node: AbstractNode; el: HTMLElement }, null>;
        /** Called whenever an interface is rendered */
        renderInterface: SequentialHook<{ intf: NodeInterface<any>; el: HTMLElement }, null>;
    };
    switchGraph: (newGraph: Graph | GraphTemplate) => void;
}
```

The view model is reactive so it can be used in watchers, computed properties, etc.

::: warning
The `useBaklava` function accepts an existing editor instance as parameter. However, because of the way Vue's reactivity system works you'll need to use the viewModel.editor property afterwards instead of your own reference to the editor.
:::

## Editor Component

Now you can pass the view model to the editor component:

```vue
<template>
    <baklava-editor :view-model="baklava" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { EditorComponent, useBaklava } from "@starker-xp/baklavajs-renderer-vue";
import "@starker-xp/baklavajs-themes/syrup-dark.css";

export default defineComponent({
    components: {
        "baklava-editor": EditorComponent,
    },
    setup() {
        const baklava = useBaklava();
        return { baklava };
    },
});
</script>
```

## Settings

Settings can be changed by accessing the `settings` property of the view model right after creating it or reactively at any moment later.

### Properties

| name                               | data type         | default |
| ---------------------------------- | ----------------- | ------- |
| useStraightConnections             | boolean           | false   |
| minimap.enabled                    | boolean           | false   |
| toolbar.enabled                    | boolean           | true    |
| palette.enabled                    | boolean           | true    |
| background.gridSize                | number            | 100     |
| background.gridDivision            | number            | 5       |
| background.subGridVisibleThreshold | number            | 0.6     |
| sidebar.enabled                    | boolean           | true    |
| sidebar.width                      | number            | 5       |
| sidebar.resizable                  | boolean           | true    |
| displayValueOnHover                | boolean           | false   |
| nodes.defaultWidth                 | boolean           | 200     |
| nodes.maxWidth                     | number            | 320     |
| nodes.minWidth                     | boolean           | 150     |
| nodes.resizable                    | boolean           | false   |
| contextMenu.enabled                | boolean           | true    |
| contextMenu.additionalItems        | ContextMenuItem[] | []      |

For example, to enable displaying the value of a node interface on hover:

```ts
const baklava = useBaklava();
baklava.settings.displayValueOnHover = true;
```

You can find all available settings <ApiLink type="interfaces" module="@starker-xp/baklavajs-renderer-vue" name="IViewSettings">here</ApiLink>.