'use strict';
var clientFromConnectionString = require('azure-iot-device-mqtt').clientFromConnectionString;
var Message = require('azure-iot-device').Message;



var connectionString = 'HostName=VivekIOTHub.azure-devices.net;DeviceId=new-device;SharedAccessKey=ERx3soNBTA55SVYBZyxbWBAkpI+xtANL4Cq8e4+UB3M=';

var client = clientFromConnectionString(connectionString);




function printResultFor(op) {
    return function printResult(err, res) {
        if (err) console.log(op + ' error: ' + err.toString());
        if (res) console.log(op + ': message sent');
    };
}


client.open(function(err) {
    client.on('message', function(msg) {
        console.log('Id: ' + msg.messageId + ' Body: ' + msg.data);
        client.complete(msg, printResultFor('completed'));
        // reject and abandon follow the same pattern.
        // /!\ reject and abandon are not available with MQTT
    });

    setInterval(function() {
        var randomNum = Math.floor((Math.random() * 5) + 1);
        var containertemp = 0 + randomNum;
        var outsidetemp = 23 + randomNum
        var data = JSON.stringify({ deviceId: 'MyDeviceId', TruckDetail: 'KA05JS5496', ContainerId:"Cont1", OutsideTemp:outsidetemp, ContainerTemp:containertemp });
        var message = new Message(data);
      message.properties.add('messageType', 'interactive');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 5000);
    
    setInterval(function() {
        var randomNum = Math.floor((Math.random() * 5) + 1);
        var containertemp = -5 + randomNum;
        var outsidetemp = 22 + randomNum
        var data = JSON.stringify({ deviceId: 'MyDeviceId', TruckDetail: 'KA05MG6871', ContainerId:"Cont2", OutsideTemp:outsidetemp, ContainerTemp:containertemp });
        var message = new Message(data);
      message.properties.add('messageType', 'interactive');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 5500);
    
    setInterval(function() {
        var randomNum = Math.floor((Math.random() * 5) + 1);
        var containertemp = -3 + randomNum;
        var outsidetemp = 25 + randomNum
        var data = JSON.stringify({ deviceId: 'MyDeviceId', TruckDetail: 'KA05GD0876', ContainerId:"Cont3", OutsideTemp:outsidetemp, ContainerTemp:containertemp });
        var message = new Message(data);
      message.properties.add('messageType', 'interactive');
        console.log("Sending message: " + message.getData());
        client.sendEvent(message, printResultFor('send'));
    }, 4500);
});