import React = require('react');
import { forwardRef, useRef } from 'react';
import {
  FormProvider,
  useForm,
  useFormContext,
  UseFormRegisterReturn,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { FormControl, Button, useMergeRefs } from '@chakra-ui/react';

// import { Button, forwardRef, useColorModeValue } from "@chakra-ui/react";

export const NestedRegsiter = () => {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);
  const handleOnClick = () => {
    console.log(methods.getValues('text-input'));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormControl>
          <NestedInput />
          <input type="submit" />
        </FormControl>
        <Button>GetValue</Button>
      </form>
    </FormProvider>
  );
};

const NestedInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const textInput = register('text-input', { required: 'This is required.' });
  return (
    // <>
    <div>
      {/* <input
        {...register('text-input', { required: 'This is required.' })}
      /> */}
      <MoreNestedInput
        // {...register('text-input', { required: 'This is required.' })}
        name={textInput.name}
        onChange={textInput.onChange}
        onBlur={textInput.onBlur}
        ref={textInput.ref}
      />

      <ErrorMessage
        errors={errors}
        name="text-input"
        render={({ message }) => <p>{message}</p>}
      />
    </div>
  );
};

export type MoreNestedInputProps = UseFormRegisterReturn;

// export const MoreNestedInput = forwardRef(({ onChange, onBlur, name, label }, ref)=> {
//   // const { ...register } = props;
//   return (
//     <FormControl>
//       <input name={name} ref={ref} onChange={onChange} onBlur={onBlur} />
//     </FormControl>
//   )
// )}
const MoreNestedInput = forwardRef((props: MoreNestedInputProps, ref) => {
  const { name, ref, onChange, onBlur } = props;
  return <input name={name} ref={ref} onChange={onChange} onBlur={onBlur} />;
});

// export const MoreNestedInput = (props: MoreNestedInputProps) => {
//   const { ...register } = props;
//   return (
//     <FormControl>
//       <input {...register} />
//     </FormControl>
//   );
// };

// export const MoreNestedInput = ({ ...register }) => {
//   const {
//     register,
//   } = useFormContext();
//   const inputRef = useRef(null);
//   const mergedRef = useMergeRefs(register.ref, inputRef);
//   return <input {...register} ref={mergedRef} />;
// };
