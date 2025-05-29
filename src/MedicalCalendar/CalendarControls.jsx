import React from 'react'
import moment from 'moment'

const CalendarControls = ({
  currentDate,
  navigateMonth,
  navigateYear,
  goToToday,
  onToggleSidebar,
  showSidebar,
}) => (
  <div className='flex justify-between items-center mb-4'>
    <div className='flex items-center space-x-2'>
      <button
        onClick={() => navigateYear(-1)}
        className='px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        title='Año anterior'
      >
        ◄◄
      </button>
      <button
        onClick={() => navigateMonth(-1)}
        className='px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        title='Mes anterior'
      >
        ◄
      </button>
    </div>

    <div className='flex flex-col items-center'>
      <h2 className='text-xl font-bold'>
        {moment(currentDate).format('MMMM YYYY').toUpperCase()}
      </h2>
      <button
        onClick={goToToday}
        className='px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 mt-1'
      >
        Hoy
      </button>
    </div>

    <div className='flex space-x-2'>
      <button
        onClick={() => navigateMonth(1)}
        className='px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        title='Mes siguiente'
      >
        ►
      </button>
      <button
        onClick={() => navigateYear(1)}
        className='px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        title='Año siguiente'
      >
        ►►
      </button>
    </div>
  </div>
)

export default CalendarControls
