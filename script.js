$(document).ready(function () {
  var dataRef = new Firebase('https://hall-monitor.firebaseio.com/log/');
  //var $orcasInput = $('select.#orcasInput').val();
  var count = 0
  var checkedIn = false
  var time

//when classroom button is clicked, show child list.
  $('#eagle-button').on('click', function() {
    $('#eaglesInput').show();
  })
//When the grown-up field is entered, show checkIn button if the value is false.
  $('#guardian').keypress(function (e) {
     if (e.keyCode == 13) {
       if (checkedIn) {
         ('checkIn').show()
       }
     }
   })

//When the check-in button is clicked, get input log data and push to Firebase
  $('.check').on('click', function (e) {
    var $eaglesStudent = $('select.#eaglesStudent').val();
    var $guardian = $('#guardian').val();
    var message = $('#message').val();

    time = Date.now();
    counter();
    checkedIn = true;

    dataRef.push({classCount: count, student: $eaglesStudent, guardian: $guardian, checkedIn: checkedIn, timeStamp: time, message: message});
    $guardian.val('');
  })

//retrieve new items from the database and display
  dataRef.on('child_added', function(snapshot) {
    var log = snapshot.val();
    displayLog(log.classCount, log.student, log.guardian, log.timeStamp, log.message);
  })

//function definitions
  function counter() {
    if (checkedIn) {
      count += 1;
    }
      else {
        count -= 1;
      }
  }
  function displayLog(count, $eaglesStudent, $guardian, time, message) {
    $('#count').append(count);
    $('#inData').append($eagelesStudent + ' ' + $guardian + ' ' + time + ' ' + message);
  }

});
