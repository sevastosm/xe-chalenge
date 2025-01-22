import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createAd, deleteAd, updateAd } from '@/api';
import { useNavigate } from 'react-router-dom';
import { SearchArea } from './SearchArea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from './ui/select';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(155, 'Title must be less than 155 characters'),
  type: z.string().min(1, 'Type is required'),
  area: z.string().min(4, 'Area is required').or(z.object({
    placeId: z.string().min(1, 'Area is required'),
    mainText: z.string().min(1, 'Area is required'),
    secondaryText: z.string().min(1, 'Area is required'),
  })),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().min(1, 'Description is required'),
});

type FormData = z.infer<typeof schema>;

const AddForm: React.FC<{ status: string; formEntries?: any }> = ({ status, formEntries }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control, 
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      type: '',
      area: '',
    },
  });

  useEffect(() => {
    if (status === 'edit' && formEntries && formEntries[0]) {
      const { title, description, price, type, area } = formEntries[0];
      reset({ title, description, price, type, area: area });
    }
  }, [status, formEntries, reset]);

  const onSubmit = async (data: FormData) => {
    if (status === 'edit') {
      await updateAd(formEntries[0]._id, data);
    } else {
      await createAd(data);
    }
    navigate('/');
  };

  const deleteAdHandler = async () => {
    await deleteAd(formEntries[0]._id);
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center p-10 w-full">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-800">
          {status === 'edit' ? 'Edit property' : 'New property classified'}
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-4 flex flex-col items-start justify-start gap-2">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter the title"
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
          </div>
          <div className="mb-4 flex flex-col items-start justify-start gap-2">
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Type</SelectLabel>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="buy">Buy</SelectItem>
                      <SelectItem value="exchange">Exchange</SelectItem>
                      <SelectItem value="donation">Donation</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </div>
          <div className="mb-4 flex flex-col items-start justify-start gap-2">
            <label
              htmlFor="area"
              className="block text-sm font-medium text-gray-700"
            >
              Area
            </label>
            <Controller
              name="area"
              control={control}
              render={({ field }) => (
                <SearchArea
                  value={field.value}
                  setValue={(value) => field.onChange(value)}
                />
              )}
            />
            {errors.area && <p className="text-sm text-red-500">{errors.area.message}</p>}
          </div>

          {/* Description */}
          <div className="mb-4 flex flex-col items-start justify-start gap-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register('description')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter the description"
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message}</p>
            )}
          </div>

          {/* Price */}
          <div className="mb-4 flex flex-col items-start justify-start gap-2">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              {...register('price', { valueAsNumber: true })}
              className="mt-1 w-30 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              placeholder="Enter the price"
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
          >
            Submit
          </button>

          {/* Delete Button */}
          {status === 'edit' && (
            <button
              onClick={deleteAdHandler}
              type="button"
              className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddForm;
