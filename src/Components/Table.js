import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import "./Table/Table.css"

import * as opportunities from "./Table/opportunities.json";

export default function BasicTable() {
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  function handleRowClick(event, row) {
    console.log("row", row);
  }

  return (

    /*  */
    <div>
      <Typography className="scored" variant="h4" component="h2">
    PILYTIX Scored Opportunities
  </Typography>
    <TableContainer sx={{overflowX: "initial"}} component={Paper}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
        <TableHead sx={{ position: "sticky", top: "83.5px" }}>
          <TableRow>
            <TableCell align="left">Opp Name</TableCell>
            <TableCell align="left">Opp Stage</TableCell>
            <TableCell align="right">Rep Probability</TableCell>
            <TableCell align="right">PX Probability</TableCell>
            <TableCell align="left">PX Tier</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="left">Product</TableCell>
            <TableCell align="left">Sales Rep</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              onClick={(event) => handleRowClick(event, row)}
              key={row.oppId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.oppName}
              </TableCell>
              <TableCell align="left">{row.stage}</TableCell>
              <TableCell align="right">{row.repProbability}</TableCell>
              <TableCell align="right">{row.pilytixProbability}</TableCell>
              <TableCell align="left">{row.pilytixTier}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="left">{row.product}</TableCell>
              <TableCell align="left">{row.salesRepName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
