import { useState } from 'react';
import Layout from './components/Navbar';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gradient-to-b from-white to-white min-h-screen text-black">
      <Layout />
    </div>
  );
}

export default App;
