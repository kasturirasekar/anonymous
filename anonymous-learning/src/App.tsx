import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Dashboard from './pages/Dashboard';

// Application Shell / Layout
function AppLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/20">
      <header className="h-16 border-b border-border flex items-center justify-between px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <Link to="/" className="font-semibold tracking-tight text-lg hover:opacity-80 transition-opacity">
          Anonymous Learning
        </Link>
        {user.authenticated && (
          <div className="text-sm font-medium px-3 py-1.5 bg-muted rounded-full text-muted-foreground border border-border">
            Anonymous Learner
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center">
        <Outlet />
      </main>

      <footer className="py-8 px-6 border-t border-border text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center gap-4 bg-background">
        <div>© {new Date().getFullYear()} Anonymous Learning</div>
        <div className="flex gap-6">
          <Link to="/about" className="hover:text-foreground transition-colors">Privacy</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">How it works</Link>
          <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
        </div>
      </footer>
    </div>
  );
}

// Placeholder pages
function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center p-8 text-center">
      <div>
        <h1 className="text-2xl font-medium mb-2">{title}</h1>
        <p className="text-muted-foreground">This page will be implemented in a future milestone.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="verify" element={<Verify />} />
            <Route path="dashboard" element={<Dashboard />} />
          <Route path="matchmaking" element={<PlaceholderPage title="Matchmaking" />} />
          <Route path="match-found" element={<PlaceholderPage title="Match Found" />} />
          <Route path="chat" element={<PlaceholderPage title="Chat" />} />
          <Route path="session-ended" element={<PlaceholderPage title="Session Ended" />} />
          <Route path="rate" element={<PlaceholderPage title="Rate Session" />} />
          <Route path="about" element={<PlaceholderPage title="About" />} />
          <Route path="*" element={<PlaceholderPage title="404 - Not Found" />} />
        </Route>
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
