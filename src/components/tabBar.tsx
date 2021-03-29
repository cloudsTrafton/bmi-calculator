import {
  IPivotItemProps,
  Label, Pivot, PivotItem,
} from '@fluentui/react';
import React from 'react';
import { WilksCalculator } from './tabItems/wilksCalculator';

export const TabBar = (): React.ReactElement => {
  const [lastHeader, setLastHeader] = React.useState<{ props: IPivotItemProps } | undefined>(undefined);
  return (
    <>
      <div>
        <Label>
          Last onLinkClick from:
          {' '}
          {lastHeader?.props.headerText}
        </Label>
        <Pivot
          linkSize="large"
          linkFormat="tabs"
          onLinkClick={setLastHeader}
        >
          <PivotItem headerText="BMI">
            <Label>Pivot #1</Label>
          </PivotItem>
          <PivotItem headerText="V02 Max">
            <Label>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="Wilks Score">
            <WilksCalculator />
          </PivotItem>
        </Pivot>
      </div>
    </>
  );
};
