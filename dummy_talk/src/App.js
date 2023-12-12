import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Switch 대신 Routes를 사용합니다.
import { ModalProvider } from "src/components/providers/modal-provider";
import './App.css';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import SignUpForm from './components/pages/SignUpForm';
import IndexLayOut from "./layouts/IndexLayout/index_layout";
import Layout from "./layouts/layout";

function App() {


  return (
    <>
      <ModalProvider />
      <Router>
        <Routes>
          <Route path='/' element={<IndexLayOut />}>
            <Route index element={<Home />} />
            <Route path='/services' element={<Services />} />
            <Route path='/products' element={<Products />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/sign-up-form' element={<SignUpForm />} /> {/* Add the new route */}
          {/* <Route path='/Login' element={<Login />} /> */}
          </Route>
          <Route path="/main" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;