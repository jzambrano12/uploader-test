// import { Upload } from 'tus-js-client';
import { apiRequestExternal } from './';

const HOST =
  process.env.NODE_ENV === 'development'
    ? 'https://09d6-190-71-58-251.ngrok-free.app'
    : 'https://api.hypermedia.link';

class TusClient {
  constructor(key) {
    this.key = key;
  }

  async upload(file) {
    // TO-DO: Pass Bearer token instead key
    const data = await this._getBunnyUploadUrl(file);
    console.log('Bunny response', data);

    return 'Uploading file';
    // const upload = new Upload(file, {
    //     endpoint: 'http://localhost:1080/files/',
    //     retryDelays: [0, 3000, 5000, 10000, 20000],
    //     removeFingerprintOnSuccess: true,
    //     metadata: {
    //         filename: file.name,
    //         filetype: file.type,
    //     },
    //     onError: function (error) {
    //         console.log('Failed because: ' + error)
    //     },
    //     onProgress: function (bytesUploaded, bytesTotal) {
    //         const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
    //         console.log(bytesUploaded, bytesTotal, `${percentage}%`)
    //     },
    //     onSuccess: function () {
    //         console.log('Download %s from %s', upload.file.name, upload.url)
    //     },
    // });

    // upload.findPreviousUploads().then(function (previousUploads) {
    //     if (previousUploads.length) {
    //         upload.resumeFromPreviousUpload(previousUploads[0]);
    //     }
    //     upload.start();
    // });
  }

  _getBunnyUploadUrl = async () => {
    console.log('user key', this.key);
    return await apiRequestExternal(`${HOST}/upload`, 'GET', null, {
      // 'x-api-key': this.key,
      authorization:
        'eyJhbGciOiJIUzI1NiIsImtpZCI6IjVwY3VZbTlyR2VzaUtPVXMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA0ODExNTc5LCJpYXQiOjE3MDQ4MDc5NzksImlzcyI6Imh0dHBzOi8vb3NnenRtb21wb2praWJwc2lzeHIuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImFjNTE3YjU4LTdlNDEtNDBjOC05ZTk2LTlhYmNhYWQyNThiMiIsImVtYWlsIjoiam9yZ2VtbmR6OTk0K3Rlc3RAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MDM3MDQxMTd9XSwic2Vzc2lvbl9pZCI6Ijc5ZmM1YzdhLTJlODQtNDBiZC05NzU1LTE5MmNkYzQwZDk0YSJ9.k0lz2Wvd3lKJ1hYheDVFTLPOMjJODXHJEOrUy3kpTC4',
    });
  };
}

export default TusClient;
