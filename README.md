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

* [Simplest example](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YN0LiA1gFcz3ZdzBis3YVgjFCEWgAWntaZzNhAG5BNFiDOGsAQTNXfjtHFwAKWO5uHLQ8vM40WjYYClyi2yc4GABlYgxGNyqASm5+KRsqhOtkaigIagcYNgpuOuIAYSGRsYBdTu5ahqbGLLAMKDq2mMLuERhiJxFC5Cq8rByQBWEJgANZ4dG2RG4AEmBBl7H8YlojSCaAA5lk2soHm1KgcrjcAEZOYgAuKUS7VdFFbj0H4jd7gzrdKbPeZsLLEEROGBtTFuGFYvLCEkOYTomkHBb7ZR7WKxLD4LC0JwMAp5Ni0ahOHAMfAARypIgAnvUYLBqACRDcAMRiCTCaFVFKRNB7SggOpq4gQegILQAdkQABYABwqNQgTA4PD4ahwPQ0eiMZhaFQLKhDNAOW2oD0aPB+AJBKChTJmM2nchaEjEMxwRCyWTCswOEE+2hYWQJwIhMIRAACAAZ8ABGFvyCCJSv+avJ2suM3ERVmTTm6hBMzGVTqL1aKtJutoGAAD2MVAzeGzufzhbQxdLdArc+gdYATPgmw3giJqPhHV3E9B8LoB0OR3AxxAJ6GqJ6R-VTGYsDcMu2CAbgyhAA)
* [Simple form handling with useState](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YN0LiA1gFcz3ZdzBis3YVgjFCEWgAWntaZzNhAG5BNFiDOGsAQTNXfjtHFwAKWO5uHLQ8vM40WjYYClyi2yc4GAAlGDAKblqYAGViDEY3KoBKbn4pGyqE62Q2kUwcFrriAFU6qY0AXUHWus7umByQYT6Ywu4x7mQIOAAFWkSINABzWZhiAElL6+Jbu7X0tq3GLLAGCgdQOo3oiQ8EBgUDYjTA6zacKyB24slk3GItG4cw8tGotViYLQEJcbG2ixgyxw6xgg2GwCqeTmFKpOxg+C6IjuT3wnCBThgoKOykOeROIngTwAYpZvOlkXSRkcmU8WdMdsJ9qKinNXlcbvcAUCQdqVcQACqmGC0JzELIKoaQ6Gwpr4fEiCUMfBgPG1ZEtACsAAYhXkRYSjidCBg0GxYO0nAAjPzWdK0x0M5W8eFZSbq7gAQn46U1IAGmaKOqeevenyyxBEAtDRXc0LqSsreSBlLtwgAooYRNwMBtKeqtYzeln2WYJZwjAARJoYJxQO3N8NHKoS4hOKanSdYXY+kRYYSVLN5CudsVQDBwOAAOQ0iB84Fl58nlfBSZTr+jsbxr+-hfm4F43kewgKOeIw0HeD7CIgwiQM6wiqD4l5FJBIDQZQsHUPBcCIcIBgNrQUBoS0oGVthkR4QABmqL7cAAJMAeYaNwAA+XFvo+EjYk8aH0X04E3twfSgaJoHYbhLQMnB95EUgyFQjClEYeJ3CyVwMEKQRSnETQ9BkRRKhUZhNG7LcZi2p+lmdteWmVgZD5ISANl2ZQ1HicQACeZgwO5jAAB6SN5Dk3mYd7UDA9gwpSr7CExOD2c5nbqklIAcalEXpZWfJQAKr45RUPk3vQnnECVZhkowKVlZFnYcHAGCJrAbCvuc+ofPcYn5ai6IrpiPr4nAr4NgKLRotwLVtR1GJYoC1DQP42zcDAHC9XcGKEOcHiwFgRFNd+aDUBK2yvlkthsLQ3jKAMjooTCcJununqprNd39c5yjlRJPnSZhQMQbscn4YRRnPWwGk+TpnB6SRkMqcZDBiGZ6H-dhia2picR5flTn5a5T7McIOPEHjvBwMEUC3A4aUDRiAVBW+cDAeFP3pXN7WbV1bwGg8-1hlz4nCO0TAw3sTWSQ5ss3iDnbdbW9zcAAZGr+Rw2Dul4fpyPudDsNNfDiOKQhKOkejxsDdjuP0IzA1EwNJPPjgWUU3jjtM-5gUe-b+Oi+l9AERA1AOK+EpzDKp5B+JqjC0UwiNHMmonQDMuA1Jk7y9wKyHA9hyxFg+BYDaDAFHkt34jgXoAI4CiIfkS7A1CYiIuwAMRiBI+xiSkkRoAclAgHUrcfOCeAAGwAIyIAALEG5nqDgeBug+I+kUYa8nt415mBgbAcPcr4AExBmYIUFyPY8wG3ECT1oQaIAGKgrFQdNoA4CAoCvmggCmQI0AR57nIFoEgxAzDjTRE4NAZgHB3DdHdWQgCghQAAAIz3wFgqeKD-BAKgPgXQI9fb-zgOdCAZhjCqD-ngVBIQwgRBASIMBIAIFQMQDAuBCCkFYDwQENBoRMhmHQUGbB2D5DnGIPwghQjwguBISzPA5CghUOXiAdUeAcZQCwBgUutx156GyiwvA7DoGyGoGwNAug3RQBtGwMAd4JS8NkBgbQGAQqyDpomOAshtG6NkGIgA7PgeeFiHx+NXLo-RaBDGKMCso-ysA35UE0Vodophoq0l3nYGMcZPjcAAO74NHH8XAyggA)
* ["Building Your Own Hooks" chat API example](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADxQIANwAE0ALwAdED2Lr7APiMB6U2Ze3SOlgiE6hBkMsoCSACcIAC+eHIKSioAVjIEJHoG6jQQYIzEXOoWwBaqxMQA1gCujBYxFuI8YBb2kOqqXFIAtGWVNfYA3L65+YXFFoRV5OrEYAAS5RXkdQ1NLSruk9OzPYvkg8N5BUUljRAGUOQAIvTq9CuNs+sY7mcX5F1Qt-QHpL4Z0wsADFOhcAMp3dRTCzWUqLGoACl8FgsSNIKJRJVu6i45CQ4zepCgAEkoHU4siMSUpvAQeciRDbtCYpSAJQwlzFSkAooQcgAeVIsAgpHgMIsNLp4MhUwRhJJUFZQ3RFi48ChXHRfMFwtFMOssNIVVgsEpKIA-BYwEiVNMmR8oE4MFVSBVSMQAO5-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-RYNA70-3rE9TAM8wG9OiY7OJuDCGkMIFk-JxDimQjKfw4Rqg6nNOUbyLpuj+mADMTGWPWyCYfJZu6EHKAACxICQclk92DlAYEII7YhmQyEgDvNzS1MNxAkK6OrSAxH8TkD9R8FgnRxBH18Bgf6MNTBkQtSJBA7DekawgM+UgXQMMoa7IQLIlFekPifK+C+RJ8RfxzM1yk5EYAis4ygRgfXCytf+g6trC8YbFa4NZfTMxoOOu2ztKgYkv7wAey10gEFwvXI9NAdo+IUACG270jTg2NBfZ+ztlUJ2ztdF9aYItFhvsAFJpuPhfG+BbFh7uPcpDNpH82oBdHIBAAAXnCkgZgpu7ee4Ra55W9C44J3CnAqDfuUk-LdEU36LC2ttRF4HT3IzkQm9OjrfJqPpp6xw3puYOFdDmy2R1POfGU4q3jwnnHkuM5VCQHlXBFv0B13L9MnwnBvY+6oTj3PKT-efIDx1ZvQcFHB5DiA0O4e9LJ+u6MBvMxxiysdxHc33z4mFIoPX9oPdZhzPGa5mO-co7VFAYP7vHSZhdG6T06IfezeR+Zr+MA4+u8NvVSPdvKJdGK5bMAnHruUGFGSbPMBelrdMOtTbauUSdeF2eUXIOUTJBLBAcQZ4ui1SyJ33HN11D9eFENkb+gwDjcm1wHn+fNY7WWdc5n6HSBs4546lDR8EuzT3WEEAkQkA4GiDEMQIBQ5hD4NspIbQOhSAAAKinYdkAgAFtDKDE3iWDLpGAvg5azDuAP6dCwBP6YACAYACAQ6EAYDJYgEYaP6wCEJpAgDqBniMBJB1JgyZZnrKCgHdCsyMA6Cf40A-4wbuD-6AGgKIHtBgH4LGRP5QGMY4CeB8jqB0HIGME1A6AYFYE0A4HZBxB36QLGifg-Qig5Z5Yf6ATkHOa-6bBQCkCpA5Y8pVBQC5jwZXS0H0DJD0DsLuDCiJLuDmywCfjuBQFYDwGbCOymHiH0CSHPa5ZoH8HYEYHUAX4EBZYgD2AABCVQUgjeoqAAmhfNOvyF6BYFTEsNXM3IzNpMSBYCFtRogDEEAA) - this example roughly follows the [React documentation on custom hooks](https://reactjs.org/docs/hooks-custom.html)
* [Custom hooks and useReducer](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADywIpANYACLvFgBeADohy6gJ7TV8eOqeXVN8UcQDXVmJAB6cIBXFgxxMnV6AHd4SkUMEjBwmwR6FnJwgDcUbAw0cMJyAvpYWAyq3zN9AHMuCDcg8lV6AGYADgAWAFpxUjAAeQBhAEcAIwAVWAB1AElYACs+gBlXefXiLAmAVQBldXXyAGlJgcZxxgBFWenXCCwAJS5VADksKKgIABOd5JVSXcwAWQAEoxCltZlCAOKAk5cXzcYhVYhtZpmIL0UhkVxgYgxJwAPgcpCpRgBhUs0CCPGIPhA5KM4TplNIOhYCEI6ggZBkyhwSAEIAAvng5AolCoLjoSHoDOoaBAwIxsepLMA-MRiOYooxLJLLOIeGBLE5IOp-FIhqoDUbGE4ANxUjVarg6vWEGLqYhgKHO8im82W60qCoBoOO0PuqlU5UuSwkKIqrjvVhRQjwLiWOyWAAULno+jwlnoAqFpAAlIXybqqZZLOQku1CKoS9XBWQMG5GPAG8AW6203l4FGzNx4Io9E4kGPx9ZvFEuKRdWnSXokG3EvoMjudQBqSw4U0ezfjwiTqNQeCz+espfXlc2dTrzd+497suH9M9EsIZz0vZdLAfcR6CiWB1FfFdWztHgkksUh4BQgBRLgeC4YsnCOUhulIOBWCrGsyCXdgyL7esr1bSUqUlK9k2FHVJmPfNC31Q1jTw68+JXPVy3ULhyD3PVoErMx2ggGp2IzdRKxsElCngeTM1NaVwMiSwABF4CgmCdSdQ0wwJKA01jK0TPMMTwL1GJ4Aw8RxEfRTLEcrZ6FcUl1Gc1yBUrRyznLeAgpYbNxHC+BsygXN82ilZSHaUiGOvBs7CbUdrzHFMdT4QD1BCisIIgchGHLLsRC4xzYvi3DCvzOq8y4SsfwUvdpMFOTj1NOs6O3CgdUKrjCuK+AjwU5jrzyyw+C61hKxYdQkpSqBqqLYKD3gYsoNgFh+ty1iIKDGqIoM4tDpm46oCDdS-IQZ8zpii6rtbI6htXFSpyLS7G2bN9BtTZTiFU8ZSHmLgCXIGSyAw4iuL+zKS3A1sQdU+782LaA6zwVGTrADJ1xsPQMHRpzVL0LYyv0NDcKcETodhtDiKcJS51B+BwchpmaPhqA63At7x1uwn-Ww1UMHoGAMMp9RqZcAwsYZqGKGZgwoDZr7Oe51WYb54jhdbUWiYl0nCAYKoFfUMmOdUvCQF7CBVKcYWmLHMdHP8tziyRrLwOW1b9CgYsRKiYcBulObwgAKksOdGDcKtsO8vcyFgVxrAzKsdRJBTLBj8IRGFscPy-FHAbAB3JszNn8eyhCb0t8hvjlTrkuDywAH4oydl2QEsPcnDrwGVzIWdQr3QpCQff6TfFkmdSLafiAfDBRbx0fTU3xuq6cGv9C4IYzDprW+GtLfWz3lRCq1hvG-HcebEnywV9n5HRfujDHslhfVS4t+E1Rb43opWQquMQGWGvrMKI6hAzUnYJA1s98H5NzyC3NuUYYFwLICPVBK4ATkHoLMBAUA9wjTsJQywQgkGP1IBbCAhBzB7j9qVcqlVVDFj1IOeAQ8QAPifKqXwkpBaX3HFpMRV8HbsNIBgRh-YypDHIGAGosAta0KkU4CAcQ8g6KGJAUgZIQCiPwZYExD8IFiOgbA+BeD8EoPwRbdBrdFB8OwbYxBki6EMKYSwjKTZCEVXUF2LhlgeF8JnMpIRA8RG0IkaY6+Mi5HKjkeQJRKjajqK8ZokA2ioLkD0YwWARjzGoNKQhSxqDr4YHYS1V2O8H7WJwQgtqtCnFVBcbw+8thvBTkUQwLgzR4B2NQePUwviSz+O1vbcpK4o5OGzN9KBwzjENJXMXIWY4rpR39C4IMIZTJXRYp9AAgowE0RYbK8THAJccgC1mWB0vpQysFuK2SrAjXZgZrKhnguOByLBMYFjSq2KZ99ZoFQ4qJSs0soBAvZt9IFG0PKAqhZdOipc1wbjmuBapyoRJUHIGffGVcADk7iyCkoeYJNpzdOluJsWQBkaSzDxBGQ-MZjDmGTP+rCoFl1IHxIfqSk5MBtwKXzKS-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)

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
  (vnode, hookFunctions) => { /* returns a view */ }
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


## Supported browsers

Output from `npx browserslist`:

```
and_chr 71
and_ff 64
and_qq 1.2
and_uc 11.8
android 67
baidu 7.12
chrome 72
chrome 71
edge 18
edge 17
firefox 65
firefox 64
ie 11
ie_mob 11
ios_saf 12.0-12.1
ios_saf 11.3-11.4
op_mini all
op_mob 46
opera 57
safari 12
samsung 8.2
```

## History

* Initial implementation: Barney Carroll (https://twitter.com/barneycarroll/status/1059865107679928320)
* Updated and enhanced by Arthur Clemens


## License

MIT
