//Sample Event looks like below
// {
//     "email": "customer@customer-domain.com",
//     "name": "Customer Name",
//     "message": "Hello World!\nGoing to the moon!",
// 	   "subject" : "Test Mail Subject"
// }
console.log('hello');
var aws = require('aws-sdk');
exports.handler = function (event, context) {

    console.log("Event: " + JSON.stringify(event));

    // Check required parameters
    if (event.email == null) {
        context.fail('Bad Request: Missing required attribute: email');
        return;
    }

    // Make sure to add a default name
    if (event.name == null) {
        event.name = 'User';
    }
    // Make sure to add a default subject
    if (event.subject == null) {
            event.subject = "Mail from AWS Lambda SES";
    }
    var from = 'support@subrata.tech'
    // prepare mail Request

    var params = {
                Destination: {
                    ToAddresses: [
                        event.email
                    ]
                },
                Message: {

                    Subject: {
                        Data: event.subject,
                        Charset: 'UTF-8'
                    }
                },
                Source: from,
                ReplyToAddresses: [
                    event.name + '<' + event.email + '>'
                ]
            };

    // Send the email
    ses.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail('Internal Error: The email could not be sent.');
        } else {
            console.log(data);           // successful response
            context.succeed('The email was successfully sent to ' + event.email);
        }
    });
}
