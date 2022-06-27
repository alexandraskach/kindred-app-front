export default d => {
    let monthTexts = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'],
        date = new Date(d),
        dayText = date.getDate().toString().length == 1 ? '0' + date.getDate() : date.getDate(),
        monthText = monthTexts[date.getMonth()]
    
    return dayText + ' ' + monthText + ' ' +  date.getFullYear()
}