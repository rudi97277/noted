import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IRecordStoreRequest } from "@/types/record.type";
import { PlusCircle } from "lucide-react";
import { type SubmitHandler, type UseFormReturn } from "react-hook-form";

interface IAddRecordProps {
  form: UseFormReturn<IRecordStoreRequest>;
  addOpen: boolean;
  setAddOpen: (data: boolean) => void;
  isPending: boolean;
  onSubmit: SubmitHandler<IRecordStoreRequest>;
}

export default function AddRecord({
  form,
  onSubmit,
  addOpen,
  isPending,
  setAddOpen,
}: IAddRecordProps) {
  return (
    <Drawer
      modal={false}
      autoFocus={false}
      open={addOpen}
      onClose={() => setAddOpen(false)}
    >
      <DrawerTrigger asChild onClick={() => setAddOpen(true)}>
        <h1 className="inline-flex cursor-pointer justify-center gap-2 p-1 text-center font-semibold tracking-tight text-balance mb-2">
          It's Noted
          <PlusCircle />
        </h1>
      </DrawerTrigger>
      <DrawerContent className="mobile fixed">
        <DrawerHeader>
          <DrawerTitle>Add New Record</DrawerTitle>
          <DrawerDescription>Record your Expense and Income</DrawerDescription>
          <div className="flex flex-col gap-2 mt-2">
            <Form {...form}>
              <form
                className="flex flex-col gap-2"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="expense">Expense</SelectItem>
                          <SelectItem value="income">Income</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <DatePicker
                          value={field.value}
                          onDateChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Utilities bills"
                          className="text-sm"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="10000"
                          {...field}
                          onChange={(e) => {
                            let val = e.target.value.replace(/^0+(?=\d)/, "");
                            e.target.value = val;
                            field.onChange(+val);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {!isPending && <Button type="submit">Submit</Button>}
              </form>
            </Form>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}
