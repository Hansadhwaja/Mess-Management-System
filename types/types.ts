export interface Meal {
    type: string;
    time: string;
    cost: number;
    items: string;
}

export interface CouponProps {
    menuItems: {
        _id: string;
        day: string;
        breakfast: Meal | null;
        lunch: Meal | null;
        dinner: Meal | null;
    }[];
}

export type MealType = "breakfast" | "lunch" | "dinner";