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
import { Provider } from 'react-redux';
import store from '../src/store'
import ServerDetail from "./components/Server/serverDetail";
import Chat from "./page/Chat";
import {useModal} from "./components/hooks/use-modal";
import MainPage, {ChatPage} from "./page/MainPage";


function App() {

  return (
      <>
        <Provider store={store}>
          
          <Router>
            <Routes>
              <Route path='/' element={<IndexLayOut />}>
                <Route index element={<Home />} />
                <Route path='/services' element={<Services />} />
                <Route path='/products' element={<Products />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-up-form' element={<SignUpForm />} />
                {/* <Route path='/Login' element={<Login />} /> */}
              </Route>
              <Route path="/main" element={<Layout />} />
            </Routes>
          </Router>
        </Provider>
      </>
  );
}

export default App;