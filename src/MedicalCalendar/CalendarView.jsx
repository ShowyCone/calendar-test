import React from 'react'
import { Calendar } from 'react-big-calendar'

const CalendarView = ({ localizer, events, currentDate, handleSelectSlot }) => (
  <div className='bg-white rounded-lg shadow-md overflow-hidden'>
    <div className='h-[400px] p-4'>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        date={currentDate}
        onNavigate={() => {}}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectSlot}
      />
    </div>
  </div>
)

export default CalendarView
