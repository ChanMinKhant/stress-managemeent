import { Routes, Route } from 'react-router-dom';
import './App.css';
import RegisterForm from './pages/auth/signup/Signup';
import LoginForm from './pages/auth/login/Login';

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="flex items-center justify-between w-full max-w-4xl p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold">Stress Management</h1>
      </header>

      <main className="flex flex-col items-center mt-10 w-full max-w-4xl">
        <Routes>
          <Route path="/" element={<h1>Welcome to Stress Management</h1>} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
