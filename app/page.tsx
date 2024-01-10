'use client';

export default function Home() {
  const handleChange = async (event: any) => {
    const formData = new FormData();
    formData.append('file', event.target.files[0]);

    await fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <main style={{ display: 'flex', flexDirection: 'column' }}>
      <input type="file" onChange={handleChange} />
    </main>
  );
}
