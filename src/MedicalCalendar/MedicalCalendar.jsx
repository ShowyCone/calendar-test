import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Calendar } from 'react-big-calendar'
import { momentLocalizer } from 'react-big-calendar'
import CalendarControls from './CalendarControls'
import CalendarModal from './CalendarModal'
import {
  normalizeDate,
  convertRecipesToEvents,
  calendarMessages,
  calendarFormats,
} from './utils'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Sidebar from './Sidebar'
import './style.css'

moment.locale('es', {
  months:
    'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split(
      '_'
    ),
  monthsShort: 'Ene_Feb_Mar_Abr_May_Jun_Jul_Ago_Sep_Oct_Nov_Dic'.split('_'),
  weekdays: 'Domingo_Lunes_Martes_Miércoles_Jueves_Viernes_Sábado'.split('_'),
  weekdaysShort: 'Dom_Lun_Mar_Mié_Jue_Vie_Sáb'.split('_'),
  weekdaysMin: 'Do_Lu_Ma_Mi_Ju_Vi_Sá'.split('_'),
})

const localizer = momentLocalizer(moment)

const MedicalCalendar = () => {
  const [recipes, setRecipes] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentRecipe, setCurrentRecipe] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())
  const [highlightedEvent, setHighlightedEvent] = useState(null)
  const [showSidebar, setShowSidebar] = useState(true)

  const highlightEvent = (event) => {
    const dateStr = normalizeDate(event.start)
    setHighlightedEvent(event)
    setCurrentDate(event.start)

    setSelectedDate(event.start)
    setCurrentRecipe(recipes[dateStr]?.content || '')
    setShowModal(true)
    setIsEditing(false)

    setTimeout(() => setHighlightedEvent(null), 2000)
  }

  // Datos de ejemplo
  const initialRecipes = {
    '2025-05-20': {
      date: new Date(2025, 4, 20),
      content: 'Paracetamol 500mg cada 8 horas\nIbuprofeno 400mg cada 12 horas',
    },
    '2025-05-22': {
      date: new Date(2025, 4, 22),
      content: 'Amoxicilina 500mg cada 12 horas\nReposo por 3 días',
    },
    '2025-05-16': {
      date: new Date(2025, 4, 16),
      content: 'Omeprazol 20mg antes del desayuno',
    },
    '2025-05-10': {
      date: new Date(2025, 4, 10),
      content: 'Loratadina 10mg cada 24 horas\nVitamina C 1g diario',
    },
  }

  useEffect(() => {
    const normalizedRecipes = {}
    Object.entries(initialRecipes).forEach(([key, value]) => {
      normalizedRecipes[normalizeDate(value.date)] = value
    })
    setRecipes(normalizedRecipes)
  }, [])

  const handleSelectSlot = (slotInfo) => {
    const dateStr = normalizeDate(slotInfo.start)
    setSelectedDate(slotInfo.start)
    setCurrentRecipe(recipes[dateStr]?.content || '')

    if (recipes[dateStr]) {
      setShowModal(true)
      setIsEditing(false)
    } else {
      setShowModal(true)
      setIsEditing(true)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    const dateStr = normalizeDate(selectedDate)

    if (currentRecipe.trim()) {
      setRecipes((prev) => ({
        ...prev,
        [dateStr]: {
          date: selectedDate,
          content: currentRecipe,
        },
      }))
    } else {
      const { [dateStr]: _, ...rest } = recipes
      setRecipes(rest)
    }

    setShowModal(false)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setShowModal(false)
    setIsEditing(false)
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => moment(prev).add(direction, 'month').toDate())
  }

  const navigateYear = (direction) => {
    setCurrentDate((prev) => moment(prev).add(direction, 'year').toDate())
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const events = convertRecipesToEvents(recipes)

  return (
    <div className='flex p-6 min-w-3xl max-w-6xl max-h-[30rem]'>
      <Sidebar recipes={recipes} onEventClick={highlightEvent} />

      <div className='flex-1'>
        <CalendarControls
          currentDate={currentDate}
          navigateMonth={navigateMonth}
          navigateYear={navigateYear}
          goToToday={goToToday}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <div className='bg-white rounded-lg shadow-md overflow-hidden'>
          <div className='h-[400px] p-4'>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor='start'
              endAccessor='end'
              date={currentDate}
              onNavigate={() => {}}
              toolbar={false}
              selectable
              onSelectSlot={handleSelectSlot}
              onSelectEvent={handleSelectSlot}
              culture='es'
              messages={calendarMessages}
              formats={calendarFormats}
              eventPropGetter={(event) => ({
                style: {
                  border:
                    highlightedEvent === event
                      ? '2px solid #3b82f6'
                      : '1px solid #ddd',
                  boxShadow:
                    highlightedEvent === event
                      ? '0 0 0 2px rgba(59, 130, 246, 0.5)'
                      : 'none',
                  transition: 'all 0.3s ease',
                },
              })}
            />
          </div>
        </div>

        <CalendarModal
          showModal={showModal}
          selectedDate={selectedDate}
          currentRecipe={currentRecipe}
          isEditing={isEditing}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          setCurrentRecipe={setCurrentRecipe}
        />
      </div>
    </div>
  )
}

export default MedicalCalendar
