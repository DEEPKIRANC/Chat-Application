import './App.css';
import Chatbox from './components/chatbox';
import Sidebar from './components/sidebar';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import Test from './components/Test';


function App() {
  return (
    <Router>
    <div className="App">
    
        <Switch>
        
        <Route path="/mobilechat" exact>

          <Test />

        </Route> 

        <Route path="/" exact>  
        <div className="app__body">
          <Sidebar />
          <Chatbox />
          </div>  
        </Route>

        </Switch>
      </div>  
    
    </Router>
  );
}

export default App;
