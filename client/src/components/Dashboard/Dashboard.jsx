import React from "react";
import useAuth from "../../hooks/useAuth";

function Dashboard({ code }) {
  const accessToken = useAuth(code);
  return <div>{accessToken}</div>;
}

export default Dashboard;
