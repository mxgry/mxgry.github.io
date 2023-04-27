$.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
    var number = data['number'];
    $('#numOfPeople').html(number);

    var spaceCrafts = [];
    


    data['people'].forEach(function (d) {
        $('#astroNames').append('<li>' + d['name']+ " on the "+ d['craft']+ '</li>');
        if (!spaceCrafts.includes(d['craft'])){
            spaceCrafts.push(d['craft']);
            $('#satNames').append('<li>' + '<a href="https://www.orbtrack.org/#/?satName=' + d['craft']+'">'+ d['craft'] + '</li>');
        };
    });

    var crafts = spaceCrafts.length;
    $('#numOfCrafts').html(crafts);
});