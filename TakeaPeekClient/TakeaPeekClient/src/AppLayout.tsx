import { Outlet } from "react-router-dom";
import Header from "./components/Header";

const SafeOutlet = Outlet as unknown as React.FC;

export default () => {
  return (
    <>  
    <div style={{  direction: "rtl" ,width:"100%",}}> 
    <Header/>
    </div>
      <div style={{ marginTop: 2, direction: "rtl"}}>
      <SafeOutlet/>
      </div>
    </>
  );
};
