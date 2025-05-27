import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/es'

moment.locale('es')
const localizer = momentLocalizer(moment)

const MedicalCalendar = () => {
  // Estados
  const [recipes, setRecipes] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [currentRecipe, setCurrentRecipe] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [currentDate, setCurrentDate] = useState(new Date())

  // Datos de ejemplo
  const initialRecipes = {}
  /*   const initialRecipes = {
    '2025-04-20': {
      date: new Date(2025, 4, 20),
      content: 'Paracetamol 500mg cada 8 horas\nIbuprofeno 400mg cada 12 horas',
    },
    '2025-04-22': {
      date: new Date(2025, 4, 22),
      content: 'Amoxicilina 500mg cada 12 horas\nReposo por 3 días',
    },
    '2025-04-16': {
      date: new Date(2025, 4, 16),
      content: 'Omeprazol 20mg antes del desayuno',
    },
    '2025-04-10': {
      date: new Date(2025, 4, 10),
      content: 'Loratadina 10mg cada 24 horas\nVitamina C 1g diario',
    },
  } */

  useEffect(() => {
    setRecipes(initialRecipes)
  }, [])

  useEffect(() => {
    console.log('Recetas actualizadas:', recipes)
  }, [recipes])

  const handleSelectSlot = (slotInfo) => {
    const dateStr = moment(slotInfo.start).format('YYYY-MM-DD')
    setSelectedDate(slotInfo.start)
    setShowModal(true)
    setCurrentRecipe(recipes[dateStr]?.content || '')
    setIsEditing(!recipes[dateStr]) // Modo edición si es nueva fecha
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    const dateStr = moment(selectedDate).format('YYYY-MM-DD')

    if (currentRecipe.trim()) {
      setRecipes((prev) => ({
        ...prev,
        [dateStr]: {
          date: selectedDate,
          content: currentRecipe,
        },
      }))
    } else {
      // Si el contenido está vacío, eliminamos la receta
      const { [dateStr]: _, ...rest } = recipes
      setRecipes(rest)
    }

    setShowModal(false)
    setIsEditing(false)
  }

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => moment(prev).add(direction, 'month').toDate())
  }

  // Convertir recipes a eventos
  const events = Object.values(recipes).map((recipe) => ({
    start: recipe.date,
    end: recipe.date,
    title:
      recipe.content.split('\n')[0].substring(0, 20) +
      (recipe.content.length > 20 ? '...' : ''),
    allDay: true,
  }))

  const dateStr = selectedDate ? moment(selectedDate).format('YYYY-MM-DD') : ''
  const existingRecipe = selectedDate ? recipes[dateStr] : null

  return (
    <div className='p-6 min-w-3xl max-w-6xl max-h-[30rem]'>
      {/* Controles de navegación */}
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={() => navigateMonth(-1)}
          className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        >
          ◄ Mes anterior
        </button>
        <h2 className='text-xl font-bold'>
          {moment(currentDate).format('MMMM YYYY').toUpperCase()}
        </h2>
        <button
          onClick={() => navigateMonth(1)}
          className='px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300'
        >
          Mes siguiente ►
        </button>
      </div>

      {/* Calendario */}
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
            onSelectEvent={handleSelectSlot} // Mismo handler para eventos existentes
            culture='es'
            messages={{
              today: 'HOY',
              previous: '',
              next: '',
              month: '',
              week: '',
              day: '',
            }}
          />
        </div>
      </div>

      {/* Modal unificado */}
      {showModal && (
        <div className='fixed inset-0 bg-slate-600/60 flex items-center justify-center z-50'>
          <div className='bg-white rounded-lg p-6 w-full max-w-md'>
            <h2 className='text-xl font-bold mb-4 text-gray-800'>
              {moment(selectedDate).format('dddd D [de] MMMM [de] YYYY')}
            </h2>

            {isEditing ? (
              <>
                <textarea
                  value={currentRecipe}
                  onChange={(e) => setCurrentRecipe(e.target.value)}
                  className='w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4'
                  placeholder='Ingrese los detalles de la receta...'
                  autoFocus
                />
                <div className='flex justify-end space-x-3'>
                  <button
                    onClick={() => setIsEditing(false)}
                    className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSave}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                  >
                    Guardar
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className='bg-gray-50 p-4 rounded-md mb-4 whitespace-pre-wrap'>
                  {existingRecipe?.content || 'No hay receta para esta fecha'}
                </div>
                <div className='flex justify-end space-x-3'>
                  <button
                    onClick={() => setShowModal(false)}
                    className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'
                  >
                    Cerrar
                  </button>
                  <button
                    onClick={handleEdit}
                    className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'
                  >
                    Editar
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default MedicalCalendar
