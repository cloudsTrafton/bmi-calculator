import { Image } from '@fluentui/react';
import React from 'react';
import { TabBar } from './components/tabBar';

export const App = (): React.ReactElement => (
  <div className="App-Header">
    <p>
      Welcome to the health measurement calculator! Proudly built with React.js
    </p>
    <Image
      src="logo.svg"
    />
    <TabBar />
  </div>
);
