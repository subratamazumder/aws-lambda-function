//Sample Event looks like below
{
    "email": "subrata.besu@gmail.com",
    "name": "Subrata",
    "message": "Welcome to API Gateway, Lambda & SES",
	   "subject" : "Hello from AWS"
}
//LambdaMicroserviceSendMailSES
var aws = require('aws-sdk');
var ses = new aws.SES();
exports.handler = function (event, context, callback) {

    console.log("Event: " + JSON.stringify(event));

    // Check required parameters
    if (event.email === null) {
        context.fail('Bad Request: Missing required attribute: email');
        return;
    }

    // Make sure to add a default name
    if (event.name === null) {
        event.name = 'User';
    }
    // Make sure to add a default subject
    if (event.subject === null) {
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
                    },
                    Body : {
                      Text : {
                        Data : event.message
                      }
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
    callback(null, 'The email was successfully sent to ' + event.email);
}
