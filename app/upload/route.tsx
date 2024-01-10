import HypermediaUploader from '../../src/utils/uploader';

// SECRET KEY HERE
const hyperUploader = new HypermediaUploader(
  'hy_$2b$10$lJr.IXJYBct0YmcLAU5kpedAD/wXmRHO8OxWZqruuwOqeeO4X.e/i'
);

export async function POST(request: Request) {
  try {
    // Leer y parsear el cuerpo de la solicitud
    const formData = await request.formData();
    const file = formData.get('file'); // Asegúrate de que 'file' es el nombre correcto del campo en tu FormData

    console.log(file);

    // Si 'file' es un archivo, ahora puedes pasarlo a tu función de carga
    if (file) {
      await hyperUploader.upload(file);
      return new Response(JSON.stringify({ message: 'ok' }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } else {
      throw new Error("We can't find a valid File");
    }
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
