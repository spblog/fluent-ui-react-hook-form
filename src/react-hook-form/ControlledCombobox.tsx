import { FC } from 'react';
import { Controller } from 'react-hook-form';
import { ComboBox, IComboBoxProps } from 'office-ui-fabric-react';
import * as React from 'react';
import { HookFormProps } from './HookFormProps';

export const ControlledCombobox: FC<HookFormProps & IComboBoxProps> = (props) => {
  return (
    <Controller
      name={props.name}
      control={props.control}
      rules={props.rules}
      defaultValue={props.defaultValue || ''}
      render={({ onChange, onBlur, value, name: fieldName }) => (
        <ComboBox
          {...props}
          selectedKey={value}
          onChange={(_, option) => {
            onChange(option.key);
          }}
          onBlur={onBlur}
          errorMessage={props.errors[fieldName] && props.errors[fieldName].message}
          defaultValue={undefined}
        />
      )}
    />
  );
};
