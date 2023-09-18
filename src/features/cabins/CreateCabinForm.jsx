import { useForm } from 'react-hook-form';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { Textarea } from '../../ui/Textarea';

function CreateCabinForm() {
  // React Hook Form
  const { register, handleSubmit, reset } = useForm();

  // React Query
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('New cabin successfully created');
      queryClient.invalidateQueries('cabins'); // refetch cabins
      reset(); // reset form
    },
    onError: () => {
      toast.error('Something went wrong');
    }
  });

  function onSubmit(data) {
    mutate(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label='Cabin name'>
        <Input type='text' id='name' {...register('name')} />
      </FormRow>

      <FormRow label='Maximum capacity'>
        <Input type='number' id='maxCapacity' {...register('maxCapacity')} />
      </FormRow>

      <FormRow label='Regular price'>
        <Input type='number' id='regularPrice' {...register('regularPrice')} />
      </FormRow>

      <FormRow label='Discount'>
        <Input type='number' id='discount' defaultValue={0} {...register('discount')} />
      </FormRow>

      <FormRow label='Description for website'>
        <Textarea type='number' id='description' {...register('description')} />
      </FormRow>

      <FormRow label='Cabin photo'>
        <FileInput id='image' accept='image/*' />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
