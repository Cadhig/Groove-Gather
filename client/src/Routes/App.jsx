import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <header>
        <h1>My App</h1>
    </header>
      <main>
        <Outlet /> {/* This will render child routes */}
      </main>
    
    </div>
  );
}

export default App;
