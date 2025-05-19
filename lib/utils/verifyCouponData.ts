import { Time } from '@/types/types';
import { getFormattedWeek } from './getFormattedWeek';
import { getTimes } from '../actions/timeActions';

function parseTime12HourToMinutes(timeStr: string): number {
  if (!timeStr) return -1;

  const [time, modifier] = timeStr.trim().split(/(am|pm)/i);
  const [hoursStr, minutesStr] = time.split(':');

  let hours = Number(hoursStr);
  const minutes = Number(minutesStr);

  if (modifier?.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  }
  if (modifier?.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  return hours * 60 + (minutes || 0);
}

export const verifyCouponData = async ({
  week,
  day,
  meal,
}: {
  week: string;
  day: string;
  meal: string;
}) => {
  const now = new Date();

  const currentFormattedWeek = getFormattedWeek();

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const currentDay = days[now.getDay()];

  const timeSlots = await getTimes();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const activeMealSlot = timeSlots.find((slot: Time) => {
    if (!slot.time || !slot.time.includes('-')) return false;

    const [startStrRaw, endStrRaw] = slot.time.split('-');
    const startStr = startStrRaw?.trim();
    const endStr = endStrRaw?.trim();


    if (!startStr || !endStr) return false;

    const startMinutes = parseTime12HourToMinutes(startStr);
    const endMinutes = parseTime12HourToMinutes(endStr);
  
if (startMinutes < endMinutes) {
  return currentMinutes >= startMinutes && currentMinutes < endMinutes;
} else {
  return currentMinutes >= startMinutes || currentMinutes < endMinutes;
}

  });


  const currentMeal = activeMealSlot?.meal?.toLowerCase() || 'none';

  return (
    week?.trim().toLowerCase() === currentFormattedWeek.trim().toLowerCase() &&
    day?.trim().toLowerCase() === currentDay.toLowerCase() &&
    meal?.trim().toLowerCase() === currentMeal
  );
};
