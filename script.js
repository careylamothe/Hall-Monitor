$(document).ready(function () {
  var dataRef = new Firebase('https://hall-monitor.firebaseio.com/logs/');
  //var $orcasInput = $('select.#orcasInput').val();
  var count = 0;
  var status = 'checked out';
  var time;

//when classroom button is clicked, show child list.
  $('#eagle-button').on('click', function() {
    $('#eaglesStudent').show();
    var $eaglesStudent = $('#eaglesStudent');
    var $guardian = $('#guardian');
    var $message = $('#message');

//When the grown-up field is entered, show checkIn button if the value is false.
    $('#guardian').keypress(function (e) {
       if (e.keyCode == 13) {
         if (status === "checked out") {
           $('#checkIn').show();

           //When the check-in button is clicked, get input log data and push to Firebase
           $('.check').on('click', function (e) {
             time = Date.now();
             counter();
             status = 'checked in';

             dataRef.push({
               classCount: count,
               student: $eaglesStudent.val(),
               guardian: $guardian.val(),
               status: status,
               timeStamp: time,
               message: $message.val()
             });

             $guardian.val('');
           })

           //retrieve new items from the database and display
           dataRef.on('child_added', function(snapshot) {
             var log = snapshot.val();
             displayLog(
               log.classCount,
               log.student,
               log.guardian,
               log.timeStamp,
               log.message
             );
           })
         }
       }
     })
    })
//function definitions
  function counter() {
    if (status === "checked in") {
      count += 1;
    }
    else {
      count -= 1;
    }
  }
  function displayLog(count, student, guardian, time, message) {
    $('#count').append(count);
    $('#inData').append(student + ' ' + guardian + ' ' + time + ' ' + message);
  }

});
