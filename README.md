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
* [Custom hooks and useReducer](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADxQIANwAE0ALwAdED2Lr7APiMB6U2Ze3SOlgiE6hBkMsoCSACcIAC+eHIKSioAVjIEJHoG6jQQYIzEXOoWwBaqxMQA1gCujBYxFuI8YBb2kOqqXFIAtGWVNfYA3L65+YXFFoRV5OrEYAAS5RXkdQ1NLSruk9OzPYvkg76+GdMTxFWZXABKrFWE8FwW1hYAFNP0+ngW9EEhpACUjxcxV8Fgs5AA7hB1IRVC9vsEyBh1ABPRjwAHAEGgib0FjrCCkbjwRR6exILHYixceDqKpcUjjEjndRIMHqd7wDBMvQWADUFhwdSGDOxhFx8HWUHgRJJzmQFOx1Np9MZZz0rLe+i5aqKXQFQoVUvE9CqsBZCtB7R44IspHgNoAolweFxnvYAKqkVT0UhwVhfH5kcnsAMI-7C0ExXwxYVHUJFADCOvuj1KixqbpFmcpJXe6i45FZJWgnwJUIg9FgSeZn2pYGIZng1YudTiCvc7gsABF4MbTUVeksvr6JlMZs1B4WFSUpvAHeJxNL1J9ZwAZejIs7qeeLoIrlgAZXZHwss+u4n38GuUFu90vAElSFD-VGRQDrEDMSKsccinxueoR4cp8pjkIw7wwiIqZnjcdyugB9zXreXCfCUAGsmWwSVs2RQxH8EanBQRQAamAFAVqAGxiKv4WHwmGsJ8LDqI+z5QFBTyzuR8DPMasAsPhP7xhYUCzNBLDns8AnUUJIlgDhDoILKYlXr2kkEYJRFUsSDYSk8kmAsCIqgjRdY6QA8qQAAqXA+uQ5ZkA6I56e+QLZpSWn1o2OH3M80B-HgFrCbMXJ0tSegYKZjYOo2eirhA0wGD59j5rZ9l2r69i1tpjYWdZqVho5UB-AqUmUrJIXOlkGD0DA0VZHFCV2q6yU2RQaUGFAmUeeZVmtXZBW+qV2LlZMlXhYQDDkOQDXqBF2XcfY8LmPA9hDTGWJYrOO5Ls8+kfoZlJMSx+hQM8+ZVOiBFxLR7gAFQWMSjAol8zobqyZCwMiVLnF8RT1syFi3e4IhDViSp0gybmgmAboqAhXCZYFX7uaKk3kAAcokGFPidFgAPzrEtjb2BYrL2IjRnuWQRIcqyZikMQUoGSNoVZKm9OM5yskBZTkY8yjMP2NqzL3F0BJNV1fAtLz2KC3DOpdcjKPYtT1K0xYHNM-tsnyYpVWjWFRRPJrXOzIFfOnMy-nmxYcsAEZVOoMykIrNugqB9B2wgUCsiR1j+xYQhuxY1OwBAhAVKye1AqB4HQqozwlCiaJkyAUoylkJN4Tb132Ku8BTat-PK-bjvO67MuUqH4eRy8LnCfFccwonFjJ-AqcEhnpIgHUxWV3Unz2AAsgUK0gNb-el07ZAV8rKuEmHEdR-XkXcX3c+5yA1yeRKihF4FIMlViUnXVs44LJU5BSXGmkAIKMLUTyDhmWJQxrDNSsXoIdt2vYmmaaZL7DigKObYE49jkkpjOFg3kHivlBPXJWNF-zJgLJ8GqUBYFZR3rA9ip4YGoLUiCMGNIIa0QVHLbUegeB8UloFGGAByB209SAMK-u5JWc9q5LzrgZDBsDJI53YZSBht8YCWwuAwwKE8BawzAj6DABJxDEC6gAA1gYWCwAASYA8NyAYAQKQAA5u0GIqiZHYhBuwvRGAwBMGeIQAyb9obPCwQdZWFR4DIl9ooqAwjsTQB8SWG2mEKxVh1EEnGYScL+NBKvWBy8DLxMIYQCxlJs6Uz+OvCwIhoyfDPrMC+Sxr6kDALYnUbkRKTFlBgAAjhdLgyIDzwECDMZqIAADEjg5QWPvowXwUkdAkDyFIe4NA7aexaf4FpS5fhhBACgAALEgHAOAuhLJWVgWI8QQDyEUDQApYBdiXwwKkIZZB9CGGUPAAAHqMYiQlDlFOWHpaB8AuK9wMkrH+7o8T0FtIkVuxAAx3CmlYIojRRKDgaOcQMFANInEnKmTh+CmyoMSftFF39Oy31AeOQBFRW7eiKLOZYPonCqBTIcglGBAo0RpvodG9pYGpmji8LFASfa2ntN2DkkkMBGJpJZXIa9YlWCidhCJFgh7vFUBFNUp0ZXtAij6WS+l7o4AENk9JQ1KQ0UkAWdQLKngMvgEy8EAjdWiiEigkWaCvgwDccku1eDJwYFnLfV6yJnh8ANdMXBVq4mkJVHwG2eixVsv4SktWjLmWEKyWK1eST5oCNXtqyxBE+YKg9V6qOoTKwADVKwXVTHwEGXy6U2voM6RiNJPVcDwZxY83F82wCLbAC66ag3KgZKG-u1aUI2wwQZJi9bngDqoWKdQ46YAJptkm-ao7nTjudBgSQZofLPmaPtLdFgACEAc01dpyQqNsIp1oinBiqScwoYznJGQgLg4zJnaA4DMuF8yIhoEWV0CIOAADM2yEj7OUFyKa5zMhXOQN09xXQujwy6HZAAXu3CwAAOAQjAbkETgwhr2xAI49HgBAIxGhWSasw9hrEuHUFdHw4R8CMACRGPIygLDt7fB20Zl9JWyi9BdGNJAT6GpbKIfuBAcQHHSBUPzFQZYStGOmGMeRyjBE+PqEQxAFD5HFnsejL4GTNDljMOdnyCwJmyA80M3JiwijSDKPcXYrgRiCRdAQOIFkApVP6ekxkWTfFbNKOBbxi5mntMCn-Xp6SsACisg6ZEBLUnhYtiVsQcChAoTeMDgRSlJGyPZaxHYm5RG8ueYEARHSXBxAxfBKyVQ0ApSkAIilNqYZWSVlgLZ-9yx4DijFqQLoW4kvw2qj8Rs7i0vfEy+RnLxHSOebMNW54NG7V0Zi4R3L82hpFZK-NumS2VsXDWwRiou2NAnwMwh8WKYlaxwYFl6rtyCKVhIwNrdmi7gXAIhMiORieDnC5R0+AwOCKKeY-t10h39BcGOwxjBzGhpca4FKGHMxGDkaw2CKg0ALAdIXJJrEm38tilgIQZ4i3Ifwdo-R07RP1AAj1GgQGGsDtU9WzTroYPjFZOG6g8zZcyBmYswyZGTmXMDfc55tjVHSCvmS9D2zJElaQigO0CHy22dHeQ5dQnc38sU41wh7X23q3i9ZAICwaBKOBwKyKO7b0GgIBl6CR7xXTDUjhb7KgVQwBNaxMkMcEnkRU8g55z70PvvfAqH9hVcX-3x++wUFHXQbKmCmKyFAAgACkBESAxa4HFmAUA1Ohe1+RtDUXLS3I0y9oxpBfZZHuFJ3w0zWlzJoCgAAbEgAQsQxAgDDqQJYshdmJBoG0DoUgAACdobnZAIHSbQygNDqGYEgDs5xGDR+1GAdwE-OiwCn5gAQGABAp8IBgRZe+oST9gKctIIA240E4J0J6QHR8gfADfg-xzqiMB0IvjQCvmvhvqQFvkYjvtflaN0M-IwFPifjgBgDgJ4PFOoFAbfr-jUDoE-soC-hAG-jECIDEEAA)

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


## Hooks and application logic

Hooks can be defined outside of the component, imported from other files. This makes it possible to define utility functions to be shared across the application.

[Custom hooks](#custom-hooks) shows how to define and incorporate these hooks.



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
