'use strict';

var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
//const uuidv5 = require('uuid/v5');
const uuid = require('uuid/v4');


var connectionString = 'HostName=hacker1IoTHub.azure-devices.net;DeviceId=challenge1.device1;SharedAccessKey=MDEuNh43UGD2RKCptB+gYocmOlWDmv7o04o+xnjUlZE=';

var client = clientFromConnectionString(connectionString);

function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' +err.toString());
        if (res) console.log(op + ' status: ' +res.constructor.name);
    };

}

var connectCallback = function (err) {
    if (err) {
      console.log('Could not connect: ' + err);
    } else {
      console.log('Client connected');
  
      
      var randomTime = 1000*( 10 + (Math.floor(Math.random() * 10)));
         
      // Create a message and send it to the IoT Hub every second
      setInterval(function(){
            var guid = uuid();
            var dateTime = new Date();
          //var temperature = 20 + (Math.random() * 15);
          //var humidity = 60 + (Math.random() * 20);            
          var data = JSON.stringify({ ticketId: guid, entryTime: dateTime});
          var message = new Message(data);
          //message.properties.add('temperatureAlert', (temperature > 30) ? 'true' : 'false');
          console.log("Sending message: " + message.getData());
          client.sendEvent(message, printResultFor('send'));
          
          randomTime = 1000*(10+ (Math.floor(Math.random() * 10)));

        }, randomTime);
    }
};

client.open(connectCallback);


