import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { useSession } from "next-auth/react";
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";

export default function CreateKitchen() {
  const { data: session } = useSession();
  return (
    <div className="p-8 ">
      <h1 className="mb-4 text-5xl font-bold">Let's get you hosting.</h1>
      <div className="grid max-h-screen grid-cols-2 gap-4">
        <form className="mt-6">
          <Fieldset className="space-y-2">
            <Legend className="text-lg font-bold">
              Where will you be hosting?
            </Legend>
            <Field>
              <Input className="block mt-1 border rounded-lg" name="address" />
            </Field>
            <Field>
              <Label className="block">Country</Label>
              <Select className="block mt-1" name="country">
                <option>Canada</option>
                <option>Mexico</option>
                <option>United States</option>
              </Select>
            </Field>
            <Field>
              <Label className="block">Delivery notes</Label>
              <Textarea className="block mt-1" name="notes" />
            </Field>
          </Fieldset>
        </form>
        <div className="grid grid-rows-2 gap-4">
          <div className="flex items-center justify-center h-full text-lg border-4 border-dashed rounded-3xl ">
            Got an image of your kitchen?
          </div>
          <div>Map</div>
        </div>
      </div>
    </div>
  );
}
