
import './App.css';

import React from 'react';


function App() {
const Users={
    id: "W012A3CDE",
    real_name: "Egon Spengler",

}


  return (
    <div>
      {/* <button onClick={()=>{this.handleClick()}}>Get All Users</button> */}
      <ul>{Users}</ul>
    </div>
  );
}

export default App;
