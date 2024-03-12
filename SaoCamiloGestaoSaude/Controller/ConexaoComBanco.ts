

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
        let validacao = [];
        let passou
        let validacaoDoPassword
        const query = "SELECT usuarioo, password FROM usuario WHERE usuarioo = $1"
        const resultado =  await this.pool.query(query,[username])
            for (let rows of resultado.rows){
                validacaoDoPassword = rows.password
            }
            if(validacaoDoPassword == password){
                console.log("Bem-Vindo de volta " + username)
            }else{
                console.log("Senha Incorreta")
            }   

    }


    async cadastrarNovoUsuario(userr,password){
        try{
            const values = [userr,password]
            const query = `INSERT INTO usuario ("usuarioo", "password") VALUES ($1,$2)`
            await this.pool.query({text: query,values})
            console.log("Cadastrado!")
        }catch(error){
            console.error(error.message)
        }

    }

}
const x = new Banco();
x.testarConexao()
x.cadastrarNovoUsuario("Roberto","aaaa")
x.validarLogin("Roberto","aaaaa")