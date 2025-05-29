import moment from 'moment'

export const normalizeDate = (date) => {
  return moment(date).format('YYYY-MM-DD')
}

export const convertRecipesToEvents = (recipes) => {
  return Object.values(recipes).map((recipe) => ({
    start: recipe.date,
    end: recipe.date,
    title:
      recipe.content.split('\n')[0].substring(0, 20) +
      (recipe.content.length > 20 ? '...' : ''),
    allDay: true,
  }))
}

export const calendarMessages = {
  today: 'Hoy',
  previous: 'Anterior',
  next: 'Siguiente',
  month: 'Mes',
  week: 'Semana',
  day: 'Día',
  agenda: 'Agenda',
  date: 'Fecha',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'No hay eventos en este rango.',
  showMore: (total) => `+ Ver más (${total})`,
}

export const calendarFormats = {
  dayFormat: 'dddd D',
  monthHeaderFormat: 'MMMM YYYY',
  dayHeaderFormat: 'dddd D MMMM',
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, 'D MMMM', culture) +
    ' - ' +
    localizer.format(end, 'D MMMM', culture),
}
