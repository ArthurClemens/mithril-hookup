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

const Counter = ({ initialCount, useCount }) => {

  const [count, increment, decrement] = useCount(initialCount)

  return m("div", [
    m("p", 
      `Count: ${count}`
    ),
    m("button", 
      {
        disabled: count === 0,
        onclick: () => decrement()
      },
      "Less"
    ),
    m("button", 
      {
        onclick: () => increment()
      },
      "More"
    )
  ]);
};

const HookedCounter = withHooks(Counter, customHooks);

const App = {
  view: () =>
    m(HookedCounter)
};

m.mount(
  document.querySelector("#root"),
  App
);
