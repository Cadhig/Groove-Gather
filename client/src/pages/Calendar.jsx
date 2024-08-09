// import { useState, useEffect } from 'react';
// import { Calendar, momentLocalizer } from 'react-big-calendar';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import moment from 'moment';
// import { useQuery } from '@apollo/client';
// import { GET_CLASSES } from '../utils/queries';


// moment.locale("en-US");
// const localizer = momentLocalizer(moment);

// const CalendarPage = () => {
//   const { data, loading, error } = useQuery(GET_CLASSES);
//   const [eventList, setEventList] = useState([]);

//   useEffect(() => {
//     if (data && data.classes) {
//       // Format the events from the query result
//       const formattedEvents = data.classes.map(event => ({
//         title: event.title,
//         start: new Date(event.start),
//         end: new Date(event.end),
//       }));
//       setEventList(formattedEvents);
//     }
//   }, [data]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error loading classes: {error.mess age}</p>;

//   return (
//     <div style={{ height: '100vh' }}>
//       <Calendar
//         localizer={localizer}
//         events={eventList}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: '100%' }}
//       />
//     </div>
//   );
// };

// export default CalendarPage;

