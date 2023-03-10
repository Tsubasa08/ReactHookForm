import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { Input, Image } from '@chakra-ui/react';
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
        <ImagesInput />

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

const RegisterImagesInput = () => {
  const { register, control } = useFormContext();
  const images: File[] = useWatch({
    control,
    name: 'images',
  });
  // const imagesArray = Array.from(images);
  return (
    <React.Fragment>
      <input type="file" multiple {...register('image')} />
      {images &&
        images.map((image) => (
          <Image src={URL.createObjectURL(image)} fit="cover" boxSize="50px" />
        ))}
    </React.Fragment>
  );
};

const ImagesInput = () => {
  const { control } = useFormContext();
  const images: File[] = useWatch({
    control,
    name: 'images',
  });
  // const imagesArray = Array.from(images);
  console.log('=============');
  console.log(images);
  // console.log(typeof imagesArray);

  return (
    <React.Fragment>
      <Controller
        control={control}
        rules={{ required: 'This is required.' }}
        name="images"
        render={({ field: { onChange, onBlur }, formState: { errors } }) => (
          <div>
            <Input type="file" multiple onChange={onChange} onBlur={onBlur} />
            <ErrorMessage errors={errors} name="images" />
          </div>
        )}
      />
      <div>{images}</div>
      {/* {imagesArray && (
        <div>
          {imagesArray.map((image) => (
            <div>{image}</div>
          ))}
        </div>
      )} */}

      {images &&
        images.map((image) => (
          <Image src={URL.createObjectURL(image)} fit="cover" boxSize="50px" />
        ))}
    </React.Fragment>
  );
};
