# mithril-hookup

Use hooks in Mithril.

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

Editable demos using the [Flems playground](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3LNzBjbwksTNxEs2QFc0ZgNYBzfDosWSwIYkIRaAABACZ8AAZEgFoRanwAFgB+LFo2T1hhQTRTCytuYG4Ad3DCAAlxXzhuZTsHbmEwiKioZMJGzzMitGKDOGsAYVpzeiNufm4ACkrPOBgAZWIMRhaASnmpCuLubg9uVZhztc3tmGPuERhiTxE0bmR7k6xF4QVhCg6IAAohxrMRaFdLgByC43RhQ4S7e4AXWKylG9HG3AatF8MDYUxmaDmCxqERxTUWhIsxIYSJGaDG1gAgmYzPMjm9uJwIDAqoglvt+FJPjZFhT8dTZnS0cVilh8LlvMQfly2LRqJ4cAx8ABHTwwEQAT3WMFg1HBIh+IAAxGIJIiKPdWUM0LsANzFSggNbm4gQTF4BKIACsAE4VGoQJgcHggnA9DR6IxmFoVMiqFAIGgmkhUNGNHgupFoH0BmZvS9yFpnK53F4fAEgtNQrUemXcYNokl4gBGeQQcat7ql-qditUYhGsyaH3UKJmYzKZHKIA):

