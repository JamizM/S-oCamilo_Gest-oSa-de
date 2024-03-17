

const nodemailer = require("nodemailer")

class Emailsend{
    transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port : 587,
        secure: false,
        auth : {
            user: "piimauadev@outlook.com",
            pass: "maua2024"
        }
    })
    async mandarEmail(email,codigo){
        const corpohtml = "<h1>Código de verificação</h1> " + codigo
        await this.transport.sendMail({
            from:"Pii-maua <piimauadev@outlook.com>",
            to : email,
            subject: "Verificação de conta.",
            html : corpohtml
        }).then(() => console.log("Email enviado com sucesso!")).catch((error) => console.log("Erro ao enviar email " + error)) 
    }
}
