import {
  Flex,
  Heading,
  Text,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { Navigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { fancyMonth, fancyDay } from '../utils/dates';

import NavHeader from '../components/NavHeader';

import Auth from '../utils/auth';
import { QUERY_ME } from '../utils/queries';

function Plan() {
  const { data, loading, error } = useQuery(QUERY_ME);

  if (!Auth.loggedIn()) {
    return <Navigate to="/signup" />;
  }

  const { name, recipes } = data?.me || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error {error.message}</div>;
  }

  const dates = [...Array(35).keys()].map((item, idx) => {
    const d = new Date();
    const full = new Date(d.getFullYear(), d.getMonth(), d.getDate() + idx - 7);
    const fancy = fancyDay(full);
    const numbers = `${
      full.getDate().toString().length > 1 ? '' : 0
    }${full.getDate()}/${(full.getMonth() + 1).toString().length > 1 ? '' : 0}${
      full.getMonth() + 1
    }/${full.getFullYear().toString().slice(2)}`;
    const uuu = full.getTime();
    return { uuu, fancy, numbers };
  });

  return (
    <Flex h="100%" w="100%" direction="column">
      <NavHeader me={data?.me} />
      <Flex grow={1} w="100%" direction="column" p="6" gap="3">
        <Heading>plan</Heading>
        <Flex rounded="sm" boxShadow="md" w="100%" h="100%">
          <TableContainer w="100%">
            <Table variant="simple" size="lg">
              <Thead>
                <Tr>
                  <Th w="160px">day</Th>
                  <Th>mealz</Th>
                </Tr>
              </Thead>
              {dates.map(date => (
                <Tbody key={date.uuu}>
                  <Tr>
                    <Td>
                      {date.fancy}
                      <br />
                      {date.numbers}
                    </Td>
                    <Td></Td>
                  </Tr>
                </Tbody>
              ))}
              {/* <Tfoot>
                <Tr>
                  <Th>To convert</Th>
                  <Th>into</Th>
                  <Th isNumeric>multiply by</Th>
                </Tr>
              </Tfoot> */}
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default Plan;

// import React, { useState } from 'react';
// import FullCalendar, { formatDate } from '@fullcalendar/react';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import timeGridPlugin from '@fullcalendar/timegrid';
// import interactionPlugin from '@fullcalendar/interaction';
// // import { INITIAL_EVENTS, createEventId } from './event-utils';

// function Plan() {
//   const [state, setState] = useState({
//     weekendsVisible: true,
//     currentEvents: [],
//   });

//   return (
//     <div className="demo-app">
//       {renderSidebar()}
//       <div className="demo-app-main">
//         <FullCalendar
//           plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//           headerToolbar={{
//             left: 'prev,next today',
//             center: 'title',
//             right: 'dayGridMonth,timeGridWeek,timeGridDay',
//           }}
//           initialView="dayGridMonth"
//           editable={true}
//           selectable={true}
//           selectMirror={true}
//           dayMaxEvents={true}
//           weekends={state.weekendsVisible}
//           initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
//           select={e => handleDateSelect(e)}
//           eventContent={e => renderEventContent(e)} // custom render function
//           eventClick={e => handleEventClick(e)}
//           eventsSet={e => handleEvents(e)} // called after events are initialized/added/changed/removed
//           /* you can update a remote database when these fire:
//             eventAdd={function(){}}
//             eventChange={function(){}}
//             eventRemove={function(){}}
//             */
//         />
//       </div>
//     </div>
//   );

//   function renderSidebar() {
//     return (
//       <div className="demo-app-sidebar">
//         <div className="demo-app-sidebar-section">
//           <h2>Instructions</h2>
//           <ul>
//             <li>Select dates and you will be prompted to create a new event</li>
//             <li>Drag, drop, and resize events</li>
//             <li>Click an event to delete it</li>
//           </ul>
//         </div>
//         <div className="demo-app-sidebar-section">
//           <label>
//             <input
//               type="checkbox"
//               checked={state.weekendsVisible}
//               onChange={() => handleWeekendsToggle()}
//             ></input>
//             toggle weekends
//           </label>
//         </div>
//         <div className="demo-app-sidebar-section">
//           <h2>All Events ({state.currentEvents.length})</h2>
//           <ul>{state.currentEvents.map(e => renderSidebarEvent(e))}</ul>
//         </div>
//       </div>
//     );
//   }

//   function handleWeekendsToggle() {
//     setState({
//       weekendsVisible: !state.weekendsVisible,
//     });
//   }

//   function handleDateSelect(selectInfo) {
//     let title = prompt('Please enter a new title for your event');
//     let calendarApi = selectInfo.view.calendar;

//     calendarApi.unselect(); // clear date selection

//     if (title) {
//       calendarApi.addEvent({
//         id: createEventId(),
//         title,
//         start: selectInfo.startStr,
//         end: selectInfo.endStr,
//         allDay: selectInfo.allDay,
//       });
//     }
//   }

//   function handleEventClick(clickInfo) {
//     if (
//       window.confirm(
//         `Are you sure you want to delete the event '${clickInfo.event.title}'`
//       )
//     ) {
//       clickInfo.event.remove();
//     }
//   }

//   function handleEvents(events) {
//     setState({
//       currentEvents: events,
//     });
//   }
// }

// export default Plan;

// function renderEventContent(eventInfo) {
//   return (
//     <>
//       <b>{eventInfo.timeText}</b>
//       <i>{eventInfo.event.title}</i>
//     </>
//   );
// }

// function renderSidebarEvent(event) {
//   return (
//     <li key={event.id}>
//       <b>
//         {formatDate(event.start, {
//           year: 'numeric',
//           month: 'short',
//           day: 'numeric',
//         })}
//       </b>
//       <i>{event.title}</i>
//     </li>
//   );
// }

// let eventGuid = 0;
// let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

// const INITIAL_EVENTS = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: todayStr,
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: todayStr + 'T12:00:00',
//   },
// ];

// function createEventId() {
//   return String(eventGuid++);
// }
