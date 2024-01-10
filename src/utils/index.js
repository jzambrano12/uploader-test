const HOST =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://api.hypermedia.link';

    const TOKEN = "eyJhbGciOiJIUzI1NiIsImtpZCI6IjVwY3VZbTlyR2VzaUtPVXMiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzA0OTAxNDExLCJpYXQiOjE3MDQ4OTc4MTEsImlzcyI6Imh0dHBzOi8vb3NnenRtb21wb2praWJwc2lzeHIuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImFjNTE3YjU4LTdlNDEtNDBjOC05ZTk2LTlhYmNhYWQyNThiMiIsImVtYWlsIjoiam9yZ2VtbmR6OTk0K3Rlc3RAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6e30sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MDQ4ODg0ODR9XSwic2Vzc2lvbl9pZCI6IjkxZmM1MzYxLTRiNjctNGUzYS05OTg1LTI0ZTg0ZGZlM2FhMCJ9.DmwhbkUDhiUQ1pAkZ-deqDObuZLVHHphr1hu6ZHBuNM"


export async function getUploadInformation (fileName, fileSize, key) {
  return await apiRequestExternal(`${HOST}/upload`, 'POST', {
    title: fileName,
    size: fileSize
  }, {
    // 'x-api-key': key,
    authorization:
      `Bearer ${TOKEN}`,
  });
};

export async function saveFile (file, key) {
  return await apiRequestExternal(`${HOST}/files/save`, 'POST', { file }, {
    // 'x-api-key': key,
    authorization:
      `Bearer ${TOKEN}`,
  });
};

async function apiRequestExternal(url, method = 'GET', body, headers) {
  return fetch(url, {
    method: method,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}