import  { createContext, useState } from "react";
import './css/App.css';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import Switch from 'react-js-switch'
// import { ThemeProvider } from "react-bootstrap";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme((current) => (current === "light" ? "dark" : "light"))
  } 

  return (
    <ThemeContext.Provider value ={{theme,setTheme}} >
      <div className="bg" id={theme}>
          <Switch onChange={toggleTheme} checked={theme === "dark"} />
          <Search />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
