import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input } from '@chakra-ui/react';
import React = require('react');

export const ControllerForm = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <input
        type="text"
        {...register('first-name', {
          required: 'This is required.',
          maxLength: {
            value: 2,
            message: 'maxLength invalid',
          },
        })}
      />
      <ErrorMessage errors={errors} name="first-name" />
      <Controller
        control={control}
        rules={{ required: 'This is required.' }}
        name="last-name"
        render={({
          field: { onChange, onBlur, value, ref },
          formState: { errors },
        }) => (
          <div>
            <Input onChange={onChange} onBlur={onBlur} />
            <ErrorMessage errors={errors} name="last-name" />
          </div>
        )}
      />

      <input type="submit" />
    </form>
  );
};
