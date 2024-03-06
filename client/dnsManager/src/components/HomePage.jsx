import { useContext, useEffect } from "react";
import UserDetailContext from "../context/UserDetailContext";
import DnsRecordContext from "../context/DnsRecordContext";
import Dashboard from "./Dashboard";
import { fetchData } from "../../api";
function Home() {
  const { _, __, setIsloggedIn, userName, ___ } = useContext(UserDetailContext);
  const { recordValue, setRecordValue } = useContext(DnsRecordContext);
  useEffect(() => {
    fetchData()
      .then((res) => {
        const temp = res.data.result.map((val) => {
          return { value: val.value, type: val.type, id: val._id };
        });
        setRecordValue(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <div className="home">Welcome {userName}</div>
      <Dashboard />
    </>
  );
}

export default Home;
