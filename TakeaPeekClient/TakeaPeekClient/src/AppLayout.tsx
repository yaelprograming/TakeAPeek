import { Outlet } from "react-router-dom";
import HomePage from "./pages/homePage/homePage";

const SafeOutlet = Outlet as unknown as React.FC;

export default () => {
  return (
    <>
      <div style={{ marginTop: 25 }}>
        <HomePage />
      </div>
      <SafeOutlet />
    </>
  );
};
