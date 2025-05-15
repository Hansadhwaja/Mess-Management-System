import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MealType } from '@/types/types';

interface SelectedCoupon {
  day: string;
  meal: MealType[];
}

interface CouponState {
  selectedCoupons: SelectedCoupon[];
  toggleMeal: (day: string, meal: MealType) => void;
  toggleMealsForDay: (day: string, meals: MealType[]) => void;
  clearSelectedCoupons: () => void;
}

export const useCouponStore = create<CouponState>()(
  persist(
    (set, get) => ({
      selectedCoupons: [],

      toggleMeal: (day, meal) => {
        const existing = get().selectedCoupons;
        const entry = existing.find((e) => e.day === day);

        if (entry) {
          const isAlreadySelected = entry.meal.includes(meal);
          const newMeals = isAlreadySelected
            ? entry.meal.filter((m) => m !== meal)
            : [...entry.meal, meal];

          const updated = newMeals.length
            ? existing.map((e) =>
              e.day === day ? { ...e, meal: newMeals } : e
            )
            : existing.filter((e) => e.day !== day);

          set({ selectedCoupons: updated });
        } else {
          set({ selectedCoupons: [...existing, { day, meal: [meal] }] });
        }
      },

      toggleMealsForDay: (day, meals) => {
        const existing = get().selectedCoupons;
        const hasMeals = meals.length > 0;
        const updated = hasMeals
          ? [...existing.filter((e) => e.day !== day), { day, meal: meals }]
          : existing.filter((e) => e.day !== day);

        set({ selectedCoupons: updated });
      },
      clearSelectedCoupons: () => {
        set({ selectedCoupons: [] });
      },
    }),
    {
      name: 'coupon-storage',
    }
  )
);
