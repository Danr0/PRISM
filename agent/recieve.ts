const amqp = require('amqplib/callback_api');
const  nodemailer = require('nodemailer');

/*
// local smtp server for dev
let transporter = nodemailer.createTransport(
    `smtp://login:pasword@127.0.0.1:25`
);
 */

amqp.connect('amqp://main-user:hochu_avtomat322*()@84.252.142.34', function(error, connection) {
    connection.createChannel(function(error, channel) {
        // rabbitmq queue names
        const queue = 'mails';
        const error_queue = 'errors';

        //const pattern
        const pattern_error = "error";

        // recheck, that queues exist
        channel.assertQueue(queue, {
            durable: true
        });
        channel.assertQueue(error_queue, {
            durable: true
        });

        // process only one email, before get next
        channel.prefetch(1);
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        // wait for messages
        channel.consume(queue, function(msg) {
            //parse msg
            let data_str = msg.content.toString();
            console.log(" [x] Received %s", data_str);
            let mes = JSON.parse(data_str);
            let mailOptions = {
                from : mes.data.from,
                to : mes.data.to,
                subject : mes.data.subject,
                attachments: mes.data.attachments,
                html: mes.data.body
            };

            let transporter = nodemailer.createTransport(mes.data.transporter);
            // send mail
            transporter.sendMail( mailOptions, (error, info) => {
                if (error) {
                    // msg was processed, so have to send Acknowledge
                    // reject msg from queue, don't put it back (second false)
                    channel.nack(msg, false, false);

                    // now create response msg and send it in error queue
                    let error_msg = JSON.stringify({pattern:pattern_error,data:{err_msg:error,mail_id:mes.data.mail_id,to:mes.data.to}});
                    channel.sendToQueue(error_queue, Buffer.from(error_msg), {
                        persistent: true
                    });
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