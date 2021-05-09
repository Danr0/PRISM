const  nodemailer = require('nodemailer');


/*
let transporter = nodemailer.createTransport(
{
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: 'denp00@mail.ru',
        pass: '',
    },
}
);
 */

/*
let transporter = nodemailer.createTransport(
{
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: {
        user: 'B18505@yandex.ru',
        pass: '',
    },
}
);

 */

let transporter = nodemailer.createTransport({
    host: "mail.campus.mephi.ru",
    port: 465,
    secure: false,
    auth: {
        user: 'pdv015@campus.mephi.ru',
        pass: '',
    },
    tls:{
        ciphers:'SSLv3'
    }
});




const mailOptions = {
    "from":"",
    "to":["denp00@yandex.ru"],
    "subject":"test",
    "html": "<b>Hello world2</b>",
    "attachments":[{
        "filename": "text1.txt",
        "content": "aGVsbG8gd29ybGQh",
        "encoding": "base64"
    },{
        "filename": "text2.txt",
        "content": "aGVsbG8gd29ybGQh",
        "encoding": "base64"
    }]
}

transporter.sendMail( mailOptions, (error, info) => {
    if (error) {
       console.log(error);
    }
    else {
        console.log('sent');
    }
});