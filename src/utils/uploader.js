import { Upload } from 'tus-js-client';
import { getUploadInformation, saveFile } from './';


class TusClient {
  constructor(key) {
    this.key = key;
  }

  async upload(file) {
    try {
      const response = await getUploadInformation(file.name, file.size, this.key);
      const { data } = await response.json()

      const fileName = file.name
      const fileSize = file.size
      const fileType = file.type


      const tus = new Upload(file, {
        endpoint: data.endpoint,
        uploadSize: fileSize,
        retryDelays: [0, 3000, 5000, 10000],
        removeFingerprintOnSuccess: true,
        chunkSize: 5 * 1024 * 1024,
        headers: data.headers,
        metadata: {
          filetype: fileType,
          collection: data.metadata.collection,
          filename: fileName,
          filesize: fileSize,
        },
          onError: function (error) {
              console.log('Failed because: ' + error)
          },
          onProgress: function (bytesUploaded, bytesTotal) {
              const percentage = ((bytesUploaded / bytesTotal) * 100).toFixed(2)
              console.log(bytesUploaded, bytesTotal, `${percentage}%`)
          },
          onSuccess: async function () {
            const tusUrl = tus.url;
            const tusId = tusUrl.split('/')[4] || '';

            const fileToSave = {
              sources: 'DIRECT',
              filename: fileName,
              size: fileSize,
              tus_id: tusId,
              url: data.url,
              metadata: { videoId: data.video.guid },
            }

            await saveFile(fileToSave, this.key);
          },
      });

      tus.findPreviousUploads().then(function (previousUploads) {
          if (previousUploads.length) {
            tus.resumeFromPreviousUpload(previousUploads[0]);
          }
          tus.start();
      });
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
    
  }

  
}

export default TusClient;
