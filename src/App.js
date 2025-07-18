import { useState } from 'react';
import Login from './components/login/login';
import Form from './components/form/form';
import 'boxicons/css/boxicons.min.css';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
  {isLoggedIn ? <Form /> : <Login onSuccess={() => setIsLoggedIn(true)} />}
</div>

  );
}

export default App;
