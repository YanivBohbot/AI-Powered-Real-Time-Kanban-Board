import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Cards';
import { workspacesService, type Workspace } from '../features/workspaces/workspace.service';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWorkspaces();
  }, []);

  const loadWorkspaces = async () => {
    try {
      const data = await workspacesService.getAll();
      setWorkspaces(data);
    } catch (error) {
      console.log('Could not load workspaces (API might be missing)');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWorkspaceName) return;
    try {
      const newWs = await workspacesService.create(newWorkspaceName);
      setWorkspaces([...workspaces, newWs]);
      setNewWorkspaceName('');
    } catch (error) {
      alert('Failed to create workspace');
    }
  };

  return (
    <div className="min-h-screen p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.email}</p>
        </div>
        <Button variant="secondary" onClick={logout}>Sign Out</Button>
      </div>

      {/* Create Section */}
      <Card className="mb-10 max-w-2xl bg-gradient-to-r from-dark-800 to-dark-800/50">
        <h2 className="text-xl font-bold text-white mb-4">🚀 Start a New Project</h2>
        <form onSubmit={handleCreate} className="flex gap-4">
          <Input 
            placeholder="Project Name (e.g. Website Redesign)" 
            value={newWorkspaceName}
            onChange={(e) => setNewWorkspaceName(e.target.value)}
            className="bg-dark-900/50"
          />
          <Button disabled={!newWorkspaceName}>Create</Button>
        </form>
      </Card>

      {/* Grid of Workspaces */}
      <h2 className="text-xl font-bold text-white mb-6">Your Workspaces</h2>
      
      {isLoading ? (
        <div className="text-gray-500">Loading projects...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workspaces.map((ws) => (
            <Card 
              key={ws.id} 
              onClick={() => navigate(`/board/${ws.id}`)} // We will build this route next
              className="group"
            >
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500 text-xl font-bold mb-4 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                  {ws.name.charAt(0).toUpperCase()}
                </div>
              </div>
              <h3 className="text-lg font-bold text-white">{ws.name}</h3>
              <p className="text-sm text-gray-500 mt-2">Created recently</p>
            </Card>
          ))}
          
          {workspaces.length === 0 && (
            <div className="col-span-full text-center py-10 border-2 border-dashed border-dark-700 rounded-xl">
              <p className="text-gray-500">No workspaces yet. Create one above!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}