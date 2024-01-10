'use client';

import HypermediaUploader from '../src/utils/uploader';

// SECRET KEY HERE
const hyperUploader = new HypermediaUploader(
process.env.NEXT_PUBLIC_HYPERMEDIA_SECRET_KEY
);

export default function Home() {
  const handleChange = async (event: any) => {
    const uploadResponse = await hyperUploader.upload(event.target.files[0]);

    console.log(uploadResponse);

  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <input type="file" onChange={handleChange} />
    </main>
  );
}
