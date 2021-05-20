import './App.css';
import {useContext} from "react";
import Chatbox from './components/chatbox';
import Sidebar from './components/sidebar';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import Test from './components/Test';
import {DataContext} from "./hooks/Dataprovider";
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';


function App() {
 
  const [userlogin,]=useContext(DataContext);
 
  return (
    <Router>
    <div className="App">
    
        <Switch>
        
        <Route path="/mobilechat" exact>

          <Test />

        </Route> 

        <Route path="/" exact>  
        {userlogin ?<div className="app__body">
          <Sidebar />
          <Chatbox />
          </div> : <Login />  }
        
        </Route>
        <Route component={ErrorPage}></Route>
        </Switch>
      </div>  
    
    </Router>
  );
}

export default App;
