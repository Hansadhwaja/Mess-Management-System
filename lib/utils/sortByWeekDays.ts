import { dayOrder } from "@/constants";
import { Coupon } from "@/types/types";



export const sortByWeekDays = (array: Coupon[]) => {
    return [...array].sort(
        (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );
};