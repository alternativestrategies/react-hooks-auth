import React, {useState, useEffect} from 'react';
import axios from 'axios';

//view function
function View (props) {
  const {screen, setScreen} = props;

  const [data, setDate] = useState();

    //delete sessions
    const deleteSessions = async () => {
      try{
        await axios.get('/users/logout');
        setScreen('auth');
      }catch(e) {
        console.log(e);
      }
    }

    return(
      <div>
        <p>{screen}</p>
        <p>{data}</p>
        <button onClick={deleteSessions}>Logout</button>
      </div>
    )
}

function App() {
  const [screen, setScreen] = useState('auth');
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  //authentication 
  const auth = async () => {
    try{
      const user = {
        username, password
      }
      const res = await axios.post('/users/login', user)
      if(res.data.session !== undefined){
        setScreen('')
      }
    } catch(e){
      console.log(e)
    }
  }

  //persistant data
  const getUser = async() => {
    try {
      const res = await axios.get('/users/sessions')
      if(res.data.session !== undefined){
        setScreen('')
      } else {
        setScreen('auth')
      }
    }
    catch(e){
      console.log(e);
    }
  }
 
  useEffect(() =>{
    getUser()
  }, [])

  return (
    <div className="App">
      {screen === 'auth'
        ? <div>
            <label>Username: </label>
            <br/>
            <input type="text" onChange={e => setUsername(e.target.value)} />
            <br/>
            <label>Password: </label>
            <br/>
            <input type="password" onChange={e => setPassword(e.target.value)} />
            <br/>
            <button onClick={auth}>Login</button>
          </div>
        : <View screen={screen} setScreen={setScreen} />
      }
      
    </div>
  );
}

export default App;
