import {
  ChoiceGroup, DefaultButton, IChoiceGroupOption, IStackItemStyles, Stack, TextField,
} from '@fluentui/react';
import { Link, Text } from '@fluentui/react/lib';
import React, { FormEvent, useState } from 'react';

export const WilksCalculator = (): React.ReactElement => {
  const [gender, setGender] = useState<string>();
  const [bodyWeight, setBodyWeight] = useState<number>(0);
  const [wilksScore, setWilksScore] = useState<number>(0);
  const [maxWeight, setMaxWeight] = useState<number>(0);
  const stackItemStyles: IStackItemStyles = {
    root: {
      maxWidth: 500,
      padding: 5,
      marginLeft: '20px',
    },
  };

  const options: IChoiceGroupOption[] = [
    { key: 'F', text: 'Female' },
    { key: 'M', text: 'Male' },
  ];

  interface wilksCoefficients {
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number,
  }

  const maleCoefficients: wilksCoefficients = {
    a: -216.0475144,
    b: 16.2606339,
    c: -0.002388645,
    d: -0.00113732,
    e: 7.01863E-06,
    f: -1.291E-08,
  };

  const femaleCoefficients: wilksCoefficients = {
    a: 594.31747775582,
    b: -27.23842536447,
    c: 0.82112226871,
    d: -0.00930733913,
    e: 4.731582E-05,
    f: -9.054E-08,
  };

  // eslint-disable-next-line max-len
  const handleGenderSelection = (ev: FormEvent<HTMLElement | HTMLInputElement> | undefined, selection: IChoiceGroupOption | undefined) => {
    if (selection) setGender(selection.key);
  };

  const calculateWilksScore = () => {
    const coefficients: wilksCoefficients = gender === 'F' ? femaleCoefficients : maleCoefficients;
    // eslint-disable-next-line max-len
    const adjustedWeight = bodyWeight * 0.453592;
    const denominator = coefficients.a
    + coefficients.b * adjustedWeight
    + coefficients.c * adjustedWeight ** 2
    + coefficients.d * adjustedWeight ** 3
    + coefficients.e * adjustedWeight ** 4
    + coefficients.f * adjustedWeight ** 5;
    // TODO: Allow the user to convert between kg and lbs. For now, assume lbs and convert.
    return ((maxWeight * 0.453592) * 500) / denominator;
  };

  // eslint-disable-next-line max-len
  const handleMaxWeightEntry = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    setMaxWeight(Number(newValue));
  };

  // eslint-disable-next-line max-len
  const handleBodyWeightEntry = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string | undefined) => {
    setBodyWeight(Number(newValue));
  };

  const handleClick = () => {
    const score = calculateWilksScore();
    setWilksScore(score);
  };

  return (
    <>
      <Stack styles={stackItemStyles}>
        <Stack.Item>
          <Text>
            The Wilks Score is a measurement of comparisons of lifters of different weights and genders.
            This can score can help you figure out where you need to focus on volume training. This tool applies
            to any and all lifts used in competition.
            Learn more about the Wilks Score measure:
            <Link href="https://developer.microsoft.com/en-us/fluentui#/controls/web/link" underline>
              Here
            </Link>
          </Text>
          <ChoiceGroup
            options={options}
            required
            label="Select One"
            onChange={handleGenderSelection}
          />
          <TextField label="Body Weight Lbs (Don't worry, we won't tell)" type="number" onChange={handleBodyWeightEntry} />
          <TextField label="One Rep Max in Lbs" type="number" onChange={handleMaxWeightEntry} />
          <br />
          <DefaultButton text="Calculate" onClick={handleClick} />
          <p>Your Wilks Score is:</p>
          <p>{wilksScore}</p>
        </Stack.Item>
      </Stack>
    </>
  );
};
