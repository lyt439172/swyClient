import React from 'react';
import { Switch } from 'react-router-dom';
import {routeConfig} from './router';
import {SubRoute} from './subRoute';

export const Root = function() {
  return (
    <Switch>
      {
        routeConfig.map(route => {
          return <SubRoute key={route.id} {...route} />
        })
      }
    </Switch>
  )
}