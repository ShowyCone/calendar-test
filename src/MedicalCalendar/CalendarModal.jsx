import React from 'react'
import moment from 'moment'

const CalendarModal = ({
  showModal,
  selectedDate,
  currentRecipe,
  isEditing,
  handleEdit,
  handleSave,
  handleCancel,
  setCurrentRecipe,
}) => {
  if (!showModal) return null

  return (
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
                onClick={handleCancel}
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
              {currentRecipe || 'No hay receta para esta fecha'}
            </div>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={handleCancel}
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
  )
}

export default CalendarModal
