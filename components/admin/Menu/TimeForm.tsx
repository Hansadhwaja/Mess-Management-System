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
import { meals } from "@/constants";
import { Time } from "@/types/types";
import { useEffect } from "react";
import { redirect } from "next/navigation";
import { updateTiming } from "@/lib/actions/timeActions";

const formSchema = z.object({
  meal: z.string(),
  time: z.string(),
  cost: z.string(),
});

const TimeForm = ({ times }: { times: Time[] }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      meal: "",
      time: "",
      cost: "",
    },
  });

  const selectedMeal = form.watch("meal");

  const clearForm = () => {
    form.reset({
      meal: "",
      time: "",
      cost: "",
    });
  };

  useEffect(() => {
    if (selectedMeal) {
      const matchedItem = times.find((item) => item.meal === selectedMeal);
      if (matchedItem) {
        form.setValue("time", matchedItem.time);
        form.setValue("cost", String(matchedItem.cost));
      } else {
        form.setValue("time", "");
        form.setValue("cost", "");
      }
    }
  }, [selectedMeal, times, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const updatedValues={...values,cost:Number(values.cost)};
    const response = await updateTiming(updatedValues);
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
        Edit Weekly Menu Timing and Cost
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="meal"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">Meal</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-white/10 text-white border-white/20">
                      <SelectValue placeholder="Select a meal" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-black/10 backdrop-blur-2xl text-white">
                    {meals.map((meal) => (
                      <SelectItem
                        className="capitalize"
                        key={meal}
                        value={meal}
                      >
                        {meal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold capitalize">
                  Timing
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Enter timing`}
                    {...field}
                    className="bg-white/10 text-white placeholder-white/60 border-white/20"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cost"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold capitalize">
                  Cost
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={`Enter cost`}
                    {...field}
                    className="bg-white/10 text-white placeholder-white/60 border-white/20"
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

export default TimeForm;
