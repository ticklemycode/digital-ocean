# Redux

## Data Flow

Unidirectional Data Flow: data only flows in only one direction. 

> _It's easier to cross a one-way street than a two-way street._

<img src="https://dzwonsemrish7.cloudfront.net/items/3M1T0b2L0r231M1u3n41/Image%202018-04-16%20at%209.46.57%20PM.png?v=46a64323" />

## Store
## Actions
Actions are payloads of information that send data from your application to your store. They are the only source of information for the store. You send them to the store using store.dispatch().

```js
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```

## Action Creators
Action Creators are just functions that taken in some payload and return an Action.

>Action creators are exactly that—functions that create actions. It's easy to conflate the terms “action” and “action creator”, so do your best to use the proper term.

```js
export const toggleTodo = id => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}
``` 

>## Actions are automatically sent to all reducers.

## Reducers
Reducers are _pure functions_ which mean they are predictable that with the same input you get the same output.

You will need to pass in the initial _state_ and an _action_ to the reducer.

The reducer returns the next state of the app.

```js
const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
```


## Components

## Containers
Technically, a container component is just a React component that uses `store.subscribe()` to read a part of the Redux state tree and supply props to a presentational component it renders.

You could write a container component by hand, but we suggest instead generating container components with the React Redux library's `connect()` function, which provides many useful optimizations to prevent unnecessary re-renders. 

To use connect(), you need to define a special function called `mapStateToProps` that tells how to transform the current Redux store state into the props you want to pass to a presentational component you are wrapping. 

In addition to reading the state, container components can dispatch actions. In a similar fashion, you can define a function called `mapDispatchToProps()` that receives the dispatch() method and returns callback props that you want to inject into the presentational component.

##### Resources
* [Data Flow](http://redux.js.org/docs/basics/DataFlow.html)
* [The Case for Flux](https://medium.com/swlh/the-case-for-flux-379b7d1982c6)
*[Motivation](http://redux.js.org/docs/introduction/Motivation.html)

Notes

dispatch -> ActionCreator (Action) -> (Uses Action) Reducer -> New State


`mapStateToProps(state)` will taken the current state and map them to props to be used or passed to other components. 