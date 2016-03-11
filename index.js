(function() {
  $(document).ready(function () {
    var dataRef = new Firebase('https://hall-monitor.firebaseio.com/students/');
    var $eaglesStudent = $('#eaglesStudent');

    dataRef.on('child_added', function(snapshot) {
      var $option = $('<option />');

      $option.attr('value', snapshot.key());
      $option.text(snapshot.val().name);

      $eaglesStudent.append($option);
    });

    //var $orcasStudent = $('select.#orcasStudent').val();

    var status = 'out';

    //when classroom button is clicked, show child list.
    $('#eagle-button').on('click', function() {
      $('#eaglesStudent').show();
      var $guardian = $('#guardian');
      var $message = $('#message');

      // When the grown-up field is entered, show checkIn button if the value is false.
      $('#guardian').keypress(function (e) {
        if (e.keyCode == 13) {
          if (status === "out") {
            $('#checkIn').show();
            } else {
            $('#checkOut').show();
            }

            // When the check-in or check-out buttons are clicked, get input and push data to Firebase.
            $('.check').on('click', function (e) {
              $('.check').hide();
              if (status === 'in') {
                status = 'out';
                } else {
                status = 'in';
                }

              var key = $('option:selected').attr('value');

              dataRef.child(key).update({
                guardian: $guardian.val(),
                message: $message.val(),
                status: status
              });

              $guardian.val('');

            })
          }

      })
    });
  });
})();
