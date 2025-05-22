import { Outlet } from "react-router-dom"
import HomePage from "./pages/homePage/homePage"


export default()=>{
    return (<>
        <div style={{ marginTop: 25 }}>
            <HomePage></HomePage>
        </div>
        <Outlet/>
    </>)
} 

