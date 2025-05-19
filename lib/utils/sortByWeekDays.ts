import { dayOrder } from "@/constants";
import { GroupedCoupon } from "@/types/types";



export const sortByWeekDays = (array: GroupedCoupon[]) => {
    return [...array].sort(
        (a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day)
    );
};