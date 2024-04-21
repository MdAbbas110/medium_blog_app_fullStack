import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Blogs from './pages/Blogs';
import Signup from './pages/Signup';
import Signin from './pages/Signin';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blogs />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
