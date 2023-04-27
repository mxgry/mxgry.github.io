$.getJSON('http://api.open-notify.org/astros.json?callback=?', function(data) {
    if(data == null){
       const myJSON = '{"message": "success", "number": 10, "people": [{"craft": "ISS", "name": "Sergey Prokopyev"}, {"craft": "ISS", "name": "Dmitry Petelin"}, {"craft": "ISS", "name": "Frank Rubio"}, {"craft": "Shenzhou 15", "name": "Fei Junlong"}, {"craft": "Shenzhou 15", "name": "Deng Qingming"}, {"craft": "Shenzhou 15", "name": "Zhang Lu"}, {"craft": "ISS", "name": "Stephen Bowen"}, {"craft": "ISS", "name": "Warren Hoburg"}, {"craft": "ISS", "name": "Sultan Alneyadi"}, {"craft": "ISS", "name": "Andrey Fedyaev"}]}';
       const data = JSON.parse(myJSON);
    };
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

    const myJSON = '{"message": "success", "number": 10, "people": [{"craft": "ISS", "name": "Sergey Prokopyev"}, {"craft": "ISS", "name": "Dmitry Petelin"}, {"craft": "ISS", "name": "Frank Rubio"}, {"craft": "Shenzhou 15", "name": "Fei Junlong"}, {"craft": "Shenzhou 15", "name": "Deng Qingming"}, {"craft": "Shenzhou 15", "name": "Zhang Lu"}, {"craft": "ISS", "name": "Stephen Bowen"}, {"craft": "ISS", "name": "Warren Hoburg"}, {"craft": "ISS", "name": "Sultan Alneyadi"}, {"craft": "ISS", "name": "Andrey Fedyaev"}]}';
    const data = JSON.parse(myJSON);
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