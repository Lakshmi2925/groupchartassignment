import LoginForm from "./components/login/LoginForm";
import { Route, BrowserRouter as Routes } from 'react-router-dom'
import GroupList from "./components/Group/GroupList";
import ChatWindow from "./components/chat/ChatWindow";


function App() {
  return (
    <div>
      <h1>Welcome</h1>
      <LoginForm/>
      <GroupList/>
      <ChatWindow/>
    {/* <Routes>
      <Route exact path="/login" component={LoginForm} />
    </Routes> */}
    </div>
  );
}

export default App;
