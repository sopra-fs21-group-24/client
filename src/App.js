import React, {
  Component
} from "react";
import AppRouter from "./components/shared/routers/AppRouter";

/**
 * Happy coding!
 * React Template by Lucas Pelloni
 */
class App extends Component {
  render() {
    return ( 
    <div>
       {/* { props.location.pathname!=='/' ? <Header/>:null} */}
      
      <AppRouter/>
    </div>
    );
  }
}

export default App;