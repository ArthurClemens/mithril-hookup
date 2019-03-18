const customHooks = ({ useState }) => {
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
      const [arr, setArr] = useState(initialValue);
      return [
        arr,
        add => setArr(arr.concat(add)),
        remove => setArr(arr.filter(item => item !== remove))
      ];
    },
  };
  return hooks;
};

export default customHooks;
