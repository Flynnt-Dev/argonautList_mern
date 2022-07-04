import './App.css';
import ArgonautsList from './Components/ArgonautsList/ArgonautsList';

function App() {
  return (
    <div className="App">
      <header>
        <img 
          src="https://www.wildcodeschool.com/assets/logo_main-e4f3f744c8e717f1b7df3858dce55a86c63d4766d5d9a7f454250145f097c2fe.png"
          alt="Wild Code School logo"
        />
        <h1>
          Les Argonautes
        </h1>
      </header>
      <div className='main'>
        <ArgonautsList />
      </div>
      <footer>
        <p>Réalisé par Jason en Anthestérion de l'an 515 avant JC</p>
      </footer>
    </div>
  );
}

export default App;
