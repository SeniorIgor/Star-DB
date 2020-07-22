import React from 'react';

import { SwapiServiceConsumer } from './../swapi-service-context'; 

const withSwapiService = (mapMethodsToProps) => (Wrapper) => {
  return (props) => {
    return (
      <SwapiServiceConsumer>
        {
          (swapiService) => {
            const serviceProps = mapMethodsToProps(swapiService);

            return (
              <Wrapper { ...props } { ...serviceProps } />
            );
          }
        }
      </SwapiServiceConsumer>
    );
  }
};

export default withSwapiService;