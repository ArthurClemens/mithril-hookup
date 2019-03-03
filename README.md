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

  return [
    m("div", count),
    m("button", {
      onclick: () => setCount(count + 1)
    }, "More")
  ]
})
```

## Examples

Editable examples using the [Flems playground](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YN0LiA1gFcz3ZdzBis3YVgjFCEWgAWntaZzNhAG5BNFiDOGsAQTNXfjtHFwAKWO5uHLQ8vM40WjYYClyi2yc4GABlYgxGNyqASm5+KRsq2VluBOtkaigIagcYNgpuOuIAYVHxyYBdTu5ahqbGLLAMKDq2mMLuERhiJxFC5Cq8quWj5UPY2Kx8LFonBgK8tlpqJxwDHwAEcnDARABPeowWDUYiWHIgADEYgkwjalWOKUiaEOlBAdVhxAg9AQWgAjAA2RAAJhUahAmBweHw1Dgeho9EYzC0KmWVFGaAcZNQjI0eD8ASCUFCmTM+Iu5C0JGIZjgiD6nzMDgA5qzaFhZJLAiEwhEAAIABnw5Jt8ggiSN-hNMrNLnxxAhZk0BOoQTMxlU6mZWmN0vNaBgAA9jFRFXgVWqNbItbr9Yaw9BzTT8NbLcERNR8AAWJ1S6D4XQer0+uB+iABvnKIA):

* [Simplest example](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YN0LiA1gFcz3ZdzBis3YVgjFCEWgAWntaZzNhAG5BNFiDOGsAQTNXfjtHFwAKWO5uHLQ8vM40WjYYClyi2yc4GABlYgxGNyqASm5+KRsqhOtkaigIagcYNgpuOuIAYSGRsYBdTu5ahqbGLLAMKDq2mMLuERhiJxFC5Cq8rByQBWEJgANZ4dG2RG4AEmBBl7H8YlojSCaAA5lk2soHm1KgcrjcAEZOYgAuKUS7VdFFbj0H4jd7gzrdKbPeZsLLEEROGBtTFuGFYvLCEkOYTomkHBb7ZR7WKxLD4LC0JwMAp5Ni0ahOHAMfAARypIgAnvUYLBqACRDcAMRiCTCaFVFKRNB7SggOpq4gQegILQAdkQABYABwqNQgTA4PD4ahwPQ0eiMZhaFQLKhDNAOW2oD0aPB+AJBKChTJmM2nchaEjEMxwRCyWTCswOEE+2hYWQJwIhMIRAACAAZ8ABGFvyCCJSv+avJ2suM3ERVmTTm6hBMzGVTqL1aKtJutoGAAD2MVAzeGzufzhbQxdLdArc+gdYATPgmw3giJqPhHV3E9B8LoB0OR3AxxAJ6HlEA)
* [Very simple form handling with useState](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YN0LiA1gFcz3ZdzBis3YVgjFCEWgAWntaZzNhAG5BNFiDOGsAQTNXfjtHFwAKWO5uHLQ8vM40WjYYClyi2yc4GABlYgxGNyqASm5+KRsqhOtkWpgRTBwKbjriAFU64Y0AXU7uQcbmmByQYTaYwu4+7mQIOAAFWkSINABzMYmASWPT4nOLhfTlpsYssAwoOq3Y3voiTsGDQbFgAGFCCCLjBpkMRjBFoiuj0dnkJnDZjgsjB8E0RDDiPhON8nDA-jtlNsAWggVDQbB6k4AEZ+azpZHdYBVPIQMD5QZYxEAQn46WEm1RRSKt3uZ0uWWIIjJFOl7hgP0R3LRRW+Q2I6wAooYRNwMEsZgjNts1TzuLizCIYJwjAARGBfJxQA2qtw2nw7J3EJzDfZ2rDrSKUbgAA0xCMQ3AAJMBBQjuAAfDM+EAAOQk4xgkhUMbalR1EeEYEsWGE5eleW1DaK1CgGDgcFzGkTwjMIZgwWrIm8fadg5rwUSGGoDhgbDrdulgJZbMT9LBDRX-kXbnrDcr4AgGrYEzrYZ10oPCgXF-363OfeLe+b0qbL+bZjb1Bg9ig5REPYgPGGg3u+zYJjmaYgZQO7viSUBkomUGjLBL70A+TjEGuIIbpC0KwpaGjPmBeQcHAGDMrAbCJocJzylcqG2re0ptKhZaoVeXBnox3AHsymHEPQoEkVKIl5K27adt2OajgO-HEIJhSycE8mKcEjqmBgIgAJ7CWJxDaWYMCAXAW5Pjx0pkRRVE0XKjyXMR76qBZOb1Ew84bMxRSsV5PnNnMfneVUczbMoFKxFg+BYLQTgMAUpG0NQTg4Aw+AAI5kjpbmwNQgkiOsADEYgSJse4pJEaBbJQIB1DljyAngAAsACMiDNQADCoaggAieD4NQHbVQYjDMFozJlNpolmBgbAcJciYAEztWYAAeoXVbVMC5RADVaK1zUAGwqHMVBQOcDgICg6g4HgbKBNA1UhuQWgkMQZhwIgsiyLFZgOBc-W0Fgsh3UEUAAALNfgkMHcD-j3VA+C6NVBlGXgcDUEEZjGKo12aCAIMhGEESPSIz0gK972fd9aC-f9dBAwTUChJkZhg+1UNQ-IhzELDASg8z4QuMjhl4+jmPY91vVaMpfhoP1g1UE9eAUx9X0-X9ANA7JA1wBD+Ds+1sj8dAbCyDL5zy3oIAo6LBmwMdyhAA)
* [Custom hooks and useReducer](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADxQIANwAE0ALwAdED2Lr7APiMB6U2Ze3SOlgiE6hBkMsoCSACcIAC+eHIKSioAVjIEJHoG6jQQYIzEXOoWwBaqxMQA1gCujBYxFuI8YBb2kOqqXFIAtGWVNfYA3L6+GeRFhFVjxGAAEuUV5BbWFgAUJZPwAMrq9Pp1AJRLLsW+Fhbu7hYAqiwW9BbyihbqxHeEhPDkixBFjdOl8waVVIQRCFFOFlGRV6CyWJ1IZzOGwAwsRgfouEhVodrMdgBDEedLgBBSGTF7NGHPVS7CwbRb0UhOVTwLhkqaU+YYAmIqGQrjwXbwABy8AA7qj0ay4Ssccc1jzCdAsaRxRYACJC2UYADm8HUABVcvBZXhFYiIKQfhB6LBJXosQBZXaqDA8YFQFbO9puxlQaayiwAKgsOAE+3NMX2QwRhMhoV+EC4Y3tGLh3EF+lFErRmS4spjcfjFCKfBIUuTeDuMFTrKrArAxDM8FrXBEcJh5AwG2JXC49AAnis+JJk+pWyJo+aBeoqlwEXxzWdy3nyGbY0XA7jq1BWysM0Ls3v9vt10Wzg2m-AjhZL8293f4BGN4iRIXEXEeT2+4OsStLdatoAGq2lU17LHwk43viL7LgmFh8PQfZViw6i9m2cIbNsWoAcEwGgU+076nOC5LncyFkfQMA3qh6ErEhXAYBkhC7PRMAnme56PjR+p0QxGCSLAGL-vozTbj88DNAAhNYyyPie5oiDyn6xjE74ziRAKVOQMZqcMILwSuGIAEqsFUHxsssKxjEKVb0KCZByvCZzkGKPyEKoqz2cEZAYOoA6ME+zm8vQtz2JaGaKHo9hIERs7zsU8boliNn6ExuZFAA1KGdTvsuoXXvYUDwJFWQxXFmklEZKU7GlRkWF0OV6S+xXiPQVRCbFsHUjwYoPGqACifYFCs9hXKQNKkHArBvD5pCxews1glOqm+M1Izwa2HbzDUo2xnthIlLs6jJliJTQFWuE2naGX1pJV5bTEKmEhcGrwG1HXQvMDJTeyFJaQsXWHXSLADeI4gleoVYbAAMoOaLqGDENBNDLDYfoqPwKZ4iY6ZUDmXWIPwAAkla+hQHUEJOTBZwQnyuGpumGU3msSV6Ac758mWGXo-AVamOQjC7B57bLBseME-mRmshLFmXWT12pvLPypitcElmzRTLEZvPpeiMZ0-BfC4awKH6qTElQKLRO8ysbWwCwavFmMFj+mJRPYwWhsa27qYDQgUVax771e7G3su9xVnUzyfKPgA8qQBr9hQ1pkANv1RyzRGNveGWsv+UCnuabtMXOAp6G693NgNzZ6DDEBjAY+f2CdjLkKnqpTfYd05-ACdJ23Hfp4XPJO2cJcTH2WQYFRUA11k9eN6q+Yt8n7dzQYUDd7eVd94na9D1NY+u9MpdTxXhAMF8i-qJXvejSA3nmPA9hO81tOxhsSOQysW54jyqELbkxWCdMCb8qx8HcCGSSjB-LkX7AOLEZBYADlvMCO4RRGzomDO4Sc74IQaQSgdREYAH56zzN3c0NNzyX1CuQYUiQsQmwpgAfhaI-UEzZ7AWCxPYSh3UzhkAPPoLEZgmTFRvBPMuWQ4RiOIMVDAbtOKEmenGUh9hyEYi6JaZe28+AtAERYdRKgjLb2oeeCwQiBRClEeI8CxxfYZX9pJaek9y5BzkQot2ZE4iayLoY4xAAjKo6gXikDMWRceDd6CBIQFALE9VZLLCEJEyxIJYAQEIBUP8TkBZC3UB5Vm-lAq8JAMVUq0UQAHB8VWewMNPjkFfsotRD9gmhLIBEwxgj0mZOydiSRDd8mFJKMU+ApSIoNjKlUqMNT2GOgKC-EA-iLFBJCWEzpFjumX16Tkm8j5ZSzPsKZXuRjFnLLjJOUeVNdJVgmByOY2kVobQ1sSRgtRlgwl2hCYhZxPF8x5K9dU712pCQBj9Cmdz-qdiBoidYLBHpU2guHUs0tKw7lbD3B6ecMJi3hdi0OBiLzEQSouF8xj0p6B4A7PR5pSEAHI2lhLpc0w6qShEZKybs7cs9jw1LInS4k1FUV0vNOcwkxjBaMgwJacQxBt4AANWzkCxAAEmAKirsCBSA6naDEeVYqLCTmaRqjAYAmD7izt1UhGLgpFgqPARBkJpVQBZRaeJTqLpkSuraVMCTpUKx9bdMij5WxcuOCG-FhADVnBmS+BSsYlKkF8ZC6YDyFhPNIGAU1GViH+gmIHDAABHMCXABybHgIEF4K8QAAGJHDOCWZxV5jBfArR0CQPIUhWQ0ECTEit-gK2QzBGEEAOAcBoCQFgWI8QQCPCSExL47ayD6EMMoJA9bgpdC6Kiro7cABeYyLAAA4BCMAAB7vi3Tu2JxAsk9HgBAHUGgsRhlPReiEV7sVdBvXeoWMBLQ6hfSgc9ulfCBPkag6hsq9BdDapAFBKU267tZBAcQoHSAUpOlQRY1C-2mG1S+t975oPqF3RAA9L6AAsIG1q+Ew1SxYjKyAWGykx0g656PYYsP62VwUzVcB1JaLoCBxDqEIzRpNdGMhYYdtxmVrwoPLrIxR0MABmCTcFYAFCxDWyIen0OaOlNQ4gQtCA-EdQId8LJH3PosJZiEZqz33ps2Juz74rxcHEFpsUWJVDQGKqQd8rcU5zSxLaWA3HVOLEFCwbRpAugIwM6imenDrzGdM+Zl9VmH1Ptc2YJCKxP0Vm-Vpu91nctO0c853LoiCtFbzCV29FRqsaBWjEKTX6dFGYhHkhgjqvPwHfbGW0j74sSTAMqyEWRWTvl7VknU7opo6fgCt98eGAO1fzPVrRP7mvre1U7cDXBipcC6C8RgL7z0WEoBkimNbwZoYhOV2zLFYCEBWPlrb26v27Za+oQ4jU0DBgsJ9wr33iu-f2zqE8SXsUWDYyx+HazmM0344J+LInXPAaG+1jDqLuP1WoW5KA7RNtg53fup82WXNk+26yZTVOHNIXR1iAQFg0Bvrs25nrgy+tYgG0Ns4AuuimAFA5ea8ZYBVDAIFiEyRySoYHN9zIDopt5lm-ZCoC3czuprap-Xs2Cgna6P2UwkwsQoAEAAUk5lQbTFga0wCgMRpTlOX1Ho088QbpGRs6glx8dXtHwl+A4IO8XI6UAADYkACFiGIEAGTSALFkLOxINA2gdCkAAAVVGe7IBA5zaGUBodQzAkAXGBIwLX6UwDuAz50WAWfMACAwAIE3hAMCUbrz8TPsAMCpB0KMmgnBOiwOnQkRQ6ee8N56DtRgOhC80BL2XivpAq86hr939oM-PmMCzy3nAGAcCeAbuoLfvfZ99HnwQIfygR8QDHzEEQMQgA)

## Usage

```bash
npm install mithril-hookup
```

Use in code:

```javascript
import { hookup } from "mithril-hookup"
```


## Using hookup

`mithril-hookup` provides the wrapper function `hookup` to enhance components with hook functions.

The first parameter passed to `hookup` is a wrapper function - also called a closure - that provides access to the original component vnode and the hook functions:

```javascript
hookup(
  (vnode, hookFunctions) => { /* returns a view */}
)
```

Attributes passed to the component can be accessed through `vnode`.

`hookFunctions` is an object that contains the default hooks: `useState`, `useEffect`, `useReducer`, etcetera, plus [custom hooks](#custom-hooks):

```javascript
const Counter = hookup((vnode, { useState }) => {
  
  const initialCount = vnode.attrs.initialCount
  const [count, setCount] = useState(initialCount)

  return [
    m("div", count),
    m("button", {
      onclick: () => setCount(count + 1)
    }, "More")
  ]
})

