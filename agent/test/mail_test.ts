const  nodemailer = require('nodemailer');


/*
let transporter = nodemailer.createTransport(
{
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
        user: '',
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
        user: '',
        pass: '',
    },
}
);

 */

/*
let transporter = nodemailer.createTransport({
    host: "mail.campus.mephi.ru",
    port: 465,
    secure: false,
    auth: {
        user: '',
        pass: '',
    },
    tls:{
        ciphers:'SSLv3'
    }
});

 */

let transporter = nodemailer.createTransport(
    {
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: '',
            pass: '',
        },
    }
);


const mailOptions = {
    "from":"",
    "to":[""],
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