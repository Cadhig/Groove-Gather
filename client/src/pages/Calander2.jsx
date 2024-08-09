import FullCalendar from '@fullcalendar/react'; 
import dayGridPlugin from '@fullcalendar/daygrid'; 
import timeGridPlugin from '@fullcalendar/timegrid'; 
import interactionPlugin from '@fullcalendar/interaction'; 
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css'; 
import '@fullcalendar/timegrid/main.css'; 

export default function Calendar() {
  return (
    <div style={{ height: '100vh' }}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          start: "today prev,next",
          center: "",
          end: "dayGridMonth timeGridWeek timeGridDay"
        }}
        height="100vh"
      />
    </div>
  );
}