m(Counter, { initialCount: 0 })
```


## Rendering rules

### With useState

Mithril's `redraw` is called when the state is initially set, and every time a state changes value.


### With other hooks

Hook functions are always called at the first render.

For subsequent renders, an optional second parameter can be passed to define if it should rerun:

```javascript
useEffect(
  () => {
    document.title = `You clicked ${count} times`
  },
  [count] // Only re-run the effect if count changes
)
```

mithril-hookup follows the React Hooks API:

* Without a second argument: will run every render (Mithril lifecycle function [view](https://mithril.js.org/index.html#components)).
* With an empty array: will only run at mount (Mithril lifecycle function [oncreate](https://mithril.js.org/lifecycle-methods.html#oncreate)).
* With an array with variables: will only run whenever one of the variables has changed value (Mithril lifecycle function [onupdate](https://mithril.js.org/lifecycle-methods.html#onupdate)).


Note that effect hooks do not cause a re-render themselves.


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
      [count] // only recalculate when count is updated
    )
    // ...
  }
)
```


### useCallback

Returns a memoized callback.

The function reference is unchanged in next renders (which makes a difference in performance expecially in React), but its return value will not be memoized.

```javascript
let previousCallback = null

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

Custom hooks are created with a factory function. The function receives the default hooks (automatically), and should return an object with custom hook functions:

```javascript
const customHooks = ({ useState /* or other default hooks required here */ }) => ({
  useCount: (initialValue = 0) => {
    const [count, setCount] = useState(initialValue)
    return [
      count,                      // value
      () => setCount(count + 1),  // increment
      () => setCount(count - 1)   // decrement
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

The custom hooks can now be used from the hooked component:

```javascript
const Counter = hookup(
  (
    vnode,
    { useCount }
  ) => {
    const [count, increment, decrement] = useCount(0)
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
      ("button", 
        {
          onclick: () => increment()
        },
        "More"
      )
    ])
  },
  customHooks
)

m(Counter, { initialCount: 0 })
```


## Omitted hooks

These React hooks make little sense with Mithril and are not included:

* `useContext`
* `useImperativeHandle`
* `useDebugValue`


## Compatibility

Tested with Mithril 1.1.6 and Mithril 2.x.


## Size

1.3 Kb gzipped


## History

* Initial implementation: Barney Carroll (https://twitter.com/barneycarroll/status/1059865107679928320)
* Updated and enhanced by Arthur Clemens


## License

MIT
