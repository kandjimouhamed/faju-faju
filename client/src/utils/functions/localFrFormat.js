import formatDate from 'intl-dateformat'

const localFrFormat = (date) => {
    const newDate = new Date(date)

    return formatDate(newDate, 'ddd DD MMMM', { locale: 'fr' })
}

export default localFrFormat