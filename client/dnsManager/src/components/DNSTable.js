import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DnsRecordContext from "../context/DnsRecordContext";
import { deleteData, editData } from "../../api";
const DNSRecordsTable = (props) => {
  const {
    recordValue,
    setRecordValue,
    dnsType,
    setDnsType,
    dnsValue,
    setDnsValue,
  } = useContext(DnsRecordContext);
  const handleEdit = (id) => {
    const temp = recordValue.filter((item) => item.id === id);
    props.setIsAdding(false);
    props.setEditId(id);
    setDnsType(temp[0].type);
    setDnsValue(temp[0].value);
  };
  const handleDelete = (id) => {
    deleteData(id)
      .then(() => {
        const temp = recordValue.filter((obj) => obj.id !== id);
        setRecordValue(temp);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <TableContainer component={Paper} style={{ marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Record Type</TableCell>
            <TableCell>Record Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recordValue.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.value}</TableCell>
              <TableCell
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <IconButton onClick={() => handleEdit(record.id)}>
                  <ModeEditIcon></ModeEditIcon>
                </IconButton>
                <IconButton onClick={() => handleDelete(record.id)}>
                  <DeleteIcon></DeleteIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DNSRecordsTable;