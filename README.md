# mithril-hookup

Use hook functions from the [React Hooks API](https://reactjs.org/docs/hooks-intro.html) in Mithril:

* `useState`
* `useEffect`
* `useLayoutEffect`
* `useReducer`
* `useRef`
* `useMemo`
* `useCallback`
* and custom hooks

```javascript
import { hookup } from "mithril-hookup"

const Counter = hookup((vnode, { useState }) => {

  const [count, setCount] = useState(0)

  return m("div", [
    m("p", 
      `Count: ${count}`
    ),
    m("button", 
      { onclick: () => setCount(count + 1) },
      "More"
    )
  ])
})
```


## Usage

```bash
npm install mithril-hookup
```

Use in code:

```javascript
import { hookup } from "mithril-hookup"
```


## Using hookup

`mithril-hookup` provides wrapper function `hookup` to enhance components with access to hook functions:

```javascript
import { hookup } from "mithril-hookup"

const HookedComponent = hookup((vnode, hookFunctions) => {
  // Do something with hook functions
  // for example: hookFunctions.useState
  // Return a view:
  return m("div", "contents")
})
```

The first parameter passed to `hookup` is a wrapper function - also called a closure - that provides access to the original component vnode and the hook functions:

```javascript
hookup(
  (vnode, hookFunctions) => {} // first parameter
)
```

Attributes passed to the component can be accessed through the `vnode`.

`hookFunctions` is an object that contains the default hook functions: `useState`, `useEffect`, `useReducer`, etcetera, plus [custom hooks](#custom-hooks) (if defined):

```javascript
const Counter = hookup((vnode, { useState }) => {
  
  const initialCount = vnode.attrs.initialCount
  const [count, setCount] = useState(initialCount)

  return [
    m("div", `count: ${count}`),
    m("button", 
      { onclick: () => setCount(count + 1) },
      "More"
    )
  ]
})

m(Counter, { initialCount: 0 })
```


## Rendering rules

### With useState

Mithril's `redraw` is called when the state is initially set, and every time a state changes value.


### With other hooks

Hook functions are always called at first render.

For subsequent renders, an optional second parameter can be passed to define if it should rerun:

```javascript
useEffect(
  () => {
    document.title = `You clicked ${count} times`
  },
  [count] // Only re-run the effect if count changes
)
```

According to the React Hooks API:

* No second argument: will run every render (Mithril lifecycle function [view](https://mithril.js.org/index.html#components)).
* An empty array: will only run at mount (Mithril lifecycle function [oncreate](https://mithril.js.org/lifecycle-methods.html#oncreate)).
* An array with variables: will only run whenever one of the variables has changed value (Mithril lifecycle function [onupdate](https://mithril.js.org/lifecycle-methods.html#onupdate)).


### Cleaning up

If a hook function returns a function, that function is called at unmount (Mithril lifecycle function [onremove](https://mithril.js.org/lifecycle-methods.html#onremove)).

```javascript
useEffect(
  () => {
    const subscription = subscribe()

    // Cleanup function:
    return () => {
      unsubscribe()
    }
  }
)
```

At cleanup Mithril's `redraw` is called.


## Default hook functions

The [React Hooks documentation](https://reactjs.org/docs/hooks-intro.html) provides excellent usage examples for default hooks. Let us suffice here with shorter descriptions.


### useState

Provides the state value and a setter function:

```javascript
const [count, setCount] = useState(0)
```

The setter function itself can pass a function - useful when values might otherwise be cached:

```javascript
setTicks(ticks => ticks + 1)
```

A setter function can be called from another hook:

```javascript
const [inited, setInited] = useState(false)

useEffect(
  () => {
    setInited(true)
  },
  [/* empty array: only run at mount */]
)
```


### useEffect

Lets you perform side effects:

```javascript
useEffect(
  () => {
    const className = "dark-mode"
    const element = window.document.body
    if (darkModeEnabled) {
      element.classList.add(className)
    } else {
      element.classList.remove(className)
    }
  },
  [darkModeEnabled] // Only re-run when value has changed
)
```


### useLayoutEffect

Similar to `useEffect`, but fires synchronously after all DOM mutations. Use this when calculations must be done on DOM objects.

```javascript
useLayoutEffect(
  () => {
    setMeasuredHeight(domElement.offsetHeight)
  },
  [screenSize]
)
```

### useReducer

From the [React docs](https://reactjs.org/docs/hooks-reference.html#usereducer):

> An alternative to useState. Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method. (If you’re familiar with Redux, you already know how this works.)
> 
> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.

Example:

```javascript
const counterReducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 }
    case "decrement":
      return { count: state.count - 1 }
    default:
      throw new Error("Unhandled action:", action)
  }
}

const Counter = hookup(
  (
    { attrs: { initialCount }},
    { useReducer }
  ) => {
  const initialState = { count: initialCount }
  const [countState, dispatch] = useReducer(counterReducer, initialState)
  const count = countState.count

  return [
    m("div", count),
    m("button", {
      disabled: count === 0,
      onclick: () => dispatch({ type: "decrement" })
    }, "Less"),
    m("button", {
      onclick: () => dispatch({ type: "increment" })
    }, "More")
  ]
})

m(Counter, { initialCount: 0 })
```


### useRef

The "ref" object is a generic container whose `current` property is mutable and can hold any value.

```javascript
const dom = useRef(null)

return [
  m("div",
    {
      oncreate: vnode => dom.current = vnode.dom
    },
    count
  )
]
```

To keep track of a value:

```javascript
const Timer = hookup(
  (
    vnode,
    { useState, useEffect, useRef }
  ) => {
    const [ticks, setTicks] = useState(0)
    const intervalRef = useRef()
    
    const handleCancelClick = () => {
      clearInterval(intervalRef.current)
      intervalRef.current = undefined
    }
  
    useEffect(
      () => {
        const intervalId = setInterval(() => {
          setTicks(ticks => ticks + 1)
        }, 1000)
        intervalRef.current = intervalId
        // Cleanup:
        return () => {
          clearInterval(intervalRef.current)
        }
      },
      [/* empty array: only run at mount */]
    )

    return [
      m("span", `Ticks: ${ticks}`),
      m("button", 
        {
          disabled: intervalRef.current === undefined,
          onclick: handleCancelClick
        },
        "Cancel"
      )
    ]
  }
)
```


### useMemo

Returns a memoized value.

```javascript
const Counter = hookup(
  (
    { attrs: { count }},
    { useMemo }
  ) => {
    const memoizedValue = useMemo(
      () => {
        return computeExpensiveValue(count)
      },
      [count] // only calculate when count is updated
    )
    // ...
  }
)
```


### useCallback

Returns a memoized callback.

The function reference is unchanged in next renders (which makes a difference in performance expecially in React), but its return value will not be memoized.

```javascript
let previousCallback = null;

const memoizedCallback = useCallback(
  () => {
    doSomething(a, b)
  },
  [a, b]
)

// Testing for reference equality:
if (previousCallback !== memoizedCallback) {
  // New callback function created
  previousCallback = memoizedCallback
  memoizedCallback()
} else {
  // Callback function is identical to the previous render
}
```


## Custom hooks

Custom hooks are defined by a function that accepts the default hooks, and returns an object with your custom hook functions:

```javascript
const customHooks = ({ useState /* or other default hooks */ }) => ({
  useCount: (initialValue = 0) => {
    const [count, setCount] = useState(initialValue)
    return [
      count,                      // value
      () => setCount(count + 1),  // increaseCount
      () => setCount(count - 1)   // decreaseCount
    ]
  }
})
```

Pass the custom hooks as second parameter to `hookup`:

```javascript
hookup(
  (vnode, hookFunctions) => {} // first parameter - hookFunctions will include hooks from customHooks
  customHooks                  // second parameter
)
```

The custom hooks are now accessible from the hooked component:

```javascript
const Counter = hookup(
  (
    vnode,
    { useCount }
  ) => {
    const [count, increaseCount, decreaseCount] = useCount(0)
    // ...
  },
  customHooks
)
```

A more complete example:

```javascript
const Counter = hookup(
  (
    { attrs: { initialCount }},
    { useCount }
  ) => {

    const [count, increaseCount, decreaseCount] = useCount(initialCount)

    return m("div", [
      m("p", 
        `Count: ${count}`
      ),
      m("button", 
        {
          disabled: count === 0,
          onclick: () => decreaseCount()
        },
        "Less"
      ),
      ("button", 
        {
          onclick: () => increaseCount()
        },
        "More"
      )
    ])
  },
  customHooks
)

m(Counter, { initialCount: 0 })
```

## Compatibility

Works with Mithril 1.1.6 and Mithril 2.x.


## History

* First implementation: Barney Carroll (https://twitter.com/barneycarroll/status/1059865107679928320)
* Updated and enhanced by Arthur Clemens


## License

MIT
