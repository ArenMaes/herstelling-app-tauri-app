import { Router, Route } from "@solidjs/router";
import { ProjectsPage } from "./pages/Projects";
import SplashScreen from "./components/SplashScreen";

function App() {
    return (
        <Router>
            <Route path="/" component={SplashScreen} />
            <Route path="/projects" component={ProjectsPage} />
        </Router>
    );
}

export default App;
