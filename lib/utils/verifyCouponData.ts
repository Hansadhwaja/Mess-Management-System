
import { Time } from '@/types/types';
import { getFormattedWeek } from './getFormattedWeek';
import { getTimes } from '../actions/timeActions';

function parseTime12HourToMinutes(timeStr: string): number {
    const [time, modifier] = timeStr.trim().split(/(am|pm)/i);
    const [hoursStr, minutesStr] = time.split(':');

    let hours = Number(hoursStr);
    const minutes = Number(minutesStr);

    if (modifier.toLowerCase() === 'pm' && hours !== 12) {
        hours += 12;
    }
    if (modifier.toLowerCase() === 'am' && hours === 12) {
        hours = 0;
    }

    return hours * 60 + (minutes || 0);
}

export const verifyCouponData = async ({ week, day, meal }: { week: string, day: string, meal: string }) => {
    const now = new Date();

    const currentFormattedWeek = getFormattedWeek();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = days[now.getDay()];

    const timeSlots = await getTimes();

    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const activeMealSlot = timeSlots.find((slot: Time) => {
        const [startStr, endStr] = slot.time.split('to').map(str => str.trim());

        const startMinutes = parseTime12HourToMinutes(startStr);
        const endMinutes = parseTime12HourToMinutes(endStr);

        return currentMinutes >= startMinutes && currentMinutes < endMinutes;
    });

    const currentMeal = activeMealSlot?.meal.toLowerCase() || 'none';

    return (
        week.trim().toLowerCase() === currentFormattedWeek.trim().toLowerCase() &&
        day.trim().toLowerCase() === currentDay.toLowerCase() &&
        meal.trim().toLowerCase() === currentMeal
    );
};
