'use client';

export default function Home() {
  const handleClick = async () => {
    const response = await fetch('/api/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'John Doe',
      }),
    });
    console.log(response);
  };

  return (
    <div className='grid items-center justify-items-center min-h-screen '>
      <button
        onClick={handleClick}
        className='bg-white text-black py-2 px-4 rounded-md font-semibold'
      >
        Send an email
      </button>
    </div>
  );
}
