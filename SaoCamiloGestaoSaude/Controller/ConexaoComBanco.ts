const nodemailer = require('nodemailer');

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

 



const { Pool } = require('pg');
class Banco{
    dbConfig = {
        user: 'avnadmin',
        host: 'bancodedadosdopii-maua-b52c.a.aivencloud.com',
        database: 'defaultdb',
        password: 'AVNS_62DP2ALu9x2P5u0YPwu',
        port: "11379",
        ssl: {
          rejectUnauthorized: false, // Necessário para conexão com Aiven
        },
      };
    pool = new Pool(this.dbConfig)
    


    async verTabelaUsuario() {
        try{
            const resultado =  await this.pool.query('SELECT * FROM usuario')
            for (let rows of resultado.rows){
                console.log(rows)
            }
         
        }
        catch{
            console.log("Erro")
        }
    }
    async testarConexao(){
        try{
            await this.pool
            console.log("Conexão funcionando!")
        }
         
        catch{
            console.log("Conexão não efeituada")
        }

    }


    async validarLogin(email,password){
        let validacao = [];
        let passou
        let validacaoDoPassword
        let validacaoUsuario
        const query = "SELECT usuarioo, password,email FROM usuario WHERE email = $1"
        const resultado =  await this.pool.query(query,[email])
            for (let rows of resultado.rows){
                validacaoDoPassword = rows.password
                validacaoUsuario = rows.usuarioo
            }
            if(validacaoDoPassword == password){
                console.log("Bem-Vindo de volta " + validacaoUsuario)
            }else{
                console.log("Senha Incorreta")
            }   

    }


    async cadastrarNovoUsuario(userr,password,email){
        try{
            const values = [userr,password,email]
            const query = `INSERT INTO usuario ("usuarioo", "password","email") VALUES ($1,$2,$3)`
            await this.pool.query({text: query,values})
            console.log("Cadastrado!")
        }catch(error){
            console.error(error.message)
        }

    }
    async alterarSenha(email,novaSenha){
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        const y = new Emailsend
        y.mandarEmail(email,numeroAleatorio)
        if (true){
            const values = [novaSenha,email]
            const query = "UPDATE usuario SET password = $1 WHERE email = $2"
            const resultado = await this.pool.query(query,values)

            for (const rows of resultado.rows){
                console.log("Senha do email "+ email +"  redefinido para " + resultado.rows.password)
            }

        }
         
    }
    async alterarNome(email,x,novoNome){
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        const y = new Emailsend
        y.mandarEmail(email,numeroAleatorio)
        if (x==numeroAleatorio){
            const values = [novoNome,email]
            const query = "UPDATE usuario SET usuarioo = $1 WHERE email = $2"
            const resultado = await this.pool.query(query,values)
            for (const rows of resultado.rows){
                console.log("Usuario do email "+ email + "  redefinido para " + resultado.rows.usuarioo)
            }

        }
         
    }

}
const x = new Banco();
x.testarConexao()
x.cadastrarNovoUsuario("Victor","MAUA","23.00051-0@maua.br")
x.validarLogin("23.00051-0@maua.br","MAUA")

x.alterarSenha("23.00051-0@maua.br","aaaaa")
x.verTabelaUsuario()

