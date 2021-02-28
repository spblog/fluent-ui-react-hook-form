import * as React from 'react';
import styles from './ReactHookFormValidation.module.scss';
import { IComboBoxOption, PrimaryButton, Spinner, ComboBox } from 'office-ui-fabric-react';
import { FC, useState } from 'react';
import { DeepMap, FieldError, useForm } from 'react-hook-form';
import { ControlledTextField } from '../../../../react-hook-form/ControlledTextField';
import { ControlledDatePicker } from '../../../../react-hook-form/ControlledDatePicker';
import { ControlledCombobox } from '../../../../react-hook-form/ControlledCombobox';
import { ControlledDropdown } from '../../../../react-hook-form/ControlledDropdown';
import { nameof, sleep } from '../../../../utils';
import { ControlledTextFieldAsync } from '../../../../react-hook-form/ControlledTextFieldAsync';

type Form = {
  name: string;
  email: string;
  minMaxNumber: number;
  asyncValidate: string;
  multiCustomValidation: string;
  datePicker: Date;
  minDate: Date;
  combobox: string;
  dropdown: string;
};

// fields - required checkbox, combobox, dropdown, textfield, datetimepicker
// validation - required, pattern, min-max-length, async validate, validate function and object
export const ReactHookFormValidation: FC = () => {
  const [validating, setValidating] = useState(false);
  const [validFormData, setValidFormData] = useState<Form>();
  const [validationError, setValidationError] = useState<DeepMap<Form, FieldError>>();

  const comboboxItems: IComboBoxOption[] = [
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C' },
    { key: 'D', text: 'Option D' }
  ];

  const { handleSubmit, errors, control, } = useForm<Form, any>({
    defaultValues: {
      name: "",
      email: "",
      datePicker: null
    },
    reValidateMode: "onSubmit",
    mode: "all"
  });

  const onSave = () => {
    setValidationError(null);
    setValidFormData(null);

    handleSubmit((data) => {
      console.log(data);
      setValidFormData(data);
    }, (err) => {
      console.log(err);
      setValidationError(err);
    })();
  };

  return (
    <div className={styles.reactHookFormValidation}>
      <div className={styles.container}>
        <h3>This sample uses native react-hook-form rules</h3>
        <ControlledTextField
          required={true}
          label="This is required field"
          control={control}
          name={nameof<Form>('name')}
          errors={errors}
          rules={{ required: "This field is required" }} />

        <ControlledTextField
          required={true}
          label="This field is required and accepts only emails"
          control={control}
          name={nameof<Form>('email')}
          errors={errors}
          rules={{
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "This is not a valid email address"
            },
            required: "This field is required"
          }} />

        <ControlledTextField
          label="This field accepts only numbers between 0-10"
          control={control}
          name={nameof<Form>('minMaxNumber')}
          errors={errors}
          type="number"
          rules={{
            min: {
              message: "Minimum value is 0",
              value: 0
            }, max: {
              message: "Maximum value is 10",
              value: 10
            },
            valueAsNumber: true
          }} />

        <div>
          <ControlledTextFieldAsync
            label="Async validation, pases validation if value is 'spfx'. Validates only on button click"
            control={control}
            name={nameof<Form>('asyncValidate')}
            errors={errors}
            rules={{
              validate: async value => {
                setValidating(true);
                await sleep(500);
                setValidating(false);
                if (value === 'spfx') {
                  return true;
                }

                return "type 'spfx' to pass the validation";
              },
            }} />
          {validating && (
            <Spinner label="Validating..." styles={{
              root: {
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                flexDirection: 'row'
              },
              label: {
                marginLeft: '5px'
              }
            }} />
          )}
        </div>
        <ControlledTextField
          label="This field uses different validation rules - '1' and '0' are not accepted in this input"
          control={control}
          name={nameof<Form>('multiCustomValidation')}
          errors={errors}
          rules={{
            validate: {
              notOne: value => value !== '1' || '"1" is not a valid value here',
              notZero: value => value !== '0' || '"0" is not a valid value here',
            }
          }} />

        <ControlledDatePicker
          isRequired={true}
          label="This is a required date picker"
          control={control}
          name={nameof<Form>('datePicker')}
          errors={errors}
          rules={{ required: "Date is required" }} />

        <ControlledDatePicker
          isRequired={true}
          minDate={new Date()}
          label="This date picker requires a min date to be greater than today"
          control={control}
          name={nameof<Form>('minDate')}
          errors={errors}
          rules={{
            required: "Date is required",
            validate: (data: string) => {
              return (new Date(data) > new Date()) || 'The date should be greater than today';
            }
          }} />

        <ControlledCombobox
          required={true}
          options={comboboxItems}
          label="This is a required combobox"
          control={control}
          name={nameof<Form>('combobox')}
          errors={errors}
          placeholder="Select a value"
          rules={{ required: "Please select a value" }} />

        <ControlledDropdown
          required={true}
          options={comboboxItems}
          label="This is a required dropdown"
          control={control}
          name={nameof<Form>('dropdown')}
          errors={errors}
          placeholder="Select a value"
          rules={{ required: "Please select a value" }} />

        <div className={styles.footer}>
          <PrimaryButton onClick={onSave} text="Save" />
        </div>

        {validationError && (
          <>
            <div>Form validation errors:</div>
            <div><pre>{JSON.stringify(validationError, null, 2)}</pre></div>
          </>
        )}
        {validFormData && (
          <>
            <div>Form passed all validations</div>
            <div><pre>{JSON.stringify(validFormData, null, 2)}</pre></div>
          </>
        )}
      </div>
    </div>
  );
}
