# PRIvate Spam Mailer
## Ready SMTP configs
### Yandex: 
Use login/pass
### Mail.ru: 
Use login/pass
### Google.com: 
Use login/pass with option "allow less secure apps to access your account" or login/app_password with 2fa
### Mephi.ru:
Use campus login/pass
### Custom:
You can modify connection options for ur own connection <br />
Sometimes you need to add additional options, such as ssl version. If so, make sure to check mephi example.
## Technologies
### Back 
#### NestJs + PostgresDB + RabbitMQ
yarn, nestjs, passport, typeorm, @nestjs/microservices (RMQ)
### Agent
yarn, nodemailer, amqplib
### Front
Webpack, Babel, TypeScript, React, React Router, Redux, material-ui

## Architecture diagram
![plot](arch.png)
