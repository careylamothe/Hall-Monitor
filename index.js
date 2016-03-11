(function() {
  $(document).ready(function () {
    var dataRef = new Firebase('https://hall-monitor.firebaseio.com/students/');
    var $eaglesStudent = $('#eaglesStudent');

    dataRef.on('child_added', function(snapshot) {
      var $option = $('<option />');

      $option.attr('value', snapshot.key());
      $option.attr('data-status', snapshot.val().status);
      $option.text(snapshot.val().name);

      $eaglesStudent.append($option);
    });

    //var $orcasStudent = $('select.#orcasStudent').val();


    //when classroom button is clicked, show child list.
    $('#eagle-button').on('click', function() {
      $('#eaglesStudent').show();
      var $guardian = $('#guardian');
      var $message = $('#message');

      // When the grown-up field is entered, show checkIn button if the value is false.
      $('#guardian').keypress(function (e) {
        if (e.keyCode == 13) {
          var status = $('option:selected').attr('data-status');

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

              var $selected = $('option:selected');
              var key = $selected.attr('value');

              dataRef.child(key).update({
                guardian: $guardian.val(),
                message: $message.val(),
                status: status
              });

              $selected.attr('data-status', status);

              // TODO: think of a better solution that doesn't break the flow
              // $guardian.val('');
            })
          }

      })
    });
  });
})();
