import { useState } from "react";
import DnsRecordContext from "../context/DnsRecordContext";
const DnsRecordContextProvider = ({ children }) => {
  const [recordValue, setRecordValue] = useState([]);
  const [dnsType, setDnsType] = useState("");
  const [dnsValue, setDnsValue] = useState("");
  return (
    <DnsRecordContext.Provider
      value={{
        recordValue,
        setRecordValue,
        dnsType,
        setDnsType,
        dnsValue,
        setDnsValue,
      }}
    >
      {children}
    </DnsRecordContext.Provider>
  );
};
export default DnsRecordContextProvider;