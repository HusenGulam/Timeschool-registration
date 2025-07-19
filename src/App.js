import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login';
import Form from './components/form/form';
import 'boxicons/css/boxicons.min.css';
import RatePage from './components/rate/rating';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Form />
              ) : (
                <Login onSuccess={() => setIsLoggedIn(true)} />
              )
            }
          />
          <Route path="/rating" element={<RatePage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
