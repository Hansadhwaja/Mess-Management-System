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
        form.setValue("breakfast", matchedItem.breakfast);
        form.setValue("lunch", matchedItem.lunch);
        form.setValue("dinner", matchedItem.dinner);
      } else {
        form.setValue("breakfast", "");
        form.setValue("lunch", "");
        form.setValue("dinner", "");
      }
    }
  }, [selectedDay, menuItems, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await updateMenu(values);
    if (response.status === 200) {
      clearForm();
      redirect("/admin/menu");
    } else {
      console.error(response.message);
    }
  }

  return (
    <div className="bg-black/60 backdrop-blur-xl text-white border border-white/20 p-6 md:p-10 rounded-2xl shadow-xl w-[95%] max-w-2xl mx-auto mt-10 md:mt-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 text-center">
        Edit Weekly Menu
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="day"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Day</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 text-white border-white/20">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black/10 backdrop-blur-2xl text-white">
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

          {["breakfast", "lunch", "dinner"].map((meal) => (
            <FormField
              key={meal}
              control={form.control}
              name={meal as "breakfast" | "lunch" | "dinner"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold capitalize">
                    {meal}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder={`Enter ${meal} items`}
                      {...field}
                      className="bg-white/10 text-white placeholder-white/60 border-white/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <div className="flex justify-end">
            <Button
              disabled={!form.formState.isValid}
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition disabled:opacity-50"
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
