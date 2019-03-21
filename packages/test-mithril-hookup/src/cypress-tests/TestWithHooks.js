import m from "mithril";
import { withHooks } from "mithril-hookup";

const myCustomHooks = ({ useState }) => {
  // Use a name to access it from hook functions
  const hooks = {
    useCounter: () => {
      // A custom hook that uses another custom hook.
      const createNewCounter = () => ({
        id: new Date().getTime(),
        initialCount: Math.round(Math.random() * 10)
      });
      const firstCounter = createNewCounter();
      const [counters, addCounter, removeCounter] = hooks.useArray([firstCounter]);
      return [
        counters,
        () => addCounter(createNewCounter()),
        remove => removeCounter(remove)
      ];
    },
    useArray: (initialValue = []) => {
      const [arr, setArr] = useState(initialValue)
      return [
        arr,
        add => setArr(arr.concat(add)),
        remove => setArr(arr.filter(item => item !== remove))
      ];
    },
  };
  return hooks;
};

const Counter = ({ initialCount, useState, useCounter }) => {
  const [count, setCount] = useState(initialCount);
  const [counters, addCounter,] = useCounter();
  return m("div[data-test-id=counter]", [
    m("div", m("span[data-test-id=count]", count)),
    m("button[data-test-id=add-count]", {
      onclick: () => setCount(count + 1)
    }, "More"),
    m("div", m("span[data-test-id=counters]", counters.length)),
    m("button[data-test-id=add-counter]", {
      onclick: () => addCounter()
    }, "Add counter")
  ]);
};

const SimpleCounter = ({ initialCount, useState }) => {
  const [count, setCount] = useState(initialCount);
  return m("div[data-test-id=simple-counter]", [
    m("div", m("span[data-test-id=count]", count)),
    m("button[data-test-id=add-count]", {
      onclick: () => setCount(count + 1)
    }, "More"),
  ]);
};

const SimpleCounterWithChildren = ({ initialCount, useState, children }) => {
  const [count, setCount] = useState(initialCount);
  return m("div[data-test-id=simple-counter-with-children]", [
    m("div", m("span[data-test-id=count]", count)),
    m("button[data-test-id=add-count]", {
      onclick: () => setCount(count + 1)
    }, "More"),
    m("div[data-test-id=children]",
      children
    )
  ]);
};

const HookedCounter = withHooks(Counter, myCustomHooks);
const HookedSimpleCounter = withHooks(SimpleCounter);
const HookedSimpleCounterWithChildren = withHooks(SimpleCounterWithChildren);

export default ({
  view: () => [
    m(HookedCounter, { initialCount: 1 }),
    m(HookedSimpleCounter, { initialCount: 10 }),
    m(HookedSimpleCounterWithChildren, { initialCount: 10 }, [
      m("div", "One"),
      m("div", "Two"),
      m("div", "Three"),
    ]),
  ]
});
