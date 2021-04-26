import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {Transport} from "@nestjs/microservices";


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const microservice = app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${(process.env.docker === 'y' ? process.env.RABBIT_ALIAS : process.env.RABBIT_HOST)}:${process.env.RABBIT_PORT}`],
            queue: process.env.RABBIT_QUEUE_ERRORS,
            queueOptions: {
                durable: true
            },
        },
    });

    app.useGlobalPipes(new ValidationPipe());
    await app.startAllMicroservicesAsync();
    await app.listen(process.env.PORT);
}

bootstrap();
