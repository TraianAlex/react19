import { useState, useEffect, cloneElement } from 'react';

import { createStore } from './store';

const Provider = (props: {
  store: { subscribe: (listener: () => void) => void; getState: () => any };
  children: React.ReactNode;
}) => {
  const [state, setState] = useState();

  useEffect(() => {
    props.store.subscribe(() => setState(props.store.getState()));
  });

  return cloneElement(props.children as React.ReactElement, state);
};

const store = createStore();

export const connect = (select = (state: any, props: any) => state) => {
  return (Component: React.ComponentType<any>) => (props: any) =>
    (
      <Provider store={store}>
        <Component
          {...select(store.getState(), props)}
          dispatch={store.dispatch}
        />
      </Provider>
    );
};

/**************************************************************
 import { Component } from "react";
import createStore from "./store";

export default class Provider extends Component {
  componentDidMount() {
    this.props.store.subscribe(() =>
      this.setState(this.props.store.getState())
    );
  }

  render() {
    return React.cloneElement(this.props.children, this.state);
  }
}

const store = createStore();

export function connect(select = () => {}) {
  return (Component) => (props) => (
    <Provider store={store}>
      <Component
        {...select(store.getState(), props)}
        dispatch={store.dispatch}
      />
    </Provider>
  );
} 
*/
