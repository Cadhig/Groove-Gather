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
