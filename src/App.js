// import { useEffect, useState } from "react";
import "./App.css";
// import { get } from "aws-amplify/api";
import TodoApp from "./components/Items";

function App() {
    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     const fetchApi = async () => {
    //         try {
    //             const restOperation = get({
    //                 apiName: "apif46cadde",
    //                 path: "/items",
    //             });
    //             const response = await restOperation.response;
    //             const json = await response.body.json();
    //             console.log("GET call succeeded: ", json);

    //             setItems(json.data);
    //         } catch (e) {
    //             console.log("GET call failed: ", JSON.parse(e.response.body));
    //         }
    //     };
    //     fetchApi();
    // }, []);

    // console.log("items", items);

    return (
        <div className="App">
            <TodoApp />
        </div>
    );
}

export default App;
