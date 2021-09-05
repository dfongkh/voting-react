import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import AllCampaign from "./pages/AllCampaign";
import Campaign from "./components/Campaign";
import CreateCampaign from "./pages/CreateCampaign";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/allcampaign" exact component={AllCampaign} />
          <Route path="/allcampaign/:id" component={Campaign} />
          <Route path="/createcampaign" component={CreateCampaign} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
