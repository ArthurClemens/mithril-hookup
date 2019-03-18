/* global m */
import { withHooks } from "../../../dist/mithril-hookup.mjs";

const customHooks = ({ useState }) => ({
  useCount: (initialValue = 0) => {
    const [count, setCount] = useState(initialValue);
    return [
      count,                      // value
      () => setCount(count + 1),  // increment
      () => setCount(count - 1)   // decrement
    ];
  }
});

const Counter = ({ initialCount, useCount, extra }) => {
  const [count, setCount] = useCount(initialCount);
  return m("div[data-test-id=counter]", [
    m("div", m("span[data-test-id=extra]", extra)),
    m("div", m("span[data-test-id=count]", count)),
    m("button[data-test-id=add-count]", {
      onclick: () => setCount(count + 1)
    }, "More"),
  ]);
};

const HookedCounter = withHooks(Counter, customHooks, { initialCount: 99, extra: "extra" });

const App = {
  view: () =>
    m(HookedCounter)
};

m.mount(
  document.querySelector("#root"),
  App
);
