import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { ITextFieldProps, TextField } from 'office-ui-fabric-react';
import * as React from 'react';
import { HookFormProps } from './HookFormProps';

export const ControlledTextFieldAsync: FC<HookFormProps & ITextFieldProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ''}
      render={({ value, name: fieldName }) => (
        <TextField
          {...props}
          onChange={(_e, value) => {
            props.control.setValue(fieldName, value, {
              shouldValidate: false
            });
          }}
          value={value}
          name={fieldName}
          errorMessage={props.errors[fieldName] && props.errors[fieldName].message}
          defaultValue={undefined}
        />
      )}
    />
  );
};
