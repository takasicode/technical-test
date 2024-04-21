import { Route, Routes } from 'react-router-dom';

// React Pages  
import Login from "./pages/Login";
import Overview from "./pages/Overview";
import Tickets from "./pages/Tickets";            

function App() {
  return (
    <Routes>          
      <Route path="/" Component={Login} />
      <Route path="/overview" Component={Overview} />
      <Route path="/tickets" Component={Tickets} />
    </Routes>
  );
}

export default App;
