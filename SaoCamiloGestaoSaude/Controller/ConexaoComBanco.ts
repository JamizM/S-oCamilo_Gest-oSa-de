

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


    async validarLogin(username,password){
        let validacao : string[] = [];
        let validacaoDoUser : string[] = []
        let validacaoDoPassword
        let passou
        const resultado =  await this.pool.query('SELECT user, password FROM usuario WHERE user = ' + username)
            for (let res of resultado.res){
                validacao.push(res)
            }
            for(const[user,password] of validacao){
                validacaoDoUser.push(user)
                validacaoDoPassword.push(password)
            }
            if(validacaoDoPassword[0] == password){
                console.log("Bem-Vindo de volta " + username)
                passou = true
            }else{
                console.log("Senha Incorreta")
            }   
        validacaoDoUser = []
        validacaoDoPassword = []
    }


    async cadastrarNovoUsuario(userr: string,password: string){
        try{
            const values = [userr,password]
            const query = `INSERT INTO usuario ("user", "password") VALUES (${1},${2})`
            await this.pool.query({text: query,values})
            console.log("Cadastrado!")
        }catch(error){
            console.error(error.message)
        }

    }

}
const x = new Banco();
x.testarConexao()
x.cadastrarNovoUsuario("Victor123456","123456")