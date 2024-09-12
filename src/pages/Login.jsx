import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LuLogIn } from 'react-icons/lu';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@mail.com' && password === 'admin@123') {
      navigate('/dashboard');
    } else {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 font-semibold text-white p-2 rounded flex justify-center items-center gap-2 hover:bg-blue-700"
        >
          <LuLogIn />
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
