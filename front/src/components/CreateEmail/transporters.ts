
export interface TransporterObject {
    host: string;
    port: number;
    secure: boolean;
    auth: {
        user: string;
        pass: string;
    };
    tls?: {
        ciphers:string;
    }
}

export function createSmtpYandexConfig(login: string, password: string): TransporterObject {
    return (
        {
            host: "smtp.yandex.ru",
            port: 465,
            secure: true,
            auth: {
                user: login,
                pass: password,
            }
        }
    )
}

export function createSmtpMailRuConfig(login: string, password: string): TransporterObject {
    return (
        {
            host: "smtp.mail.ru",
            port: 465,
            secure: true,
            auth: {
                user: login,
                pass: password,
            },
        }
    )
}

export function createSmtpCampusMephiConfig(login: string, password: string): TransporterObject {
    return (
        {
            host: "mail.campus.mephi.ru",
            port: 465,
            secure: false,
            auth: {
                user: login,
                pass: password,
            },
            tls:{
                ciphers:'SSLv3'
            }
        }
    )
}

export function createCustomConfig(host: string, port: number, secure: boolean, login: string, password: string): TransporterObject {
    return (
        {
            host: host,
            port: port,
            secure: secure,
            auth: {
                user: login,
                pass: password,
            },
        }
    )
}