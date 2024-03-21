


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
    emailClient
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


    // Contrução com o email, para assim evitar mais requests ao banco de dados
    // Comandos de getter e set do email do cliente para testes


    pool = new Pool(this.dbConfig)
    constructor(emailClient){
        this.emailClient = emailClient
    }
    getEmailClient(){
        return this.emailClient
    }
    setEmailClient(emailClient){
        this.emailClient = emailClient
    }   










// Comandos criados para gerir a conta do usuário abaixo








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
    async validarLogin(password){
        let validacaoDoPassword
        let validacaoUsuario
        const query = "SELECT usuarioo, password,email FROM usuario WHERE email = $1"
        const resultado =  await this.pool.query(query,[this.emailClient])
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


    async cadastrarNovoUsuario(userr,password){
        try{
            const values = [userr,password,this.emailClient]
            const query = `INSERT INTO usuario ("usuarioo", "password","email") VALUES ($1,$2,$3)`
            await this.pool.query({text: query,values})
            console.log("Cadastrado!")
        }catch(error){
            console.error(error.message)
        }

    }
    async alterarSenha(novaSenha){
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        const y = new Emailsend
        y.mandarEmail(this.emailClient,numeroAleatorio)
        if (true){
            const values = [novaSenha,this.emailClient]
            const query = "UPDATE usuario SET password = $1 WHERE id = $2"
            await this.pool.query(query,values)


        }
         
    }
    async alterarNome(numeroDigitadoPeloUsuario,novoNome){
        const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
        const y = new Emailsend
        y.mandarEmail(this.emailClient,numeroAleatorio)
        if (numeroDigitadoPeloUsuario==numeroAleatorio){
            const values = [novoNome,this.emailClient]
            const query = "UPDATE usuario SET usuarioo = $1 WHERE email = $2"
            const resultado = await this.pool.query(query,values)
            for (const rows of resultado.rows){
                console.log("Usuario do email "+ this.emailClient + "  redefinido para " + resultado.rows.usuarioo)
            }

        }
    }
    async excluirConta(numeroDigitadoPeloUsuario){
            const numeroAleatorio = Math.floor(Math.random() * 9000) + 1000;
            const query = "DELETE FROM usuario WHERE email = $1"
            const y = new Emailsend
            y.mandarEmail(this.emailClient,numeroAleatorio)
            console.log("Um coódigo foi enviado para o seu email!")
            console.log("Agora digite o código enviado para verificar se você é o dono da conta!")
            if(numeroDigitadoPeloUsuario == numeroAleatorio){
                try{
                    await this.pool.query(query,[this.emailClient])
                    console.log("Conta foi excluida com sucesso!")
                    this.setEmailClient(null)
                    this.excluirTodosOsMedicamentosDoEmail()
                }
                catch(err){
                    console.log("Algo inesperado ocorreu: " + err)
                }

            }

        }

    
    








    
    // Comandos para CRUD com o remedios cadastrados para orientação do cliente abaixo







    




    
    async cadastrarMedicamento(nomeDoMedicamento,tempoParaTomar){
        const values = [this.emailClient,nomeDoMedicamento,tempoParaTomar]
        const query = 'INSERT INTO medicamento ("email","nome_medicamento","tempo_para_tomar") VALUES($1,$2,$3)'
        try{
            await this.pool.query(query,values)
            console.log("Cadastrado com sucesso!")
        }catch(err){
            console.log("Problemas ao cadastrar  " + err)
        }
        

    }
    async puxarTodosOsMedicamentoPeloEmail(){
        const query = "SELECT nome_medicamento,tempo_para_tomar FROM medicamento  WHERE email = $1"
        const resultado = await this.pool.query(query,[this.emailClient])
        for (const rows of resultado.rows){
            const medicamento = rows.nome_medicamento
            const horaMedicamento = rows.tempo_para_tomar
            console.log("Remedio = " + medicamento + " : tomar de " + horaMedicamento + " em " + horaMedicamento)
        }
    }
    async editarMedicamento(nomeDoMedicamento,tempoParaTomar){
        const values = [nomeDoMedicamento,tempoParaTomar,this.emailClient]
        const query = "UPDATE medicamento SET nome_medicamento = $1,tempo_para_tomar = $2 WHERE email = $3"
        try{
            await this.pool.query(query,values)
            console.log("As definições do remédio foram atualizados!")
        }
        catch(err){
            console.log("Erro ao atualizar : " + err)

        }
    }
    async excluirMedicamento(certeza,nomeDoMedicamento){
        const values = [nomeDoMedicamento,this.emailClient]
        const query = "DELETE FROM medicamento WHERE nome_medicamento = $1 AND email = $2"
        if(certeza = true){
            try {
                await this.pool.query(query,values)
                console.log("Medicamento excluido!")
            } catch (error) {
                console.log("Erro ao excluir medicamento: " + error)
                
            }

        }
    }
    async excluirTodosOsMedicamentosDoEmail(){
        const query = "DELETE FROM medicamento WHERE  email = $2"
            try {
                await this.pool.query(query,[this.emailClient])
                console.log("Medicamento excluido!")
            } catch (error) {
                console.log("Erro ao excluir medicamento: " + error)
                
            }

    }


}



//Area de comando de teste das funções construídas abaixo







const x = new Banco("victorcodinhoto@gmail.com");
// x.testarConexao()
x.cadastrarNovoUsuario("Victor","kkk123333")
// x.validarLogin("23.00051-0@maua.br","aaaaa")

// x.getIdClient()
// x.alterarSenha("23.00051-0@maua.br","xxxx")
x.cadastrarMedicamento("Alegra A", "6 horas")
x.puxarTodosOsMedicamentoPeloEmail()
// x.puxarIdPeloEmail("23.00051-0@maua.br")
// x.verTabelaUsuario()
// x.excluirConta()

