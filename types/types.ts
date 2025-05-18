export interface Meal {
    type: string;
    time: string;
    cost: number;
    items: string;
}

export interface MenuItem {
    _id: string;
    day: string;
    breakfast: Meal | null;
    lunch: Meal | null;
    dinner: Meal | null;
}

export interface EditedMenuItem {
    _id: string;
    day: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    serialNumber: number;
}


export interface CouponProps {
    menuItems: MenuItem[];
}

export type MealType = "breakfast" | "lunch" | "dinner";

export interface Coupon {
    _id: string;
    day: string;
    meal: Array<'breakfast' | 'lunch' | 'dinner'>;
}

export interface Order {
    _id: string;
    userId: string;
    week: string;
    amount: number;
    coupons: Coupon[];
    createdAt: string;
    updatedAt: string;
}

export interface CouponMeal {
  id: string;
  meal: MealType;
  used: boolean;
  usedAt?: string;
}

export interface GroupedCoupon{
    day:string;
    meals:string[];
}