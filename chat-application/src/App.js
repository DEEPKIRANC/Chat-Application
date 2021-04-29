import './App.css';
import Chatbox from './components/chatbox';
import Sidebar from './components/sidebar';


function App() {
  return (
    <div className="App">
      <div className="app__body">
        <Sidebar />
        <Chatbox />
      </div>  
    </div>
  );
}

export default App;
