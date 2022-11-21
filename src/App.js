
import {redirect} from 'react-router-dom';
import HomeScreen from './screens/homeScreen';
import LoginScreen from './screens/loginScreen';
import {BrowserRouter as Router ,Routes,Route} from 'react-router-dom'
import CandidateDetailsScreen from './screens/candidateDetails';
import FormScreen from './screens/formScreen'
function App() {
  
  
  

  return (
    
    <div className="App">
      <Router>
        <Routes >
        <Route path="/" excact element={<LoginScreen/>}/>
        <Route path="/home" exact element={<HomeScreen/>}/>
        <Route path="/candidate/:id" exact element={<CandidateDetailsScreen/>}/>
        <Route path="/candidate/new" exact element={<FormScreen/>}/>
        </Routes>
    </Router>
     
    </div>
  );
}

export default App;
