import { useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input } from '@chakra-ui/react';
import React = require('react');

export const ControllerForm = () => {
  const { handleSubmit, control } = useForm();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Controller
        control={control}
        rules={{ required: 'This is required.' }}
        name="text-input"
        render={({
          field: { onChange, onBlur, value, ref },
          formState: { errors },
        }) => (
          <div>
            <Input onChange={onChange} onBlur={onBlur} />
            <ErrorMessage errors={errors} name="text-input" />
          </div>
        )}
      />

      <input type="submit" />
    </form>
  );
};
