const amqp = require('amqplib/callback_api');
const  nodemailer = require('nodemailer');

// local smtp server for dev
let transporter = nodemailer.createTransport(
    `smtp://login:pasword@127.0.0.1:25`
);

amqp.connect('amqp://test-user:test-user@localhost', function(error, connection) {
    connection.createChannel(function(error, channel) {
        let queue = 'mails';

        channel.assertQueue(queue, {
            durable: true
        });
        // process only one email, before get next
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);
        channel.consume(queue, function(msg) {
            let data_str = msg.content.toString();
            console.log(" [x] Received %s", data_str);

            let mes = JSON.parse(data_str);
            let mailOptions = {
                from : mes.data.from,
                to : mes.data.to,
                subject : mes.data.subject,
                text: mes.data.body,
                attachments: mes.data.attachments
            };
            transporter.sendMail( mailOptions, (error, info) => {
                if (error) {
                    // msg was processed, so have to send Acknowledge
                    // reject msg from queue, don't put it back (second false)
                    channel.nack(msg, false, false);
                    return console.log(`error: ${error}`);
                }
                else {
                    // send Acknowledge to server that all was ok
                    channel.ack(msg);
                    return  console.log(`Message Sent ${info.response}`);
                }
            });
            //console.log(" [x] Done");
        }, {
            noAck: false
        });
    });
});