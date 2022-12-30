import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input } from '@chakra-ui/react';
import React = require('react');

export const ControllerForm = () => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <input
          placeholder="first name"
          {...methods.register('first-name', {
            required: 'This is required.',
            maxLength: {
              value: 2,
              message: 'maxLength invalid',
            },
          })}
        />
        <ErrorMessage errors={methods.formState.errors} name="first-name" />
        <Controller
          control={methods.control}
          rules={{ required: 'This is required.' }}
          name="last-name"
          render={({ field: { onChange, onBlur }, formState: { errors } }) => (
            <div>
              <Input
                onChange={onChange}
                onBlur={onBlur}
                placeholder="last name"
              />
              <ErrorMessage errors={errors} name="last-name" />
            </div>
          )}
        />
        <EmailInput />

        <input type="submit" />
      </form>
    </FormProvider>
  );
};

const EmailInput = () => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      rules={{ required: 'This is required.' }}
      name="email"
      render={({ field: { onChange, onBlur }, formState: { errors } }) => (
        <div>
          <Input onChange={onChange} onBlur={onBlur} placeholder="email" />
          <ErrorMessage errors={errors} name="email" />
        </div>
      )}
    />
  );
};
