import { useEffect } from "react";
import "./App.css";
import { get } from "aws-amplify/api";

function App() {
  useEffect(() => {
      const fetchApi = async () => {
          try {
              const restOperation = get({
                  apiName: "itemsApi",
                  path: "/items",
              });
              const response = await restOperation.response;
              console.log("GET call succeeded: ", response);
          } catch (e) {
              console.log("GET call failed: ", JSON.parse(e.response.body));
          }
      };
      fetchApi();
  }, []);

  return <div className="App">App</div>;
}

export default App;
