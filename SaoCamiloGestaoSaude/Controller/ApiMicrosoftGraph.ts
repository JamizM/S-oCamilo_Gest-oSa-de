import { google } from 'googleapis';
class OneDrive{
    chaveApi = "AIzaSyDRZ68C6FdMe_refUdb96P3Yd2CSmpJpts"
    criarArquivo = "POST /upload/drive/v3/files"
    deletarArquivo = "DELETE /drive/v3/files/{fileId}"
    listarArquivos = "GET /drive/v3/files"
    emailContaServiço = "pii-maua@imt-maua-pii.iam.gserviceaccount.com"
    idAuth2 = "108085887122363208522"
    auth = new google.auth.GoogleAuth({
        key: this.chaveApi,
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });
    
    drive = google.drive({
        version: 'v3',
        auth: this.auth,
      });
}















