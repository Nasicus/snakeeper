import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "./firebase.ts";
import { AuthenticationButtons } from "./authenticationButtons.tsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={handleClick}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <AuthenticationButtons />
    </>
  );

  async function handleClick() {
    setCount((count) => count + 1);
    try {
      const querySnapshot = await getDocs(collection(firestoreDb, "animals"));

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id}`, doc.data());
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

export default App;
