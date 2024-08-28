import './App.css';
import logo from './images/logo.svg';
import IDCard from './code/IDCard';
import Greetings from './code/Greeting';
import Random from './code/Random';

function App() {
  return (
    <div class="main">
      <div class="child">
        <IDCard
          Last_Name='Doe'
          First_Name='John'
          Gender='male'
          Height={178}
          B_Day={new Date("1992-07-14")}
          Picture="https://randomuser.me/api/portraits/men/44.jpg"
        />
        <IDCard
          Last_Name='Delores'
          First_Name='Obrien'
          Gender='female'
          Height={172}
          B_Day={new Date("1988-05-11")}
          Picture="https://randomuser.me/api/portraits/women/44.jpg"
        />
      </div>
      <div class="child">
        <Greetings lang="de">Ludwig</Greetings>
        <Greetings lang="fr">François</Greetings>
        <Greetings lang="en">Peter</Greetings>
      </div>
      <div class="child">
        <Random min={1} max={6}/>
        <Random min={1} max={100}/>
      </div>
    </div>
  );
}

export default App;
