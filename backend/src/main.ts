import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";
//import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);


    /*
    const user = process.env.RABBITMQ_DEFAULT_USER;
    const password = process.env.RABBITMQ_DEFAULT_PASS;
    const host = (process.env.docker === 'y' ? process.env.RABBIT_ALIAS : process.env.RABBIT_HOST);
    const queueName = process.env.RABBIT_QUEUE_NAME;
    const port = process.env.RABBIT_PORT;

    await app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.RMQ,
        options: {
            urls: [`amqp://${user}:${password}@${host}:${port}`],
            queue: queueName,
            queueOptions: {
                durable: true,
            },
        },
    });

    app.startAllMicroservices();

     */
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.PORT);
}

bootstrap();
