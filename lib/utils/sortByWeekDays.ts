import { Coupon } from "@/types/types";

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const sortByWeekDays = (array: Coupon[]) => {
    return [...array].sort(
        (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );
};