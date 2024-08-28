import logo from './logo.svg';
import './App.css';
import './Header.js';
import './Footer.js';
import './MainBody.js';
import Header from './Header.js';
import MainContent from './MainBody.js';
import Footer from './Footer.js';

function App() {
  return (
    <div>
        <Header />
        <MainContent />
        <Footer />
    </div>
  );
}

export default App;
