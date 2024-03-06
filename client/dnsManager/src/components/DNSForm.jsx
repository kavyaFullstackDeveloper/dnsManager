import React, { useContext } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { addData, editData } from "../../api";
import DnsRecordContext from "../context/DnsRecordContext";

const DNSForm = (props) => {
  const {
    recordValue,
    setRecordValue,
    dnsType,
    setDnsType,
    dnsValue,
    setDnsValue,
  } = useContext(DnsRecordContext);

  const handleSubmitAdd = () => {
    if (dnsType && dnsValue) {
      const newRecord = { type: dnsType, value: dnsValue };
      const res = addData(newRecord);
      res
        .then((res) => {
          newRecord.id = res.data.id;
          setRecordValue((prevRecordValue) => [...prevRecordValue, newRecord]);
        })
        .catch((err) => console.log(err));
    }
  };
  const handleSubmitEdit = () => {
    const updatedRecord = { type: dnsType, value: dnsValue, id: props.editId };
    const res = editData(updatedRecord);
    res
      .then(() => {
        const temp = recordValue.map((record) =>
          record.id === props.editId ? updatedRecord : record
        );
        setRecordValue(temp);
        setDnsType("");
        setDnsValue("");
      })
      .catch((err) => console.log(err));
    props.setIsAdding(true);
  };

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <FormControl fullWidth>
        <InputLabel id="record-type-label">Record Type</InputLabel>
        <Select
          labelId="record-type-label"
          id="record-type"
          value={dnsType}
          label="Record Type"
          onChange={(e) => setDnsType(e.target.value)}
        >
          <MenuItem value="A">A (Address) Record</MenuItem>
          <MenuItem value="AAAA">AAAA (IPv6 Address) Record</MenuItem>
          <MenuItem value="CNAME">CNAME (Canonical Name) Record</MenuItem>
          <MenuItem value="MX">MX (Mail Exchange) Record </MenuItem>
          <MenuItem value="NS">NS (Name Server) Record</MenuItem>
          <MenuItem value="PTR">PTR (Pointer) Record</MenuItem>
          <MenuItem value="SOA">SOA (Start of Authority) Record</MenuItem>
          <MenuItem value="SRV">SRV (Service) Record</MenuItem>
          <MenuItem value="TXT">TXT (Text) Record</MenuItem>
          <MenuItem value="DNSSEC">DNSSEC</MenuItem>
        </Select>
      </FormControl>
      <TextField
        fullWidth
        label="Record Value"
        variant="outlined"
        margin="normal"
        value={dnsValue}
        onChange={(e) => setDnsValue(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={props.isAdding ? handleSubmitAdd : handleSubmitEdit}
      >
        {props.isAdding ? "Add " : "Edit "}
        DNS Record
      </Button>
    </div>
  );
};

export default DNSForm;