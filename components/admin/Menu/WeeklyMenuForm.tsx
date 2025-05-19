"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addMenu } from "@/lib/actions/menuActions";
import { toast } from "sonner";
import { dayOrder } from "@/constants";
import { useRouter } from "next/navigation";

const menuSchema = z.object({
  breakfast: z.string().min(1, "Breakfast is required"),
  lunch: z.string().min(1, "Lunch is required"),
  dinner: z.string().min(1, "Dinner is required"),
});

type MenuFormData = z.infer<typeof menuSchema>;

const WeeklyMenuForm = () => {
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const currentDay = dayOrder[currentDayIndex];
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MenuFormData>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      breakfast: "",
      lunch: "",
      dinner: "",
    },
  });

  const [savedMenus, setSavedMenus] = useState<Record<string, MenuFormData>>(
    {}
  );

  const onSubmit = async (data: MenuFormData) => {
    const menuToSave = { day: currentDay, ...data };

    try {
      await addMenu(menuToSave);
      toast.success(`${currentDay} menu saved successfully!`);
      setSavedMenus((prev) => ({ ...prev, [currentDay]: data }));

      if (currentDayIndex < dayOrder.length - 1) {
        const nextDay = dayOrder[currentDayIndex + 1];
        const nextData = savedMenus[nextDay];
        reset(nextData || { breakfast: "", lunch: "", dinner: "" });
        setCurrentDayIndex((prev) => prev + 1);
      } else if (currentDayIndex === dayOrder.length - 1) {
        router.push("/admin/menu");
      }
    } catch (error) {
      console.log("Error saving menu", error);
      toast.error("Failed to save menu");
    }
  };

  const goBack = () => {
    if (currentDayIndex > 0) {
      const prevDay = dayOrder[currentDayIndex - 1];
      const prevData = savedMenus[prevDay];
      reset(prevData || { breakfast: "", lunch: "", dinner: "" });
      setCurrentDayIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 rounded-2xl shadow-lg border border-gray-200">
      <div className="mb-8 text-center">
        <h2 className="text-xl sm:text-3xl font-semibold text-gray-100">
          Weekly Meal Planner
        </h2>
        <p className="mt-2 text-gray-200 text-sm sm:text-base">
          Plan your meals for {currentDay.toLowerCase()}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {["breakfast", "lunch", "dinner"].map((meal) => (
          <div key={meal} className="flex flex-col">
            <Label
              htmlFor={meal}
              className="mb-1 text-gray-100 font-medium capitalize"
            >
              {meal}
            </Label>
            <Input
              id={meal}
              {...register(meal as keyof MenuFormData)}
              placeholder={
                meal === "breakfast"
                  ? "e.g. Poha"
                  : meal === "lunch"
                  ? "e.g. Rice and Dal"
                  : "e.g. Roti and Sabzi"
              }
              className={`border-gray-300 focus:border-indigo-500 focus:ring-indigo-400 text-white $ {
                errors[meal as keyof MenuFormData]
                  ? "border-red-500 focus:ring-red-400"
                  : ""
              }`}
              aria-invalid={
                errors[meal as keyof MenuFormData] ? "true" : "false"
              }
              aria-describedby={`${meal}-error`}
            />
            {errors[meal as keyof MenuFormData] && (
              <p
                id={`${meal}-error`}
                role="alert"
                className="mt-1 text-sm text-red-600 font-medium"
              >
                {errors[meal as keyof MenuFormData]?.message}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-between mt-8">
          <Button
            type="button"
            onClick={goBack}
            disabled={currentDayIndex === 0}
            variant="outline"
            className="px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-md bg-transparent border hover:bg-black/50"
          >
            {currentDayIndex === dayOrder.length - 1 ? "Finish" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WeeklyMenuForm;
