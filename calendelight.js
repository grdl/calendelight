//TODO: wait for table to actually load (not arbitrarty timeout)
//TODO: pretty css or icon for the button
//TODO: remove extension icon from chrome menu


setTimeout(function () {

    var rows = findRowsWithScheduledClasses()
    for (var i = 0; i < rows.length; i++) {
        addButtonToRow(rows[i])
    }

}, 1000);

function findRowsWithScheduledClasses() {
    var booked_table = document.getElementById("booked")
    var rows = booked_table.getElementsByClassName("user-schedule")[0].getElementsByClassName("table-row")

    return rows
}

function addButtonToRow(row) {
    var cells = row.getElementsByClassName("cell")
    var date_cell = cells[0].getElementsByClassName("full-date")[0]
    var class_type = cells[1].innerText.trim()
    var teacher = cells[2].innerText.trim()
    var location = cells[3].innerText.trim()

    var [_, class_date, class_hours] = date_cell.innerHTML.split(",")
    var [start_hour, end_hour] = class_hours.split("–")

    var formatted_start_hour = "T" + start_hour.trim().replace(":", "") + "00"
    var formatted_end_hour = "T" + end_hour.trim().replace(":", "") + "00"
    var formatted_date = moment(class_date.trim(), "D MMM YYYY").format("YYYYMMDD")

    var dates_param = "" + formatted_date + formatted_start_hour + "/" + formatted_date + formatted_end_hour
    var text_param = "Yoga: " + class_type + " with " + teacher
    var location_param = getAddressOfLocation(location)

    var base_url = "http://www.google.com/calendar/event?action=TEMPLATE&trp=true"
    var calendar_url = base_url + "&text=" + text_param + "&dates=" + dates_param + "&location=" + location_param
    var button = "<a class=\"btn btn-default\" target=\"_blank\" href=\"" + calendar_url + "\"> Add to calendar </a>"

    cells[4].innerHTML += button
}

function getAddressOfLocation(location) {
    switch (location) {
        case "Weteringschans":
            return "Delight Yoga, Weteringschans 53, Amsterdam"
        case "De Clercqstraat":
            return "Delight Yoga, De Clercqstraat 66-68, Amsterdam"
        case "Nieuwe Achtergracht":
            return "Delight Yoga, Nieuwe Achtergracht 11-13, Amsterdam"
        case "Prinseneiland":
            return "Delight Yoga, Prinseneiland 20G, Amsterdam"
        default:
            return "Delight Yoga, " + location
    }
}