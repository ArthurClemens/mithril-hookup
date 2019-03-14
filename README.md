# mithril-hookup

- [Introduction](#introduction)
- [Online demos](#online-demos)
- [Usage](#usage)
- [Hooks and application logic](#hooks-and-application-logic)
- [Rendering rules](#rendering-rules)
  - [With useState](#with-usestate)
  - [With other hooks](#with-other-hooks)
  - [Cleaning up](#cleaning-up)
- [Default hooks](#default-hooks)
  - [useState](#usestate)
  - [useEffect](#useeffect)
  - [useLayoutEffect](#uselayouteffect)
  - [useReducer](#usereducer)
  - [useRef](#useref)
  - [useMemo](#usememo)
  - [useCallback](#usecallback)
  - [Omitted hooks](#omitted-hooks)
- [Custom hooks](#custom-hooks)
- [`hookup` function](#hookup-function)
- [Compatibility](#compatibility)
- [Size](#size)
- [Supported browsers](#supported-browsers)
- [History](#history)
- [License](#license)


## Introduction

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
import { withHooks } from "mithril-hookup"

const Counter = ({ useState, initialCount }) => {
  const [count, setCount] = useState(initialCount)
  return [
    m("div", count),
    m("button", {
      onclick: () => setCount(count + 1)
    }, "More")
  ]
}

const HookedCounter = withHooks(Counter)

m(HookedCounter, { initialCount: 1 })
```

## Online demos

Editable demos using the [Flems playground](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YNwDuEYoQAS4gNZxuy7mDFZuwliOhCLQALSE7gCuZsKCaPEGcNYAwrTm9Ebc-NwAFLZRcDAAysQYjF4AlNlSNvHc3LKy3IUwLUWl5TD13CIwxFEiaNzIPQ1YucIKwhQBIACiHNbEtO1tAOStnYzrwpU9ALrxyon0ydyutG4wbGkZaFk5Dk6XHrl3Fg8M+wloSdYAQTMZmydWG3E4EBgdkQeWq-CkY24E1eNw+mW+x3i8Sw+CwtCiDEm4LYtGoURwDHwAEcojARABPYowWDUFYiSYgADEYgkewoPSBsTQlQA3PFKCAiqziBAzngAIwATkQAAYVGoQJgcHh8NQ4HoaPRGMwtCoDlQoBA0B4kKgtRo8EEnKEoAABB4AD2MVEG5C0JGIZjgiCahLMbgA5nr0rJnSFoG6AEz4VWpsIiaj4AAsceCrvwuklxAZZk0UuooTMxlU6h1Wnjroi0TMkr9eEDwdDsnDUZjWDzLvCkSuMTdaZTCvkEGSg4TUGbo9bVBLZbwcErEGr5uUQA):

* [Simplest example](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YNwDuEYoQAS4gNZxuy7mDFZuwliOhCLQALSE7gCuZsIA3IJoiQZw1gDCtOb0Rtz83AAUtlFwMADKxBiMXgCUuVI2idzcKdbI1FAQ1G4wbBTcJcRpHV09ALq53MVlFYz5YBhQJdWN3CIwxFEiaNzIK01Y+cIKwn0ABkOd3WyI3AAkwO2XPfjEtOWhaADm+dXKp9UUPbcA7CABGUWIrySlCBTWAsKa3Hojy6Nx+dX66wuIzY+WIIiiMGW20RTVUCOE2LcwiBxKao0SymS9FS3FctCuGSyaByeQcTnZHnyXIsPIYxOZaFZAEEzGYJvCSZwIDA7GjavwpECDoKeiLsuLGYlElh8FhaFEGIcSWxaNQojgGPgAI6EkQAT1KMFg1FeIkOIAAxGIJMIAStZbE0NVKCASj7iBAWXgAGyIACMAFYVGoQJgcHh8NQ4HoaPRGMwtCpRlQOmgPEhUHmNHggk5QlAAAI8gAexiom3IWhIxDMcEQslklrMbk+RcysjbIWgnYATPgAAybsIiaj4AAsi+CHfwuljxHdZk0ceooTMxlU6gLWiXHYi0TMscHeBHY4nU7QGc5zoLAj3bcJIg5GJOy3dd03kCBUjA5coHfKDPyoC8rzwOBbwge9qyofNr1KUwzFgbgYB7bByNwZQgA)
* [Simple form handling with useState](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3YNwDuEYoQAS4gNZxuy7mDFZuwliOhCLQALSE7gCuZsIA3IJoiQZw1gDCtOb0Rtz83AAUtlFwMABKMGAU3MUwAMrEGIxeAJS5UjaJ3Nwp1sjUUBDUbjBsVSXEaQNDIwC6udUl9Y0w+WAYUCXNnd30qdzINSKYOGMwxACqJUcac3k1S4z5wsJbaF09+xBwAAq0qRBoADmp2IAEkfn9iADAbcFnUGo81hsYK93rtrJAYFA2OUwPMarj8q1ZLJuMRaNxxj5aNRiolth8YmxlpcYNccPMYG0Om8upSzqz2SsYPgGiJAWd8Jx1lEUdtlAleR8RPAzgAxSz+PJE7nAbZdcaC44rZ4gVF88bg37-IGrdabfX84gAFVMMFoUWI+R1-HamOxuPwtJEKoY+DANOKRKqAFYAAzmhX0pXo7iEDBoNiwWpRABGQWseS5vp5fN4ePyh2N3AAhPw8qbWnreWXLRCbYD8sQRLLzV1vFiSqWy9x1myvcIAKKGESjuFCl6O5SOkVmFWcIwAEQqGCiUC9icVXW2KuIUSO+0dWCe4E1wgojq6zZHfP6GDgcAAchpEAFbyIsHvR8+V2PMC1-dNM2zMDHGA1RgOvYQFHvDoaCgd84GERBhH9NhhFUAIWxHRCQGQyhULfD8sOEAxu1oKB8KqYCyxI2JyIAAyNH9uAAEmAKsNG4AAfIS-0-CQnXw9jmgfIiyz7PkZIQm8yKqPU0Iw6jwAgLE8JUJi5L5EjVIo9CqKQGj6Dohj9MIl8WJvAEzE9IDDJfZ97JfSi4GwkAnJcyhmPs4gAE8zBgXzGAAD0kQK3Pssx0OoGBImxNlf2ELicFczyX2NDKQAE7K4tykdpSgWVfyKmBZNKst6H84gqrMZlGCymqgpfDg4AwXNYDYX8vmtKEgVququhJUdPVoCNaR8skexq7hJu63r+rJCk1moaBHGWbgRkcaEyUIL4fFgLBMPil96GoFVll-QpuDYTIWm5XDA2DUNCyezIxtK5cru4BT5L+xTQa6YyuBQ9TvK03DGLs+zIc4aGaLMzCLJoKyxBsgjOu4Ejc09ckkhKuqPPG7zvxwAqieIEneDgMIBjQNwcvGskwoiv84Bg2Lwdy1a+pGQb2xG4F8f7AWX2EWomD0-HgcU4ClMMobISOgAyTWCiC5HUY08zfPh2z8f18iYfRrTaJxhHJYJm86ZJ9nxopjmqe44QnfoF2OdC8LaeJn2yY57gbqmNxfxVcYNQA6X7PgwGy2EcpxmeJOgcVoKlYU80ZkSAGPlcWhhjYDIsjQHI8gcJxi48fJy4sSuGFeZJUwAQTMMx5g8zgdLsB7Wl9K98jrkZG+yFuC+TLB8CwD0GCeXlntpHAwwAR1lEQQrl2BqHJEQbwAYjECQXjGzvYjQV5KBAEo96hXY8AATgAFkQON9PUHA8CDD9b9okYX+EYALDjMBgNgHAgS-gAExxjMFFRUyhb73xgPvCAT8tBxkQDGFQMwqAsw8EgVAIBjR4ALCEaAt9zzkC0CQYgZgfIkiiGgMwbhARBkyLIChoQoAAAEACM+AhEADZuHBF4fgXQt9-aaDvrdCAZhjCqG-nIomUAsAYDngCP+ehCoiFoSAehjDEAkmoGwNAuggxQA9GwMA6EVScKwLIDA2gMBRVkAMXMcBZDqM0bIOM+AADs+BX6yGoB+Xxe5NHaLQLomRXM8CpBCrAL+pCNDkIkeESIJcYjUIMXgYxTDZAsLYRwugzieHZOiGYPhgSYHCPkF8Yg4inC8IiDUhJ4UkkKKUXgqgZCtC1FMIlLkID-CQSzEdGuhA4QPFwMoIAA)
* ["Building Your Own Hooks" chat API example](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADxQIANwAE0ALwAdED2Lr7APiMB6U2Ze3SOlgiE6hBkMsoCSACcIAC+eHIKSioAVjIEJHoG6jQQYIzEXOoWwBaqxMQA1gCujHgWAO4Q6qoAEuUV5BYxFuI8YBb2kM1cUgC0ZZU19r65+YXFFoRV5OrEYG2Vnd29awMq7ksra+Pt5NOkswVFJb0QBlDkACL06vRdPX17GO639+SjUBe9HOvgyKwsADERvcAMqvdTLCzWCwAChu0NIUAAklA6st4FC7pi4S9ETEAJRIlzFXwWRahIoQcgAeVIsAgpHgSIs+MJsPhyxRv0xOPJtIsXHgCK4pCsLLZHK51mVFlIVVgsHFdIA-BYwCj7BgVqT-lAnBgqqQKqRiPVSPYxbK6RYkHLWezOVrnbr9YbjQjTeayB74A6vXTXb6VP7lgCg+JxCGw6QYqCGRYNhVWHziQLOsjGs1M+QUTmoCSA3VDqt1qdHWmKEUy9zgOKzHd6q60RYXuouORXeiibjSvRyABhVQvACCjAgXQpVJpTrpkulsqjGGFUHsdT44b1BpU9DMQK4u4PdNbK+dt5WAE8EIPL7eLAAjeiECoAcx4luxYD0N+8CugABlUXCwCiAAkwDbhgJ5nhSoEvnSqY3re6GvhY5J4Aem7yIou4fMOGCEfAuH4UeRqMJ+8DniAlEYaOE5Tuos7zgAZJxh5+nmxH6pm2YYuWeZ1EO9w4q68HQF05KOreIgKV0vjoQ24KTi8ABK8CEBAc5ZAAChAX70dy3b4hW8B4iwZYVmSlLWNS150mCRR8JKekGXoOJ1Cw6g6V5RLqDiIjcpZ8LwCiODKW5cqBfpwXuoq4W2SJ9klp5iVZKK4prhBG7URkfZUGc7AWPuN6Ce0wnDhl4kkZJUCull3khVAcl4VV1EBLpzjsFR9i9UEF7MVeqEWGQhBTqQwGukq1L+QlbU4iiAByVRgG+9EovAGCvFwwHqBgp6wFUFHKdhcQvtuTxAhggGMEKIlLgaY3OlGxCMMEZCjdh2Euf92Gned0kiRg0ATWhXVA7e8HkRNl2vvJB5I8pSmqepRRCVAmkBbp2V6MZplcNyhatKcKJ48twXE1mXBVssNbFvWpBxbOjDmSUEUvFyi5OQs4pxXwU6sTOc5+VKLRjnjHFhciPP6EK9CwCwyn5TKFVepuxU8Krf2vlGb5VOoqz2gN72A0DhAMOQ5BrYkrqi7Lc4WLq9jG6bv0gC6eye2bcqjB6FQG0DU3sl+XaOYtUsy2xHEogAhM78dzkjmEw-9Kfi-O7sgI88CfsEp76IsbH2L79jTkE5i82XLznNhaOZ3S2fsa73GHjj1ME21dP0Uxt6brdofOrdzyvA9TDPcOr0vvqZbiRN24t1ncc56vmHpzhaPiiImP2qQYAPcQlrqG9dJmksih6BgACO51cPeMLwIEqxcEeADEjj9YPDRNBTTYKIOaOkdDoEgeQpD0RoB+ba2gOCvz6iECgNAAAcABmJAAhYjxBAORGg1ZjgTA6BgVI4CyD6EMMoS48wShMHnNsT4hoDhsVGPQ+wABuXwvh4AAA85hFDioQ2smwuY8hYFZGy8AACiCY+pyVeoDXk6U8xg2HDiJcVt6SNgqkyZKnJJYhXlCGeW4j4BWRRGqDU5IuGHzhpaGuZBRyYgQBlTSs0ooxnIJSLRdJ-JYmMYqFEXiIaBM5DYr0akbz4lkeIPqKIUTR2XNhehRoqhvk4CMbaAAVYgdk8wzyanUGacBzF5nccBCJzENaykSZol8qTLTkHSZkiA20oRrHySaQpIoRwlNceUmalTbFXRGc6CktivQ1LdAqTkYz0ITN8OQyBCAuAwPoHA-wiDHEoOUDgFAqAcEJEUAQ1hqSyHpAoVkAh6Zx5AhbOKCIyTnReOfMxPRsyQIWD7OdSJ4prpOhwG8u8qjnm3g+SGV0PzQw3iwl0TOaBgUvNBb4mZkKegqxYH8p0CzJmcn4VcbR4J6EPKdM0jJ3A2nwFyV0gMXZty+WcaUtxQyKL1JvHFbc3I7mvD4AyqAIgxmuVCFQPasBiDfhRKBclrS3wcm-BYLxPQCgWFgvymIoEqlw3BiEiFKVkT8qRCqNAB5dTiExTC7CUKuDnSFUSooUBX70HvNyNAAgBAWAANQWBwO6iwAAqCwABZF4qgMBcHoJiNYiS7X+WybkeAp9z51IFhfV8-SykmgqVFeCXjm4WEdQwe8ykAV0iaS0yl7S+i0uWPSkSjKM0ssjZU9lt5OUvQNSJO6vL+WCq9LmvMoT9FKlVOqWAdqwSiowOKyV4EKAVqyfKxVeZlWkzVfWqAGqtXOkbYM5tOadV5m3bipZCC37ILCCANABzr1HLwYkGgt0AT3QuboSh2RlB8IEfaxqmJu1vGRJVcaN5oCuiEF6cirp7BYnkKPRCB0oMgA0OoRgSB3DuHoIUVQEEbbwBvuQDA34AHpIhsQDDdspTkHcPkWA95mgGHgO4PhChGDSAwyXTDowcAYEYLNA2pawVWGaj61ekG9gAClI2hgtreeDmHEPIdQ+hzDzQcMIHw4R4jb5SPkf8lRmjdHVAMaY7wljbG5NcFGJgXj35+OZy0aBiwaBROOz2CGmA944Mca4Ap02SmMNYbU3hgwBGiOqe0yEXTlHqNUEM8Z5jeRzPedGOgnjfGZMqVIIKrZ57Qg0AACxIFQflu9+DlAYEIHbchmQqEgDfMQKALrAbiAoaMc1kBaOunIJG-4LARjiFsehLcL1AamHIKx510kEC8LGSrCA35SCjCaHhgciwsj0TGR+L8v5T6YldJ-BMA3xS0RgPK10+zGAzYPsN2e3qbv3GefVrgjrLOrFQz6y7iqqCyU-vAP7g3fAIW888xoUBmiuhQAIS7YyjPzY0BDqHV2nRPZe6MCNpha0WEhwAUk25+H8f49sWF+-98UW2Ce7agKMcgEAABeXySBmA29d8izyWt6Gp3Tr5OAABs0PxSAUOhyMDFgPUevQYjgHpAaJ0VJqNpkE37xTb4WMxMfDRg7c7D6qXRoV3NdazT+n538v86dCQcVPnif0GtzrrxcZrjilB+Dn1kvxSw+-PDl3pu6Qo-omj+gGPVs47Gddu3ZpjrBhSoDcnO3-yunZIoW3eZ7cYGIAmEMj38ex6J5KKASeTQp8tNaW0spo9Z8J8Jz+MA8-Xd1qVR7BRUf1a9mAc7n3KDsg6lXmAYyTumFmudlA3uC0K6LcrpHdJkhMwgOIe8oxipZHH9Tg66hZvsgW0t-QYBVuEHW1wHXdfVaKu2Q7p0guiOkBF2Ln1eHBs5aQXl5QkQkA4GiDEMQIBg5hD4McpIQxVAjCwAAAC+K2QBAEE2gygimA46GlojAP4FWaw7g-+gBQBmAAgGAAgaOhAGA+WyBACgBpCaQIA6g94jASQrS30pWD6ygxssAgED0HIFWVW4BkENA0BaGBwUApAqQFW4qVQUAiYmGe0ECGGyQ9AvC7g7IGS7gdBgE7gGBWAuBBwdssh6oDBkA0ulWxBpB5BNAD41AcQv+NAKBYwxCNQOgEB7BfmMB7gcBCBohphsAJwkwjAQBGBmAOAngTI6g+BwwZh7QFhBAuhFBlKVB7+BAZWIA9gAAQlUFIP3gqgAJqnykzMh2gZinAVzTQvAWDTiGRYgWAJasaIAxBAA) - this example roughly follows the [React documentation on custom hooks](https://reactjs.org/docs/hooks-custom.html)
* [Custom hooks and useReducer](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADywIpANYACLvFgBeADohy6gJ7TV8eOqeXVN8UcQDXVmJAB6cIBXFgxxMnV6AHd4SkUMEjBwmwR6FnJwgDcUbAw0cMJyAvpYWAyq3zN9AHMuCDcg8lV6AGYADgAWAFpxUjAAeQBhAEcAIwAVWAB1AElYACs+gBlXefXiLAmAVQBldXXyAGlJgcZxxgBFWenXCCwAJS5VADksKKgIABOd5JVSXcwAWQAEoxCltZlCAOKAk5cXzcYhVYhtZpmIL0UhkVxgYgxJwAPgcpCpRgBhUs0CCPGIPhA5KM4TplNIOhYCEI6ggZBkyhwSAEIAAvng5AolCoLjoSHoDOoaBAwIxsepLMBLEl2qoocRiOZyJZJZZxDwwJYnJB1P4pENVCbzFFGE4qRqtVwdXrCDF1MQwMbTebLdaQ3aVBUgyGXW7yF7qaRlS5LCQoiquO9WFFCPAuJY7JYABQuej6PCWegCoWkACUJfJuqplks5AN6kIqnLdcFZAwbkY8GbwHbHczeXgMbM3Hgij0TiQk6n1m8US4pF1mdJeiQncS+gy+51AGpLDgLWvpywY1B4Aul6zVzv1xv1FudwGz4fKyeWZ6JYQxXje74do+4j0FEsDqG+H6WI6PBJJYpDwKhACiXA8FwZZOEcpDdKQcCsLW9ZkKu7DkYOTaTpKVIMam6Y6pMZ5FiW5Z6tANZmO0EA1Gx2bqDWNgkoU8BCTmNYxPAmHiOIT4iZYslbPQrikuo8mKQKMksGcVbwHp8B5uIxl5lABZFsZKykO0ZFMc2dithO74sZYfBAeoBnVpYALkIwVa9iInGyRZVl4V5RbhYWXA1r+wmHnxgqCWeFqNpO7leZxXk+fAp7CVSmXCjqfDJawNYsOotn2VAIWlrJeVltBsAsBlbklX50YNSwpllu1HbuVAIZSVpCAvqFvXwOI-WTsVFA6mJxASZx-Utm2EF7gtG7ifA4ykPMXAEuQ-FkJhJGrU5rb4ZtHZLRJo1FmW0CNngt6QSGGRbjYegYPdckSXoWwQC4BhPU46hHRQp3oSRTiiYuy17QdUMnbR51QANU5Yx9YBfThqoYPQMCYYD6jA6D6F4RDqMwwYUDwztSP7Ydx0wxjONdXjgYE79hAMFUFPqH9iMSfhIADhAElOFjTEdpOsnaUpZZrc5G3rlVNX6FAZaQ1EY70TWfDhAAVJYi6MG4tY4eph5kLArjWNmtY6iSwmWCb4QiFjk42F+27lreYDiwVObw+96uIZmAvkN8cpJXZ2uWAA-DGkvSyAliHl67ARx2ZALoZh6FISj7rcN3PfaqnEl8Qj4YBXb23RaTeIcHTih-oXBDGYVOM3wdrNx27cqF5jOuVHU4FzYReWLXZdqxXo2YeNhM8z9OqlvP+UV3nLd7sJr17yPsxROowbUrnQ9ThPk9TvzeSx-HMan+fZDh9f67+fQswIFAh7ZTsEAywQg97rgLqYQg5hDyq1bP5QKPZVBlj1COeA2cQCPmfKqXwkpOaIWlGAywI8AoEgwBAZUZDyBDHIGAGosBGaEOHuLCAcQ8isKGJAUgZIQB4I-LwjsR9r4nzPhfD+d9I7iIflUOOih0Gv1EVfcR+c0yQOgeWK6fkQYIN7MgpCrhRzoPnGJbBmdcGEIIZ-Ih4sSGkDIRQkG1DaG1AYZYphTgWHQXIOwxgsBuH8OxnvQRk8R4YBIbFGWrco7CLfpfeKhCpFP1kQ+Ww3hZwOIYFwZo8AxF3wgeQtRsCmZi38dKGMeZdpEOyTwyJ65va3ixu1Ji7kwzmFYI9YspZuxGiTGWdpNZAwuBDC08g7UqTuQAIKMEYKtPUsl2npXWrfdynl2JcHIDWYmUA+lFMkqs+qKkWDtNmu+P234PJBxDsqSGVBkzUT4BHYOAByeRZBHk1I-LfSeCSZFoJfiIsgDIqFmHiDkyeeSoEwI0Zso5JT3nrkeeMmAB8cyPIjkEj8ISwlFgiQ86xgVbHAuIKCjFeKCTEsQp8u+3zn4Q3oM0QFQxTDNA0AyxQAIohgBTOIix4iAAG7TyCHgACTACimsjACBSDNEdJKXlgS0W3m9u8sVXjaGMDLIQdaN025lhaW01ZcTr6tNcAAshUA4VTmgKanie9koCVgKNa1id7WjQtXdUWuzhJFkhetf6RzCDovXGYzajYsYiEYkVMYGA3Z6G1V1QML4MDTH1lwVwJwUkCmxOLAAxMyVk6KunDLLJMxg-T4yhiTO1dqSoQyMCkEWGgswf62F5Bm2iIoQBoHFFKGUIB5CKBoAM4MYBEzhgwIqAgVzVQ0HgAAD19DqLK5bhkzIOfAPKCy1a30iJYI4956BoTlEhYg5FCxVAZDqKMtpXSmitNmCiFB5oZhvWaTilK5mrJ9VuiOO7xmZnLX4N0SFug6lkuaAkLJPDFiHdGF9GAI5ZRnvob4GF5mlkKcg21-80IYUsAAEUMv1DAWT1DzA1PAfqbqGTOtSolSwEIqyqD+vuHWDHHR-QJBXNaZscACF4bggA3Ahzqkg1nqDQ5mJD8AUNJBhUJ5uyyVUbJgNsv1ezOIvq8bJcZNtXBlj4KJlw7TvbycQqcgO9zr5Kb3oU6FqyNVSZkzCwNH5-q+o9Uc-6vCRCmanDyqc2ndMwLtTUAAajUfWnE+De0WcJ7afB6A4Uqt4HTXB9mNWPBRkLsBwu+INs3czO5LOT0S3FPemz1pVVS2WUrp40xVhqzAUNVG3NqyqzhGrOE4hSC7s9fQto1b2VtAAQmAV57zt5-OSl84VwD4Z5PTZrZqetXBG3Nu0BwNtDYO0CCQGgYYu2cA9B7bKAdyh6gyEnQkadygkB5sjkMIYYrqEQAAF6-IAGwCEYLO3zj3nu-2IFAl08AIDMvgleNA33fuTn+6soYgPgeBRgGYZoh4cAoB+wtqksw66O1vvEPQIwFBSBNZ2Y61CiwQHENj2xVyeCtUjsjgEUr0eY5h++Qn6gXvvfR7cDnkEtEMDJ+IBAAvaxMtID3frgrMyqiLLTur1zGcvJ3JeVXTclcM-NGQ0g8RI60MyWYRl00IcY6xxGunCRteWFCYFWKkd4HC8PKLudvmDRQEdOjgQAgACkiuxWR2IPb9oZOBC+c8GDjQh5w+TlobOkHUeIex-fEjLgoviBJEPKoaAj5SC+chmzWih46G256OaeAM4e5S80gH1ZRN6wrVvsHusof0cR9B+D4uiWyxw69d3RH5hE-g8bL5+Pw-o9zx733nMCPYBA6H5Hkfdf+-V6po7oXtsrRi98zUMHUuhuy8LDmXzTaoGtBY4ebNXh4C+eZ6j7veEZ9dznwvoY9+pWj8nLjrgj5u7BkYHRx+07CoGgEsGzQUhp0nCX0n0KGnye3h0Hwn3UC-3fA9y9yvB9390t07iLDXw4jtzrA4lvidy31d3F3QNUG9z9xX1n17g4lV0sHV3+VIE12e3oOLEYMvAPQnkN1xClwQHEDN2h1oK7lt2ylvlkm7j5CUkPEJHQl83IOoSdAsBj3d2gAwLgKfwQNXxOne1QI7BgIhy0N7x0Nnz0LHDH0S34Jj0sCh2AIEBAV81IJFx30nCUIBBsAfQASoA5Xz0nHWCDGp1cAQJVAPDlxP2-zrHMAv2zGw2zR6ESNP2xD-yGCOnZVlxQBoOKnny4CvxgCgEUISB51+X2wt3fH0FnW5z32aFIAAXly4Fp0jVbX5HbRoBwAGD2w+ylDEBAFMAsBFD4FO3lAdCdFgAAAF0IqidAtxtBlAQgwhIhsxGAYjTwshRi2gJjMABAMABA0jCAMABhwgNipBx1LsQBUEaBOA2hLYTs+05RG1YJaFo0zALsZiuA5jghz5FiKgoBSALgMh59-hRdEt8pMhwh6B1h6BZ1whTBZgChT5YBaFwgdisBDiKgqhwhETnjOE3iCBLjlAXB3BEBpRhiaATjYBR13RGB3jPiFjBUljSAVjmg1jjjDRNiqSPRxidjMAcBOQQZ1A2TkJnQX0PQdACTnBuAIBbjJRej+15RJgANNNawLowp8xYopQgA)

## Usage

```bash
npm install mithril-hookup
```

Use in code:

```javascript
import { withHooks } from "mithril-hookup"
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


## Default hooks

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

const Counter = ({ initialCount, useReducer }) => {
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
}

const HookedCounter = withHooks(Counter)

m(HookedCounter, { initialCount: 0 })
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
const Timer = ({ useState, useEffect, useRef }) => {
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

const HookedTimer = withHooks(Timer)
```


### useMemo

Returns a memoized value.

```javascript
const Counter = ({ count, useMemo }) => {
  const memoizedValue = useMemo(
    () => {
      return computeExpensiveValue(count)
    },
    [count] // only recalculate when count is updated
  )
  // ...
}
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

### Omitted hooks

These React hooks make little sense with Mithril and are not included:

* `useContext`
* `useImperativeHandle`
* `useDebugValue`

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

Pass the custom hooks function as second parameter to `withHooks`:

```javascript
const HookedCounter = withHooks(Counter, customHooks)
```

The custom hooks can now be used from the component:

```javascript
const Counter = ({ useCount }) => {
  const [count, increment, decrement] = useCount(0)
  // ...
}
```

The complete code:

```javascript
const customHooks = ({ useState }) => ({
  useCount: (initialValue = 0) => {
    const [count, setCount] = useState(initialValue)
    return [
      count,                      // value
      () => setCount(count + 1),  // increment
      () => setCount(count - 1)   // decrement
    ]
  }
})

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
  ])
}

const HookedCounter = withHooks(Counter, customHooks)

m(HookedCounter, { initialCount: 0 })
```



## `hookup` function

`withHooks` is a wrapper function around the function `hookup`. It may be useful to know how this function works.

```javascript
import { hookup } from "mithril-hookup"

const HookedCounter = hookup((vnode, { useState }) => {

  const [count, setCount] = useState(vnode.attrs.initialCount)

  return [
    m("div", count),
    m("button", {
      onclick: () => setCount(count + 1)
    }, "More")
  ]
})

m(HookedCounter, { initialCount: 1 })
```

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

The custom hooks function is passed as second parameter to `hookup`:

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


## Compatibility

Tested with Mithril 1.1.6 and Mithril 2.x.


## Size

1.4 Kb gzipped


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