* [Simplest example](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3LNzBjbwksTNxEs2QFc0ZgNYBzfDosWSwIYkIRaAABACZ8AAZEgFoRanwAFgB+LFo2T1hhQTRTCytuYG4Ad3DCAAlxXzhuZTsHbmEwiKioZMJGzzMitGKDOGsAFVp-f1hufm4ACkrPOBgAZWIMRhaASnmpCuLubjHrZGooCGpfGDYKbjXiAGErm7uAXXnuVY2txkWYAwUDWuwA3MduCIYMRPCI0DZFsIFMIHshIScsEiQAAjTzEYj0VEYk5HBGkin0S7XXyIJb7fiHJ6vGl3RYAQmp7zYuxJJ1UfI6ICmM0KIBJuwoJKxyK4qNOb1ubG4WSFAHkRiBuHThGqwGBhLzyR8jcpRvRxtwGrQlSLZjBvjUItamos7bAjea0JaAIJmMzfYCQzgQGBVOmLBlSaWLF13d0wU3FYpYfC5bzEJHkti0aieHAMfAAR08MBEAE91jBYNRCSJsQBiMQSQ1S8l+oZoXaUEBrGvECAWvAAZkQw4yKjUIEwODwQTgeho9EYzC0Kg+VCuaCaSFQ040eC6kWgfQGZh7cPIWmcrncXh8ASCtBCR56p5tg2iSXiAEZ5BBxlCWo336D9zyoYhyzMTRe2oKIzGMZQN33WctHWUo5hgAAPbAzFgFQgA)
* [Simple form handling with useState](https://flems.io/#0=N4IgZglgNgpgziAXAbVAOwIYFsZJAOgAsAXLKEAGhAGMB7NYmBvAHgBMIA3AAgjYF4AOiABOtWsWEA+FgHoOnKSAC+FdNlyICAKwRU6DJsTwQsAB1oji3LNzBjbwksTNxEs2QFc0ZgNYBzfDosWSwIYkIRaAABACZ8AAZEgFoRanwAFgB+LFo2T1hhQTRTCytuYG4Ad3DCAAlxXzhuZTsHbmEwiKioZMJGzzMitGKDOGsAYVpzeiNufm4ACkrPOBgAJRgwCm5VmABlYgxGFoBKeakK4u5uMetkaigIal8YNh214gmnl7eAXXmuzWh2OMEWYAwUDWp2ut3o424yD2IkwOA+MGIAFU1iiNACFnsQYxFkUQDC0Dc7oiIHAAAq0cYQND+dHEACSdIZxCZ-nxQIOR2JEKhMHJlPh1kgMCgbE2YEBezli3OHm4xFo3E+dlo1FWxVhVMGbFB2JguJwgJgFyuFJumoxpvNYJg+COIn8GPwnEhnlFsOUAG4DRLuCJ4BiAGKWWwLZXW4Cwm6fR2osGksV2z4c+mM5ngyHQxP24gAFVMMFonmIizj-EuUplcqCnhEYYY+DAOtWyp2AFYEhnA-rbVTCBg0GxYPtPAAjLqW+NFiDyxbI1PcACE-AW6ZtdszGOzXJ5i2IIl9GZurWlaz3++4kLN1eEAFFDCIH-yncJLy0iy6zDDTgjAAES2DACmrQcg1tWEw2IFsKWQIssBJcBo2ECgixuBNbXvW4oAwOA4AAOQ0RAOnQkQsEw7C7XhWcugoscJynRjwjo1Q6NQ4QFEwq4aEI4jhEQYQGzYYRVA6PD7x4kA+MoATHiIuAROEAwz1oKBJJ2Oj9zkoZFIAAxTcjuAAEmANcNG4AAfWzKJIiRi0kozTiwmT91-G53O4tCFJ2BNBJUtTwAgaUJJUXTPLtOSAqUoTVKQdT6E07Souk-D9LQpkzCrWiYvw3Csqy5TiNEkBcvyyg9Ky4gAE8zBgCrGAAD0kGrCqysxCOoGB+hlM0KOEUycAKkr8NTYaQGssbOom+9vSgX0KNmmAPIW-d6Cq4hVrMY1GFG9bavwjg4AwGdYDYCiaRzblmQ2zablVCD1U7XU3DVc91u4VUzouq61Q1CFqGgcJQW4N5wh5NVCBpOxYCwVSuvw+hqDDUEKOWbg2GmM5rXEptdVbOYFlxrBHoW5QTu4by7V8mKGfwuKuH4oKyqSirxJ0zKspZzg2fUxLQo0sR0qkmm5JnKt1RGebNuKp6CJUsicGm6XiFl3g4GSJ40F8calYaprprgdiOspzb-sut4bs5XMWRpq9LZK4R9iYSKabpny6KZ+9buPZluAAMmDpZav5wXguE5KwoinnJf81nFPZ4XY9FrSE5R2K0I12XDaexWleV4jVeayi8-oAujca8vhEruWXc2tGfl8Ciw0+KNqKbkquOz-dhE2T5hie736dqunfwzP5imptAqQaWhXjYKYZjQUnqlqRemkWVeLHXhhyVGEMAEEzDMQFFc4cKqix846xQxZt7ePfZkP2fhywfBcm8Z9bVx3UOB2wAEdfQiHqu7WA1B1QiDQgAYjEBIH8j0z5DDQOSSgIA1hQO5PCPAAAORACQorqBwHgIIxFMEaSMOQzs1E7xmAwGwDgzIKKxASGYVqMFlCYOwTAaBEA8FaASIgXsKg-hUD1k0JAqAQCpjwNLKAWAMDfyZBQvQM0RDkC0M4Vw7hZDUDYGgXQQQoCVjYGAQiYYgjTFkBgbQGBWqyCeDOOAshFHKNkEkAA7JkAxxF3EFGUaotA6jMHG00FghqsASFyI0HgLokRoB9AGGYTBLZtEgF0W4Dw3g-CBGCKEWoPQUlL0GNEJI8QACM8gaTECKd0ZJ-QylpKoBEvAcB0YQDMMYZQEi4lkK0PsUosBtT0JYpOGGNQIj8iJLgZQQA)
* ["Building Your Own Hooks" chat API example](https://flems.io/#0=N4IgtglgJlA2CmIBcBWATAOgOwEYA0IAxgPYB2AzsQskVbAIYAO58UIB5hATncgNoAGPAIC6BAGYQE5fqFL0wiJCAwALAC5hY7WqXXw9NADxQIANwAE0ALwAdED2Lr7APiMB6U2Ze3SOlgiE6hBkMsoCSACcIAC+eHIKSioAVjIEJHoG6jQQYIzEXOoWYBbiPCX2GurMSO7uAK6kjADWAOYYJGDukOqqXFIAApgCGAIAtFyEGAAsAPxgxFD1CPa+ufmFFsAWqsTEzfWMeBYA7hC9ABJ7zeQWMaXlFvY9fVJju-uHq6TrBUXbhHq5HUxDAV32t3uZVBTxU7kBwNB72u5G+v022zKEAMUHIABF6Op6HcHjD7Bh3FiceQxlBCfRvr4MsCLAAxfo4gDKRPUQIs1gsAApMRzSFAAJJQY5A+Ds7Fi7mEvkxACU-JcW18FgszKKEHIAHlSLAIKR4PyLDK5VyeUDBVSxZKVVqLFx4LyuKQrIbjabzdYAxZSMtYC7tbNioLycClTSoE4MI1mqRiCdSPZnV7tRYkN6jSazWHsxGwFGVDHeXGE2QC-AM0XtbnS9HbVX1BhiOJxLX66QYkzQkVwc1WNaFa2LWdLijBWOoIrK8cESCwSjMwOKEU5xbgC6zNiTrnhRZCeouORcyL5VKdvRyABhVSEgCCjAgd1V6s1We1bo9XubFQHSgexjj4BtI3JegzHpLhQIg7Vdx-bMUOBABPBBLwQlCLAAI3oQg2h4RoJTAehWngXMAAN6i4WBBQAEmAYCMGg2DVSo7DtX7ZCUJ4nCLBVPAIMAjB5EUUCHmvMTEiEkSywwchGAI+A4JAOTeNvB8n3UV93wAMn0yDy1bSTS2HUdRXnVtjivHFJVzFjoDuFVMxQkQ3LuXweI3FlH0JAAleBCAgN8sgABQgQjVItY8ZQXeBpRYOcF2VNVrA1JDtV1Cw+DdEKwr0SVjhYdQgoK+V1ElEQLXinl4EFHBPJy-VytCyr8z9Wrkqs1LyEFfL2qyJ0XT-WiAIUjIzyoVF2FyotzOuSzrz62ypPsqBc0GwqqqgFzhOQ0SAmC5x2Hk+xjqCeDNMQriLDIQgn1ICjc39DVSranbJUFAA5eowFw1TBXgDAiS4Cj2xg2B6ngVzsLibDgPxekMDIxh7Ssr8oxu7NAOIRhgjIa6BIErKSYEqGYccqyMGgO7uIO8mUJY8S6xx7VPIEuHNM5wSXQ87zfKHJaoH8srgqGvRIuirhJ3OVRh36sXPsq6WRy4JcgRXRX11IHLX0YWLtjqwlzU-DKtieLMcr4J9tJfN8SvdC47zFvSaoFE39HtehYBYTyxs9ebDsmshpr94mcMA3D6nUEF0zOnGyfJwgGHIcgfsSXM7bdt8LAjewY7jomQBzWEi-j70xgLZpI-Jh6TUIo90ve53XZ0vTBQAQhzju315vjGZJ3uHffAuQDxeACOCGD9B1HT7DL+xnyCcxTfnwlvi5osNJQkfdLzwzIws0WdJViKovV3fcYUpG6+zJGCSJVGmAx68sew0s51su7gKH8n956X-jhVUEFuYoU8iIQW6ZSBgFRsQRo6hsbanjICRQegMAAEcYZcDQpyeAgQQRcDLAAYkcKda+U4FYzgNpmTMOhOhvgQFwGg+FAbaA4AQk6IQKA0AiCgaIcQEiKBoMuJEHwbgYFSAwsOWQch5D+JbJg74oSPHJPCHSYxlH2AANy+F8PAAAHhsIoOUxGrghEbS0LAEpJXgAAUS7CdFyWMyZWl6q2am15JRfmTjqQcuV9SdTNE7KqPpawe2sfABKgpgywFgCqPRMDmaNFXmQW8YoEB9X8s9BqFYgRqj8dqUq4pwl+kFPk8gtMylmkSUWHyyEZSOPECdQUgoW7fgEsoxS9RcKcH6IDAAKsQFKrY34bWOE9OA0TWw5IonUzSgcvTtN8dhbpjRyC9P6RAQG7JQSjNjOMx0N4plZNmU9eZSSBIxCudmVUSSixLLzL6M0tyeL3N8DIvIUhVKsPoOw-wXC0m8OUDgFAqBYjxBAKzURmjunSPSLIwwygcqP3pDuF0EROnZkqVhTSQSXmUQsGeGG9SXQIyzDgPFqFPHYpQgS2suYSVsz4uSoeaBqU4tpUU55jLSi+xYGSrM7yHlmmMYonKyiMVZk2X07gOz4DDIOZWI8wFioZOmdki5sNVnIVRZjAUaKiR8DVVAEQtzsqhCoCDWAxBWiCiorK7ZuFTStAsJU0oBQLBMVNTEKiCzmY00qdU4J-p1rHP5IGNAEEIziAFSynCTKuAwwtf4zcFgoAEPoGhC0aABACAsAAagsDgfNFgABUFgACyhJVAYC4PQMUoJ2mptKoM3I8AEFIJWRbZBOFTkzNjHMhqLFKm8yEhmrNaFPIUu1BsrZ8rdnlGVUCVVVl1UDq1Y2+ZuqUL6vfoaqyyNjWmvNUWUdrYQ2EotHE2AqbmTWowLa+1NEKALoGa691E5xBep9euqAfqA3Zk3ec7dI6g2tiAyKz5nDCE8LCCANA4KkOQuEUkJGtIUYIt0PoZFIAjEmLTSyI1xIBTgSzH46AuYhBFlZrmew4p5D3zYmDejIAqiMFqO4eghRVC0VTvAdBVTWjy16bTYg3H07unIO4fIsA0K9AMPAdwRiFCMGkNx2ePGxg4AwIwZ6kdZ10qsJtEtwC6OwgAFKNrrInFCLGeNsY41xnjvR+MICExgETbncLick6VGTcmFOqCUypwxamNMOa4GMTA+nWiGaHpR0zaBzNZ1hDWmAaFmNaa4E5uOnG6iub45MDzBhhOid8yEfz0nZNUGC6F1TeRIs5bGAAZj0wZuzXlSDmsBXB0INBphIAABzTFQ9CxINAOjpxkZkPDuFFg5rJj+vQYw42QHk7mcgjaaQsH6OIJJPEMDAWxaYJSDA0KOQQIY25vsICtFIGMc4gmLw6iyKpW5+FCKtGImKXMJCuwHZdMpGArrcxgsYDd6Bx3MbFph+-MmC2uCZuiyCTjJbIfuqoM5Eh8A8eHd8KxHL2KzhQF6LmFAAhIe3JC-djQFOqdQ6zEjlHEx6CmFXRYSnABST7BEiIIL+xYXH+OXRfYFyRMY5AIAAC8iUkDMB96HrNsUrfUFL2XRKcAADZqcujIuDU01GLAFoLa1xnBPSCKWUoQGKZMzvqezVdoxtzuxGLGD91M4PLeKQnMtsOGu5fg+mHr62VACj-foFHn3lTaROBJ9AcnJaLculp60enyfQ-ahZ6pNnHPXs89udD2P8Z2w1i6oj-nnuSK5hNIoGPrY49l67LWbF4vq9C7dFABvsYm+JlIMmVMXpK-fd+6ZkhMBu-Q6mjwP2beCis4W8XMA4PMeUBNHtCfMBbkg9MM9cHKAs8Zv1I7y7pRru3OSFrCA4g0JjCmlkZ3hipdg3ULdk0D2nv6DAK923mQuA+4z4zTupAr-D648YiakDG6m4lqCaHZ9bcIDbKCRBIA4CCJiAgA1xhB8BoasLLBkSoymjTZpAgC0TaDKAcYXh1CEBQCkCpAdC2r1BQDdg8YgydDcbJD0CGLuAmh9LuAxywBkTuAjBYAzDwjpz8H4H0CEFW6EAzYEDqBoSMBJDoTUBCITYiLKAvD9CwDIifCMA6BkE0CUFcaNAtDtDsHaFvASKHADAjCYA4CeD6jqDdDyw6F6EHAGEKFKEqHyoEyxAYEwrKD2AABC9QUge+bqAAmggrLAaGmBYIrIvI9ISBYM+OFOKBYI1upogDEEAA) - this example roughly follows the [React documentation on custom hooks](https://reactjs.org/docs/hooks-custom.html)
* [Custom hooks and useReducer](https://flems.io/#0=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-EnKIfG-5-babNPjFE-M3qRxwHQQpgjbrvlSuwT54hBNXl4-AfjYR6X7WaYdd5JGvkzhgH8otJGgXoYjBgWyVz45mFHDQez7Ztl5xs7miFP4kX3xtV8qeTC6XFpc25jzpaMIE0LRbSyoKCaFOrbBJl64ItRcYep2AAA1QoQctI0Dzi8rzeGaB8G4uNGwkXSBAvmsBZTjWWv5NPBjQu2E0pTz61FBbbL34TSG6ORbRoVKTg2zAStqn-kvRXGt7iG3uJBA4IfUccUVTvxu9oAAhBQirlXqtYtrehWbxdQuEBrZmJd0QV0IFIOuzd0giC9pkvuugSA0DtBhzgBoZ6hRXuEMULgz6pRKGEEgYdNjSJtBtfIiAAAvRxAA2Ogbh323TaITj5bQiHkHocmeAEANX4SgmgKnNOLx06J0zln+UYAaHKIBHAKBqc1rxIMJeKca7BHkB0AQHAo0bhBvIwcEBWDS-ibCigy18fC5eA68XkvefoUV+IYnZPxeHAt1RFhRs1esAQA7mc6qeDHwUGAc1A5uy6623Cw3RLILopqUHg3kYpE8GCPjxRvSNBqqupziXUuFJ4kj-C7QFT8qRXx3453gFXcftukGKAZpxd0DoAAUkDza-H5A8-VDV3QW6Vh2cSEAm3i8ij32s875znv6FmakFd+QMIgFRDQEQjwW6VN2YyUAkonPDRIzwBvMfL3nl68fJFnOCyjfm-mHF+3tnHPR59dHPzhngvNAD45555UfB+8d4vy-K-N+SOM9gMz+-b+JB9oEoD5Bwt8ZYC8ncE5VQ3dbpCh2cvcbs-dpRBxboN16FKh9NAIB1rB4BbpjdRdL9eIv9uwf8-82h8CHUn9ZdSBEIj5iw3BxdqcNxKBoBtAB0HIdcLwADOc0hP96dv878H9ACy9oBK8oJq868M89cGcT5NJc9ZxNIa5C8oCS93dy8xCLNa9d9v9ZChxQ9tBw9M8iddCDCLE5BtBII+AbEE9EQvcEBWBU8edtDuwc9uoa5bIj4d1WRAJUQ2JbpVD5FzQtBu8RCK9RBCDr9+CSDQYycn9uCIjiDD4bdg5e8+tbDu9tBucmC6BKFbplCXcYCLwAiXg9BsNSFKBdU58LxpgixtczB6csdOd-dD5UDZwDQKAuwxMB0GgejUD4RaD7RRYIB-BAIUAtC1pf9SM2CYAoB-CQhkjAI4d090IFB31rc4DygeBSFkDSBdc61t1Ic91lAcAWhYdyd+QWAQB1AtBOQaAUcRRIFYBFEG0NB0dxQvxqBhAtRPAfBiAoAeAdhYhf9nhXc+t+pjQ+BpgX8vB1BBhUhHjFEvAbQsAnRch8gvAES+AXi9d8hxQuFlB2wLBEABR7jlAEwqgkxQt0x3jSBPiXBoFtQfAux9RDQ4gTRgwKT700w3ALQbRMBydaRSZxB2SmIOAuTqSCB8ThASAqgY4LiCBL0RRegaMftmMoBGNqpIp+QgA)
* [Custom hooks to search iTunes with a debounce function](https://flems.io/#0=N4Igxg9gdgzhA2BTEAucD4EMAONEBMQAaEGMAJw1QG0AGI2gXRIDMBLJGG0KTAW2RoAdAAsALn3jF0UMYlmoQAHnxsAbgAI2+ALwAdEJQhiDAPiUB6VWtMgAvkR79BIIQCsuJSLPljFFgCo9KAAVETYYLUjMDXJEPkwAa0QNCBYNcTFcFAsLAFc8EQgIRJghSD58vAARRAAjCDyoMEQLDTqATw1qAHFMOpSAJUwAcywofEYACkzs3LEAdzYxOXJyiEqR-sQAfXJR8fwASmCAi2C2PmwIcjENPg0WSgeDWZgc-KhsRJH1yr5liJyBwAAIAJiEtEhAFpyGAhAAWAD8fAg+DySAMFyuNzuwA0SzEIgAEsVSho7I9nhoDACicD4NCiiU8tgsVBLtdbhp8WACmINqSSpFKU8NjTXBY+TABXwmWSYOzObieRo8Jg4SIAILYNgUqnigxCCw4Njs4LeGVqxAasAiACybCgABl5CMiRodBoAMwW6BW-D1RrNRD2yJegCstFoftgd0QAA9+NgkABlG2axDh7oGABCNrEnAMRAlAGlEPA8F1nXlixL8+QYBqnXWDKmxOQ8mwliMRAZGLGrYnk0hnU7Ep6NKsHjpTMENPcpgZMMX5wueWv1xk4iwUBKAMSrqBbhfQMDwNhgRJ7lKzjfHk8Ly3xpACWST-AQPlvsRCACOeSIOQHTpkgYACuQS4gPu6qagYJwPo+FbxL4QhqJg8CAZO06bieyE-kIqgwNgmBiHaACiai+FMUCIAsGiUdRBh2pgUAjIg8EIY+di4Q4uE4Q+CGDvGSZXKO47ZtO4amPeT7+ncF5Wl6UlCAk2BTMOYmIGOUCJFxsSIGIeTkMe1CMOszSkVMQg2Ypv5qRpnoydQrbEBoiCMEcRxCDAF4tFMACMCE8Q+wkaAAwhs1y0e+XpTPiBSIO2pGICWiXkSwLCIOBaV4IMiAsLliC1A0TQtBSRxObJGi5BoyVyBorH4NaKxAZELA3BoNlCGutXpraIhTkBfBrs+3SwXaITDSWeBiP1mpTeQfCMJOiX1YgUHwb1bRagACgAktaA0GTAGJiIqD5jdQcSnfA50zYZ+W3edK1emtYgpVMZn6X1GZ2k6Ixqh9RmRFMCwiIZEPkFOUMpBEGjYPIqhsRoe2HXEAFZmI+lXRE83-WxD1iPtMD4+EbGvRo72fSwGF4D9bQlcG5UTYN05qhAMOkVodzQPAXQjOoWZU5EWByFa6GYSk3XbV1NlaOkrOLQ8IiYJEUDGO0iDyFT2D4ClzWEuTGhYFaUa0HwF0LrVWrRCdZ0wykaMaGAGHwGqRQYs1fNdOwcSpCGItAUDEC4FOHS6mxo3yRogalSG+Bk8rq01EGZUbUr02x2nIZhjjMem2I5E+HEzVvXlBU0Ri8D6Wu6WZdlYhLohGhTJVd7ALhC5sOkUxx8zBBJ8NGgAGQj9n8ctInf0iMrQhIGxHoyazjoum6RKVZ3LdbrNJNkwDUwdoB+mPkgdwa-RXqF8XqwEOUxlxLFGjVClQgX23NVtAkyRqsZKREtzBYKREqOxNmreMJcCBDSWl3dcrMdRsD7jnKeQ8lreSJPIKYN0zrSWqo+buvcL6eh0FfcBN8gJ3z5OQR+2M8H4IXLvUmM8D600rIgE+9CWpPRwVgrMOChDYLujADh3FYELjsCI-UFY8B0J3o9PhQivqeVgSFLcfEW7UH7unaeA1lYrVqgAeSgPzF2bt3IN3AgrCeA9mqs2gQ8FibEsxrlrg+OIRkTKLiNDgNkxBcIuW3l4kA1hWyBIXHwKCTpsB5F-KzI8nDZH4O0HuAwcS-FhJPCmTALQijwEDOQFJIAyZaBCE0Zx6SEmng5F8GJN4qqzVQRExAQgPrkHYr+SWx8iBiJPGeVWTi6l3gaTPZWGkWkanaWhDCXSeniJ6ZIo43TAkRKNE6DqdYAn0JWa4TSKZyklk2ZwgwIRgKFKWZU9yok9k6VKBpK5aYZ5ZkkQuTy5z8HbJ8sDAodY8bMKjhkhcSIJT7xRjLEAsyNB7gAAbcKEXuAAJMAQR5157rxEHYKF8zYGvNgcisoC93R9gyUCj5eL4mcLxapHAvDnpOQheEqCAiFEmDcviZIHQ9zIpafsK8+1moOBzACk82zLgjDrPiGAcJOXMqEBqRYNxEgAFVyDwACtGCqbyLkfP1h9DZ9LhWMo7NkxI0JeACDrFyo1V4AByzhFn6q3B8uVEQxCmucBamVzqZS2oEPaoVj4PnYDiGoNgdFQkXIDVBTAeRVAQHJRGk8W8E30MlWAaVz0hBBsQCGuiyr4CauTVuMQEdECFOjbGiwCZoR8ARCuCphaTzeA7Agd4U5OypQdZw6NAoskcseHTDt-rOHqIbeubZIS3IGAAJqNGhnUSgCw8DQ0-FmKAAByO4p1sBcjuOWtgnMPojEVCAZ5lTT30PPSeZRQ7PILghae09e4oDV1wgOQSd6oAhTGkKZI+BIo4hincL0Rsf0wCmP+6KvgSzSllKBoSzQY46mwJOJNGgc0LD3B-WcuEIk-oIBB6AvhgrBGCHwVSwYm5rk-N+VCmNgKgUbjcKC+4jAsr9QuJDwQELSDwGBMQ+7YCKG9CgCMABOewjgQBmpcKadwngZByAUGgQIFxSm0UiMUtGwQ3gfEwJlDgbBX7LDKWUHxSA-gWBurOloMArBfjyD+UiAmLDGfU9CGUNxEDQiAXUdzQEQ0tD8wNaEppzhQDOMERMO6XYx3gbqbCw8O5rnccZY8WUyIiGbluKFOnciuazLK7d5mKgWFZkiacOhEXTjsCPAQqhMA6D4AUS8UKC2ocdZDNEhSejkRCOyNRLiWkQygFgqqawPDQDbsRqA0gKi6iQOQRQdRthSBILxxuAmuBoDVSgME3oJNOAEIoGDGx5TCjk7N6Aim-BoEiwmaLY0Tt8FA5OeKQd1pFQyllSxEiqrxTrqnSepbW6dNStnLAHR24yXa5-OqwMUhNRaqsdqnUtEJzQ9MjiLcrpo6ngANUx0TJm2iCdS0ptTOQUxQfwa3PXb7lHAlYehz02qiq9YpWsdojHUtGosFWODzAHQeljX6fgBbk5ZohEuIgRoTcmeJLkWIYnCdSeASp5j09ArAwQ5p-g2q4VWItHdhgqc0vZdWNBy7fp7FQZ005tAAXXRHHsVSNDJoqImjYxZ20MI8N4ZFHokAhGwbfCc-R5bsUDxWQ6oBhbzHUQresXYs1GWGTaryyNk6UB2vBcIyAvu-AQgNBS4EOb9pkRzwZigYjm6rS5CF56Slzx8uYePkrxqEvMuYkzCagtzXABuFRBaFzUFByWHPHR9FtCMSYuI0JXbwHdgVenceeeo4rLn53ziW5HEH1AXCTfjy44IKrrHczP278u1cDgQElsrZ48hcCm3FB7d2xGA7UnnCKHKDAeTTbfBLZohdCoYJBtJOh7i0B74LgdSyDQi0wAj8x7hNiwB+bAgsB74hSnDVQNBVowBsAABeAMe4DQ5A+S0IOBGBwQmAJYmAKAIaeB9e1UcgCYrqgYkA+w-G0AT6hGUBMW8ANwe4+4YIAUomAAbAAGLeiUFQCFbIaoYkT4DIwjB7hgi0DYAJjSE+QzzVRLD4BEh7hqq0AACkvBMBrqeB+BwOYIcQfAvBChShEBQgEY8QvBJBZB+wqgBQe4oh6hrhNw+SBh6hHMF4zU+4YA4RmhrMKAHU0osksuF4tE3BtEkRM8KAKA3m9QiQyw0IUSMS0IWSOSCA+SqogQEUQIGwrQBiiM+wFgqYemzYGgEWD4Zh7mxaSAe4ywGEl4vBkA-BBSGg+4mAQx0hwQnypEBQJYQguynA1ULRFhwOAUCIvh0cfRghom6xmhaynMIBEy4BGgAUEYQRtAGgxxkBwQIUYxIM1UoBgsUAe4CIahCYJxzxZxn6JGMheK1xuxdx+xhxTxpxJxfhpBQE5BxgsogRTxcAIRAx2siAmhyK1UREvae4LASAGha49hRB+xjxgJa4bhIJPaEJwR2gMJ2sphV27mBBCxAAHMsW8Q+EyrSqKnQrofodiY8bwQuBDGwL2GIAYdGHSefguIyQ7IRKRDEDDjcU6NCEgHzvyYKRSGuCKXdF1FaiatJjyKol1AibKrcC6m6gIHQnMVSQYUseidjggAIQMesaJrwVqcqXcJmsGqGvRJKd8dCISdiQqfaTqVmuho1DGvunQtybyfcRyWuHYA-nxs-ttqJigAFNSfYMwCAAkaUNwJ-kdmgHSECBwGdokKyNIMZFIGgLlp8N8L8CVtmQyHmayCCFCBCAFFYC6hYFWbmcyPmdgNIMWojIoGQMCNgH4HYMmdJooIqngSjHTo3JEEbI1GHuVCwGVJwTNnYEAA)

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
