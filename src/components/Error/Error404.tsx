import React from 'react';

const Error404: React.FC = () => {
  return (
    <div className="bg-purple-600 flex flex-col items-center justify-center h-screen">
      <h1 className="text-white text-4xl font-bold mb-4">Error 404: Page not found</h1>
      <p className="text-white text-xl">Ups, the page you are looking for cannot be found.</p>
    </div>
  );
};
export default Error404;
    
  