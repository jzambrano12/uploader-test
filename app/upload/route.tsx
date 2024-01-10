import { NextResponse } from 'next/server';
import HypermediaUploader from '../../src/utils/uploader';

// SECRET KEY HERE
const hyperUploader = new HypermediaUploader(
process.env.HYPERMEDIA_SECRET_KEY
);

export async function POST(request: Request) {
  try {
    // Leer y parsear el cuerpo de la solicitud
    const formData = await request.formData();
    const file = formData.get('file'); // Asegúrate de que 'file' es el nombre correcto del campo en tu FormData

    // Si 'file' es un archivo, ahora puedes pasarlo a tu función de carga
    if (file) {
      const response = await hyperUploader.upload(file);
      return new NextResponse(JSON.stringify(response), {status: 200});
    } else {
      throw new Error("We can't find a valid File");
    }
  } catch (err: any) {
    console.error(err);
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
