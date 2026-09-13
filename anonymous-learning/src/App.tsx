import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';

// Application Shell / Layout
function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col selection:bg-accent/20">
      {/* Navbar placeholder */}
      <header className="h-16 border-b border-border flex items-center px-6 sticky top-0 bg-background/80 backdrop-blur-sm z-50">
        <div className="font-semibold tracking-tight text-lg">Anonymous Learning</div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer placeholder */}
      <footer className="py-6 px-6 border-t border-border text-sm text-muted-foreground flex justify-between">
        <div>© 2024 Anonymous Learning</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
          <a href="#" className="hover:text-foreground transition-colors">About</a>
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
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<PlaceholderPage title="Landing Page" />} />
          <Route path="login" element={<PlaceholderPage title="Login" />} />
          <Route path="verify" element={<PlaceholderPage title="Verify" />} />
          <Route path="dashboard" element={<PlaceholderPage title="Dashboard" />} />
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
  );
}

export default App;
