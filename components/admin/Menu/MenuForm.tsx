"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dayOrder } from "@/constants";
import { EditedMenuItem } from "@/types/types";
import { useEffect } from "react";
import { updateMenu } from "@/lib/actions/menuActions";
import { redirect } from "next/navigation";

const formSchema = z.object({
  day: z.string(),
  breakfast: z.string(),
  lunch: z.string(),
  dinner: z.string(),
});

const MenuForm = ({ menuItems }: { menuItems: EditedMenuItem[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      day: "",
      breakfast: "",
      lunch: "",
      dinner: "",
    },
  });

  const selectedDay = form.watch("day");

  const clearForm = () => {
    form.reset({
      day: "",
      breakfast: "",
      lunch: "",
      dinner: "",
    });
  };

  useEffect(() => {
    if (selectedDay) {
      const matchedItem = menuItems.find((item) => item.day === selectedDay);
      if (matchedItem) {
        form.setValue("breakfast", matchedItem?.breakfast);
        form.setValue("lunch", matchedItem?.lunch);
        form.setValue("dinner", matchedItem?.dinner);
      } else {
        form.setValue("breakfast", "");
        form.setValue("lunch", "");
        form.setValue("dinner", "");
      }
    }
  }, [selectedDay, menuItems, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedMenu = { ...values };
    const response = await updateMenu(updatedMenu);
    if (response.status === 200) {
      clearForm();
      redirect("/admin/menu");
    } else {
      console.error(response.message);
    }
  }

  return (
    <div className="bg-white border border-gray-300 p-8 rounded-2xl shadow-lg max-w-2xl mx-auto mt-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
        Edit Menu
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Day */}
          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Day
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {dayOrder.map((day) => (
                      <SelectItem className="capitalize" key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Breakfast */}
          <FormField
            control={form.control}
            name="breakfast"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Breakfast
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Poha, Matar Curry, Jalebi (1 pc)"
                    {...field}
                    className="placeholder-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Lunch */}
          <FormField
            control={form.control}
            name="lunch"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Lunch
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Rice, Roti, Arhar Dal, Chana Masala"
                    {...field}
                    className="placeholder-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Dinner */}
          <FormField
            control={form.control}
            name="dinner"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Dinner
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Roti, Bhindi Aloo, Suji Kheer"
                    {...field}
                    className="placeholder-gray-400"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MenuForm;
