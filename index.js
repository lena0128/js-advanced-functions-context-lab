/* Your Code Here */

let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeRowRecord) {
    return employeeRowRecord.map(function(row) {
        return createEmployeeRecord(row)
    })
}

// the value of `this` is the mployeeRowRecord object
let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), 
        date,
    })
    return this

}

let createTimeOutEvent = function(dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type:"TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return this
}

let hoursWorkedOnDate = function(specificDate) {
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === specificDate
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === specificDate
    })
    return (outEvent.hour - inEvent.hour) / 100  
}

let wagesEarnedOnDate = function(specificDate) {
    let rawWage = hoursWorkedOnDate.call(this, specificDate) * this.payPerHour
    return parseFloat(rawWage.toString())
}



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(sourceArray, firstName) {
  return sourceArray.find(function(e){
      return e.firstName === firstName
  })
}

let calculatePayroll = function(employeeRowRecord) {
  return employeeRowRecord.reduce(function(memo, i){
      return memo + allWagesFor.call(i)
  }, 0)
}