(function() {
  'use strict';

  function dailyRecord() {
    // append daily attendance data to student obj(?)
  }

  function displayCount() {
    // var count = students[].length
    // $('#count').append(count);
  }

  function displayLog(guardian, time, message) {
    $('#inData').append(guardian + ' ' + time + ' ' + message);
  }

  var dataRef = new Firebase('https://hall-monitor.firebaseio.com/students/');

  //retrieve new items from the database and display
  dataRef.on('child_changed', function(snapshot) {
    var log = snapshot.val();
    displayLog(
      log.guardian,
      log.timeStamp,
      log.message
    );

    dataRef.on('child_added', function(snapshot) {
      var students = snapshot.val();
            log.student,

    })
  })
})();
