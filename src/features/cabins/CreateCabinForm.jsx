import { useForm } from 'react-hook-form';

import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit, onCloseModal }) {
  // Destructure the cabinToEdit object
  const { id: editId, ...editValues } = cabinToEdit || {};
  const isEditSession = Boolean(editId); // true if editId exists

  // React Query
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
  const isProcessing = isCreating || isEditing;

  // React Hook Form
  const { register, handleSubmit, formState, reset, getValues } = useForm({
    defaultValues: isEditSession ? editValues : {}
  });
  const { errors } = formState;

  function onSubmit(data) {
    const formData = {
      ...data,
      image: typeof data.image === 'string' ? data.image : data.image[0]
    };

    // Edit existing cabin
    if (isEditSession) {
      editCabin(
        { newCabinData: formData, id: editId },
        {
          onSuccess: () => {
            reset(); // reset form
            onCloseModal?.();
          }
        }
      );
      return;
    }

    // Create new cabin
    createCabin(formData, {
      onSuccess: () => {
        reset(); // reset form
        onCloseModal?.();
      }
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label='Cabin name' error={errors?.name?.message}>
        <Input
          type='text'
          id='name'
          disabled={isProcessing}
          {...register('name', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input
          type='number'
          id='maxCapacity'
          disabled={isProcessing}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity must be at least 1'
            }
          })}
        />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input
          type='number'
          id='regularPrice'
          disabled={isProcessing}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 50,
              message: 'Price must be at least 50'
            }
          })}
        />
      </FormRow>

      <FormRow label='Discount' error={errors?.discount?.message}>
        <Input
          type='number'
          id='discount'
          disabled={isProcessing}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: value => {
              if (value > getValues('regularPrice')) {
                return 'Discount must be less than regular price';
              }
            }
          })}
        />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea
          type='number'
          id='description'
          disabled={isProcessing}
          {...register('description', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput
          id='image'
          accept='image/*'
          disabled={isProcessing}
          {...register('image', {
            required: isEditSession ? false : 'This field is required'
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
          {/* optional chaining to prevent error */}
          Cancel
        </Button>
        <Button disabled={isProcessing}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
