import m from "mithril";

const Counter = ({ initialCount, useState, useCounter }) => {
  const [count, setCount] = useState(initialCount);
  const [counters, addCounter, removeCounter] = useCounter();
  const [lastItem, ...rest] = counters.reverse();

  return m("div[data-test-id=counter]", [
    m("div", m("span[data-test-id=count]", count)),
    m("button[data-test-id=add-count]",
      {
        onclick: () => setCount(count + 1)
      },
      "More"
    ),
    m("div", m("span[data-test-id=counters]", counters.length)),
    m("button[data-test-id=remove-counter]", 
      {
        disabled: counters.length === 0,
        onclick: () => removeCounter(lastItem)
      },
      "Remove counter"
    ),
    m("button[data-test-id=add-counter]",
      {
        onclick: () => addCounter()
      },
      "Add counter"
    ),
  ]);
};

export default Counter;
