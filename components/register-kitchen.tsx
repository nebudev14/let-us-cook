import { PhotoIcon } from '@heroicons/react/24/solid';
import { KitchenType } from '@prisma/client';
import axios from 'axios';
import React, { FormEventHandler, useRef } from 'react';

const RegisterKitchen: React.FC = ({ closeSelf }) => {
  const description = useRef<HTMLTextAreaElement | undefined>(null);
  const appliances = useRef(null);

  const photo = useRef<HTMLTextAreaElement>(null);

  const country = useRef<HTMLInputElement>(null);
  const address = useRef<HTMLInputElement>(null);
  const city = useRef<HTMLInputElement>(null);
  const state = useRef<HTMLInputElement>(null);
  const zip = useRef<HTMLInputElement>(null);


  const start = useRef<HTMLInputElement>(null);
  const end = useRef<HTMLInputElement>(null);

  const price = useRef<HTMLInputElement>(null);
  const fanumTax = useRef<HTMLInputElement>(null);


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await axios.post(`${process.env.NEXT_PUBLIC_DOMAIN}/api/kitchen`, {
      desc: description.current,
      // appliances: [],
      location: `${address.current} ${city.current} ${state.current} ${zip.current} ${country.current}`,
      photo: "https://st.hzcdn.com/simgs/pictures/kitchens/kitchens-michael-alan-kaskel-img~0d511d8e0e77ab3a_14-6521-1-7aacee2.jpg",
      start: new Date(start.current).toISOString(),
      end: new Date(end.current).toISOString(),
      type: KitchenType.PRIVATE,
      cost: price.current,
    })
    .catch((e) => alert(e))
    .finally(closeSelf);
  }

  return (
    <form onSubmit={handleSubmit} className="container absolute z-10 p-8 mx-auto my-16 -translate-x-1/2 bg-white border-2 border-green-200 rounded-lg shadow-2xl left-1/2 max-w-prose">
      <div className="space-y-12">
        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Kitchen</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Register your kitchen so that you can host it to other chefs!
          </p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="about"
                  ref={description.current}
                  onChange={(e) => description.current = e.target.value }
                  name="about"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">Write a brief description of your kitchen.</p>
            </div>

            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="flex justify-center px-6 py-10 mt-2 border border-dashed rounded-lg border-gray-900/25">
                <div className="text-center">
                  <PhotoIcon className="w-12 h-12 mx-auto text-gray-300" aria-hidden="true" />
                  <div className="flex mt-4 text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative font-semibold text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Location</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Provide the address that your kitchen is at.</p>

          <div className="grid grid-cols-1 mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  ref={country.current}
                  onChange={ (e) => country.current = e.target.value }
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Street address
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="street-address"
                  ref={address.current}
                  onChange={ (e) => address.current = e.target.value }
                  id="street-address"
                  autoComplete="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                City
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="city"
                  ref={city.current}
                  onChange={ (e) => city.current = e.target.value }
                  id="city"
                  autoComplete="address-level2"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                State / Province
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="region"
                  ref={state.current}
                  onChange={ (e) => state.current = e.target.value }
                  id="region"
                  autoComplete="address-level1"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                ZIP / Postal code
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="postal-code"
                  ref={zip.current}
                  onChange={ (e) => zip.current = e.target.value }
                  id="postal-code"
                  autoComplete="postal-code"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Availability</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">When are you willing to host your kitchen?</p>

          <div className="mt-10 space-y-10">

            <div className="sm:col-span-2">
              <label htmlFor="start time" className="block text-sm font-medium leading-6 text-gray-900">
                Start Date
              </label>

              <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs ">
                <input
                type="datetime-local"
                name="start-date"
                ref={start.current}
                onChange={ (e) => start.current = e.target.value }
                id="start-time"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Select date" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="start time" className="block text-sm font-medium leading-6 text-gray-900">
                End Date
              </label>

              <div className="flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs ">
                <input
                type="datetime-local"
                name="end-date"
                ref={end.current}
                onChange={ (e) => end.current = e.target.value }
                id="end-time"
                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm" placeholder="Select date" />
              </div>
            </div>
          </div>

        </div>

        <div className="pb-12 border-b border-gray-900/10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Payment</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">Hungry? You can ask the chef for some food!</p>

          <div className="mt-10 space-y-10">

            <div className="mt-2">
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Price
              </label>
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-xs">
                <span className="flex items-center pl-3 text-gray-500 select-none sm:text-sm">$</span>
                <input
                  type="number"
                  name="price"
                  id="price"
                  ref={price.current}
                  onChange={ (e) => price.current = e.target.value }
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div className="relative flex gap-x-3">
                <div className="flex items-center h-6">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    ref={fanumTax.current}
                    onChange={ (e) => fanumTax.current = e.target.value }  
                    className="w-4 h-4 text-green-500 border-gray-300 rounded focus:ring-green-500"
                  />
                </div>
                <div className="text-sm leading-6">
                  <label htmlFor="comments" className="font-medium text-gray-900">
                    Fanum Tax
                  </label>
                  <p className="text-gray-500">Would you like to recieve a portion of the food that is cooked in your kitchen?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end mt-6 gap-x-6">
        <button
        type="button"
        className="text-sm font-semibold leading-6 text-gray-900"
        onClick={closeSelf}>
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 text-sm font-semibold text-white bg-green-400 rounded-md shadow-sm hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Create
        </button>
      </div>
    </form>
  )
}

export default RegisterKitchen;
