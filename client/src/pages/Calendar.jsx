import { useQuery } from "@apollo/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GET_CLASSES } from "../utils/queries";

const localizer = momentLocalizer(moment);

const MyCalendar = () => {
  const { loading, error, data } = useQuery(GET_CLASSES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (data) console.log(data);
  const classes = data.classes || [];

  const events = classes.map((classItem) => {
    const startDate = new Date(
      `${classItem.schedule.day}T${classItem.schedule.time}`
    );
    console.log(classItem.schedule.day, classItem.schedule.time);

    const [durationHours, durationMinutes] = classItem.duration
      .split(" ")
      .map((d, i) => (i === 0 ? parseInt(d) : parseInt(d) || 0));

    const endDate = new Date(
      startDate.getTime() +
        durationHours * 60 * 60 * 1000 +
        durationMinutes * 60 * 1000
    );

    return {
      title: `${classItem.name} (${classItem.location})`,
      start: startDate,
      end: endDate,
      duration: classItem.duration,
    };
  });

  console.log (events);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
};

export default MyCalendar;

// const MyCalendar = () => {
//   const events = [
//     {
//       title: 'Ariel',
//       start: new Date(2024, 7, 10, 9, 0), // August is month 7 (0-indexed)
//       end: new Date(2024, 7, 10, 10, 0),
//     },
//     {
//       title: 'Shuffle',
//       start: new Date(2024, 7, 11, 11, 0),
//       end: new Date(2024, 7, 11, 12, 0),
//     },
//     {
//       title: 'Hoop',
//       start: new Date(2024, 7, 12, 14, 0),
//       end: new Date(2024, 7, 12, 15, 0),
//     },
// ];
//   return (
//     <div style={{ height: '500px' }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: 500 }}
//       />
//     </div>
//   );
// };

// export default MyCalendar;

// import { GET_CLASSES } from '../utils/queries';

// const localizer = momentLocalizer(moment);

// const getStartAndEndTimes = (dateStr, timeStr, duration) => {
//   const startDate = new Date(`${dateStr}T${timeStr}`);
//   const endDate = new Date(startDate);

//   const [durationValue, durationUnit] = duration.split(' ');
//   const value = parseInt(durationValue, 10);

//   if (durationUnit.includes('hour')) {
//     endDate.setHours(endDate.getHours() + value);
//   } else if (durationUnit.includes('minute')) {
//     endDate.setMinutes(endDate.getMinutes() + value);
//   }

//   return { start: startDate, end: endDate };
// };

// const CalendarPage = () => {
//   const { data, loading, error } = useQuery(GET_CLASSES);
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     if (data && data.classes) {
//       const formattedEvents = data.classes.map((cls) => {
//         const { start, end } = getStartAndEndTimes(cls.schedule.day, cls.schedule.time, cls.duration);

//         return {
//           title: cls.name,
//           start: start,
//           end: end,
//         };
//       });

//       setEvents(formattedEvents);
//     }
//   }, [data]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading classes: {error.message}</p>;

//   return (
//     <div style={{ height: '100vh' }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//       />
//     </div>
//   );
// };

// export default CalendarPage;
