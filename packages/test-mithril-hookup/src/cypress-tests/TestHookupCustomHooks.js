import m from "mithril";
import { hookup } from "mithril-hookup";

const customCounterHooks = ({ useState }) => ({
  useCount: (initialValue = 0) => {
    const [count, setCount] = useState(initialValue);
    return [
      count,                      // value
      () => setCount(count + 1),  // increment
      () => setCount(count - 1)   // decrement
    ];
  }
});

const CounterCustomHooks = hookup((vnode, { useCount }) => {
  const [count, increment, decrement] = useCount(0);

  return m("[data-test-id=CounterCustomHooks]", [
    m("h2", "CounterCustomHooks"),
    m("p", [
      m("span", "count: "),
      m("span[data-test-id=count]", count)
    ]),
    m("button[data-test-id=decrement]", 
      {
        disabled: count === 0,
        onclick: () => decrement()
      },
      "Less"
    ),
    m("button[data-test-id=increment]", 
      {
        onclick: () => increment()
      },
      "More"
    )
  ]);
}, customCounterHooks);

const customItemsHooks = ({ useState }) => {
  // Use a name to access it from hook functions
  const hooks = {
    useCounter: () => {
      // A custom hook that uses another custom hook.
      const createNewCounter = () => ({
        id: new Date().getTime(),
        initialCount: Math.round(Math.random() * 1000)
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

const ItemsCustomHooks = hookup((vnode, { useCounter }) => {
  const [counters, addCounter, removeCounter] = useCounter();
  const [lastItem, ] = counters.reverse();

  return m("[data-test-id=ItemsCustomHooks]", [
    m("h2", "ItemsCustomHooks"),
    m("p", [
      m("span", "counters: "),
      m("span[data-test-id=count]", counters.length)
    ]),
    m("button[data-test-id=decrement]", 
      {
        disabled: counters.length === 0,
        onclick: () => removeCounter(lastItem)
      },
      "Remove"
    ),
    m("button[data-test-id=increment]", 
      {
        onclick: () => addCounter()
      },
      "Add"
    )
  ]);
}, customItemsHooks);

export default ({
  view: () => [
    m(CounterCustomHooks),
    m(ItemsCustomHooks),
  ]
});
