const formatDate = require('intl-dateformat')
const formatLocalDate = (date) => {
    const newDate = new Date(date)

    return new Intl.DateTimeFormat('fr-GB', { dateStyle: 'medium'}).format(newDate)
}

module.exports = formatLocalDate