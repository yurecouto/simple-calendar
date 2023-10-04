import { v4 as uuidv4 } from 'uuid';


const generateRandomTime = () => {
  const hours = 8 + Math.floor(Math.random() * 9);
  const minutes = Math.floor(Math.random() * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const generateRandomDate = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const daysToAdd = Math.floor(Math.random() * (7 - currentDay));
  const targetDate = new Date(currentDate);
  targetDate.setDate(targetDate.getDate() + daysToAdd);
  return targetDate;
};

const generateRandomEvent = (id: string) => {
  const startDate = generateRandomDate();
  startDate.setHours(0, 0, 0, 0);

  const start = new Date(startDate);
  const time = generateRandomTime();
  const [hours, minutes] = time.split(':');
  start.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);

const end = new Date(start);
  end.setMinutes(end.getMinutes() + Math.floor(Math.random() * 120));

  return {
    id,
    name: `Event`,
    start: start.toISOString(),
    end: end.toISOString(),
  };
};

export const generateMockEvents = () => {
  const events = [];
  for (let i = 1; i <= 10; i++) {
    const id = uuidv4();
    events.push(generateRandomEvent(id));
  }
  return events;
};
