import React from 'react';

const Error404: React.FC = () => {
  return (
    <div className="max-sm:w-full max-sm:border-0 w-11/12 p-5 m-auto my-20 bg-white/80 border-8 border-vet-purple-light rounded-lg max-w-[900px] flex flex-col justify-center">
      <h1 className="text-vet-purple-dark text-4xl font-bold mb-4">Error 404: Page not found</h1>
      <p className="text-vet-purple-dark text-xl">Ups, the page you are looking for cannot be found.</p>
    </div>
  );
};
export default Error404;
    
  