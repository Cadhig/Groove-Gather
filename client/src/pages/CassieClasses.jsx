import { useQuery } from "@apollo/client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { GET_CASSIECLASSES } from "../utils/queries";
const localizer = momentLocalizer(moment);


const CassieCalendar = () => {
  const { loading, error, data } = useQuery(GET_CASSIECLASSES);

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
      title: `${classItem.name},
      ${classItem.duration},
     ${classItem.location}`,
      start: startDate,
      end: endDate,
      duration: classItem.duration,
    };
  });
  // Define eventStyleGetter function
  const eventStyleGetter = () => {
    const backgroundColor = '#800000'; // Red color for events
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: 'none',
    };
    return {
      style,
    };
  };
  console.log (events);

  return (
    <div>
      <h1 style={{ color: "maroon", textAlign: "center", fontSize: "36px", fontWeight: "bold" }}>
    Cassie Grooves
  </h1>
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
    </div>
  );
};
export default CassieCalendar;