import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Employee from './pages/employee';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/employee' element={<Employee/>} />
        <Route path='*' element={<Navigate to='/employee' /> } />
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
