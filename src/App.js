import { useState } from 'react';
import Login from './components/login/login';
import Form from './components/form/form';
import 'boxicons/css/boxicons.min.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
  <h1 className="text-center text-red-600 mb-4">Welcome to My React App</h1>
  {isLoggedIn ? <Form /> : <Login onSuccess={() => setIsLoggedIn(true)} />}
</div>

  );
}

export default App;
