# Pre-defined interfaces

## ButtonInterface

Displays a button and calls the provided callback when the button is clicked.

```js
import { ButtonInterface } from "@starker-xp/baklavajs";
new ButtonInterface("Name", () => console.log("Button clicked"));
```

## CheckboxInterface

Displays a checkbox.
Expects a `boolean` value.

```js
import { CheckboxInterface } from "@starker-xp/baklavajs";
new CheckboxInterface("Name", true);
```

## IntegerInterface

Displays a numeric input that accepts integers.
You can optionally provide minimum and maximum values.

```js
import { IntegerInterface } from "@starker-xp/baklavajs";

// without min and max values
new IntegerInterface("Name", 5);

// with min and max values
new IntegerInterface("Name", 5, 0, 10);
```

## NumberInterface

Similar to the [`IntegerInterface`](#integerinterface), but also accepts decimal values.

```js
import { NumberInterface } from "@starker-xp/baklavajs";

// without min and max values
new NumberInterface("Name", 0.5);

// with min and max values
new NumberInterface("Name", 0.5, 0, 1);
```

## SelectInterface

Displays a dropdown from which a single value can be chosen.
Expects a list of possible values as the third parameter.
The list of values can either be an array of strings (`string[]`) or an array of objects with this format:

```js
{
    text: "I will be displayed", // must be a string
    value: 1 // can be any type
}
```

```js
import { SelectInterface } from "@starker-xp/baklavajs";

new SelectInterface("Name", "Add", ["Add", "Subtract"]);

new SelectInterface("Name", 1, [
    { text: "A", value: 1 },
    { text: "B", value: 2 },
    { text: "C", value: 3 },
]);
```

## SliderInterface

Similar to the [`NumberInterface`](#numberinterface) but displays a slider instead of increase/decrease buttons.
Minimum and maximum values are required for this interface.

```js
import { SliderInterface } from "@starker-xp/baklavajs";
new SliderInterface("Name", 0.5, 0, 1);
```

## TextInterface

A simple interface that just displays the value as text. Can't be used to edit the value.

::: warning
The name of this interface will likely change in the future.
:::

```js
import { TextInterface } from "@starker-xp/baklavajs";
new TextInterface("Name", "Hello World!");
```

## TextInputInterface

This interface displays a text field that the user can type into.

```js
import { TextInputInterface } from "@starker-xp/baklavajs";
new TextInputInterface("Name", "Edit me");
```
