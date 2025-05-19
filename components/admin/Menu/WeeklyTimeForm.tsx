"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addTiming } from "@/lib/actions/timeActions";
import { toast } from "sonner";
import { meals } from "@/constants";
import { redirect } from "next/navigation";

const mealSchema = z.object({
  time: z.string().min(1, "Time is required"),
  cost: z.string().min(1, "Cost is required"),
});

type MealFormData = z.infer<typeof mealSchema>;

const MealTimingForm = () => {
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const currentMeal = meals[currentMealIndex];

  const [savedData, setSavedData] = useState<Record<string, MealFormData>>({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: savedData[currentMeal] || { time: "", cost: "" },
  });

  const onSubmit = async (data: MealFormData) => {
    try {
      const values = { meal: currentMeal, ...data, cost: Number(data.cost) };
      await addTiming(values);
      toast.success(`${currentMeal} saved successfully!`);

      setSavedData((prev) => ({ ...prev, [currentMeal]: data }));

      if (currentMealIndex < meals.length - 1) {
        setCurrentMealIndex(currentMealIndex + 1);
        const nextMeal = meals[currentMealIndex + 1];
        reset(savedData[nextMeal] || { time: "", cost: "" });
      } else {
        toast.success("All meals saved!");
        redirect("/admin/menu");
      }
    } catch (error) {
      console.error("Failed to save meal timing", error);
      toast.error("Failed to save meal timing");
    }
  };

  const goBack = () => {
    if (currentMealIndex > 0) {
      const prevMeal = meals[currentMealIndex - 1];
      setCurrentMealIndex(currentMealIndex - 1);
      reset(savedData[prevMeal] || { time: "", cost: "" });
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-100 capitalize">
        Enter {currentMeal} details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="time" className="text-gray-100">
            Time
          </Label>
          <Input
            id="time"
            placeholder="Eg:7:30AM-10:00AM"
            {...register("time")}
            className={errors.time ? "border-red-500" : "text-white"}
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="cost" className="text-gray-100">
            Cost
          </Label>
          <Input
            id="cost"
            type="number"
            min="0"
            step="0.01"
            placeholder="₹40"
            {...register("cost")}
            className={errors.cost ? "border-red-500" : "text-white"}
          />
          {errors.cost && (
            <p className="text-red-500 text-sm mt-1">{errors.cost.message}</p>
          )}
        </div>

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={goBack}
            disabled={currentMealIndex === 0}
            variant="outline"
            className="px-6 py-2 disabled:opacity-50"
          >
            Back
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {currentMealIndex === meals.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MealTimingForm;
