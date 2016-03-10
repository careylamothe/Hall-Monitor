
$(document).ready(function () {
  var myDataRef = new Firebase('https://hall-monitor.firebaseio.com/');
  //var $orcasInput = $('select.#orcasInput').val();
  var count = 0
  var checkedIn = false
  var time
  var counter = fucntion() {
    if (checkedIn) {
      count += 1;
    }
      else {
        count -= 1;
      }
  }

  $('#eagle-button').on('click', function() {
    $('#eaglesInput').show();
    var $eaglesInput = $('select.#eaglesInput').val();
    var $guardian = $('#guardian').val();
    var message = $('#message').val();

    $('#guardian').keypress(function (e) {
       if (e.keyCode == 13) {
         if checkedIn {
           ('checkIn').show()
         }
       }
     }
    $('.check').on('click', function (e) {
      time = Date.now();
      counter();
    }
    myDataRef.push({classCount: count, student: $eaglesInput, guardian: $guardian, checkedIn: checkedIn, message: message});
        $guardian.val('');
  })

    // append current classroom data to Attendance Log
    //  Show full student name, guardian name and time.  Include a node to open message
