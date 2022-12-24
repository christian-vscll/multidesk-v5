import React, { useContext, useEffect } from "react";
import Menu from "../components/Menu";
import "../App.css";
import AppContext from "../context/AppContext";

export default function Home() {
  const { groupCollapse, setGroupCollapse } = useContext(AppContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setGroupCollapse({ ...groupCollapse, groupTitle: false }), []);

  return (
    <div className="home-container">
      <div className="home-containerMobile">
        <Menu />
      </div>
      <div className="home-containerPc">
        <Menu />
        <h1>Home page</h1>
      </div>
    </div>
  );
}
