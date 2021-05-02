import './App.css';
import Chatbox from './components/chatbox';
import Sidebar from './components/sidebar';
import {BrowserRouter as Router , Switch , Route} from "react-router-dom";
import Test from './components/Test';


function App() {
  return (
    <Router>
    <div className="App">
      <div className="app__body">
        <Switch>
        
        <Route path="/mobilechat" exact>

          <Test />

        </Route> 

        <Route path="/" exact>  
          <Sidebar />
          <Chatbox />
        </Route>
         
        </Switch>
      </div>  
    </div>
    </Router>
  );
}

export default App;
