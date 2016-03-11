(function() {
  'use strict';

  var count = 0;

  var dataRef = new Firebase('https://hall-monitor.firebaseio.com/students/');

  //retrieve new items from the database and display
  dataRef.on('child_added', function(record) {
    var id = record.key();
    var student = record.val();
    var $inBody = $('#inBody');
    var $outBody = $('#outBody')
    var $tr = $('<tr />');
    var $name = $('<td />');
    var $guardian = $('<td />');
    var $message = $('<td />');
    var $count = $('#count');

    $tr.attr('id', id);

    $name.text(student.name);
    $tr.append($name);

    $guardian.text(student.guardian);
    $tr.append($guardian);

    $message.text(student.message);
    $tr.append($message);

    if (student.status === 'in') {
      count += 1;
      $inBody.append($tr);
    } else {
      $outBody.append($tr);
    }

    $count.text(count);
  });

  dataRef.on('child_changed', function(snapshot) {
    var id = snapshot.key();
    var student = snapshot.val();
    var $tr = $('#' + id);
    var $inBody = $('#inBody');
    var $outBody = $('#outBody');
    var $count = $('#count');
    var $guardian = $($tr.children()[1]);
    var $message = $($tr.children()[2]);

    $guardian.text(student.guardian);
    $message.text(student.message);

    if (student.status === 'in') {
      count += 1;
      $inBody.append($tr);
    } else {
      count -= 1;
      $outBody.append($tr);
    }

    $count.text(count);
  });
})();
