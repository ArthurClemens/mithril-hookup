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

const Counter = ({ initialCount, useState, useCounter, extra }) => {
  const [count, setCount] = useState(initialCount);
  const [counters, addCounter,] = useCounter();
  return m("div[data-test-id=counter]", [
    m("div", m("span[data-test-id=extra]", extra)),
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

const HookedCounter = withHooks(Counter, myCustomHooks, { initialCount: 99, extra: "extra" });

export default ({
  view: () => [
    m(HookedCounter),
  ]
});
