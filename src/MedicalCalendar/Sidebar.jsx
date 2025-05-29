import React from 'react'
import moment from 'moment'

const Sidebar = ({ recipes, onEventClick }) => {
  return (
    <div className='w-64 mr-4 overflow-y-auto sidebar border-r border-gray-200'>
      <h3 className='font-bold mb-4 text-lg p-2 bg-gray-50 rounded'>
        Récipes Médicos
      </h3>
      <ul className='space-y-2 p-2'>
        {Object.values(recipes)
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((recipe) => {
            // Usamos la fecha original del recipe sin conversiones
            const date = new Date(recipe.date)

            return (
              <li
                key={recipe.date.toString()}
                onClick={() =>
                  onEventClick({
                    start: date,
                    end: date,
                    title: recipe.content.split('\n')[0],
                    allDay: true,
                    content: recipe.content, // Pasamos el contenido completo
                  })
                }
                className='p-3 cursor-pointer hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100'
              >
                <div className='font-medium text-gray-800 flex justify-between items-center'>
                  <span>{moment(date).format('D MMMM YYYY')}</span>
                </div>
                <div className='text-sm text-gray-600 mt-1 line-clamp-2'>
                  {recipe.content.split('\n').slice(0, 2).join(' - ')}
                  {recipe.content.split('\n').length > 2 && '...'}
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default Sidebar
