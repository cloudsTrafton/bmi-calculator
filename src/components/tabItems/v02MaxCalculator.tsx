import { IStackItemStyles, Stack, TextField } from '@fluentui/react';
import React from 'react';

export const TabBar = (): React.ReactElement => {
  const stackItemStyles: IStackItemStyles = {
    root: {
      maxWidth: 500,
      padding: 5,
    },
  };

  return (
    <>
      <Stack styles={stackItemStyles}>
        <TextField />
        <TextField />
        <p>Result</p>
        <TextField />
      </Stack>
    </>
  );
};
