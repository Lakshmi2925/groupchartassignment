import LoginForm from "./components/login/LoginForm";
import GroupList from "./components/Group/GroupList";
import ChatWindow from "./components/chat/ChatWindow";
import { Route, Routes} from 'react-router-dom'



function App() {
  return (
    <>
    
    <Routes>
      <Route exact path="/login" element={<LoginForm/>} />
      <Route exact path="/group" element={<GroupList/>} />
      <Route exact path="/chat" element={<ChatWindow/>} />
      <Route exact path = "/logout" element = {<LoginForm/>}/>
    </Routes>

    </>

  );
}

export default App;
