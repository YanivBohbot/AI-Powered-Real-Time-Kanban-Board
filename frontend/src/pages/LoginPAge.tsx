
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthService } from '../features/auth/api/auth.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';


export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { access_token } = await AuthService.login({ email, password });
            login(access_token);
            navigate('/dashboard');
            } catch (err) { alert('Login failed'); }
        };




    return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-dark-800 p-8 rounded-2xl border border-dark-700 space-y-6">
        <h1 className="text-2xl font-bold text-center">TaskFlow Login</h1>
        <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Button className="w-full">Sign In</Button>
      </form>
    </div>
  );
}