import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TableSortLabel from "@mui/material/TableSortLabel";
import Popover from "@mui/material/Popover";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Tooltip from "@mui/material/Tooltip";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Scatter } from "react-chartjs-2";
import "./Table/Table.css";

import * as opportunities from "./Table/opportunities.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend
);

export const probOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false
    },
  },
};

export const pxIncreaseOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Probability History",
    },
  },
};

export default function BasicTable() {
  /**
   * A basic table to display all non-nested information from opportunities.json
   */
  const data = opportunities.default;

  function handleRowClick(event, row) {
    setTheRow(row);
    setIncreaseData(row.pilytixFactorsIncreasingWin);
    setDecreaseData(row.pilytixFactorsDecreasingWin);
    setAnchorEl(event.currentTarget);
    probChartData(row);
  }

  function handleNextClick(event, row) {
    if(row.oppId < 10) {
    const newRowId = row.oppId + 1;
    const newRow = data.find(({ oppId }) => oppId === newRowId);
    setTheRow(newRow)
  }
  else{return}
  }

  function handlePreviousClick(event, row) {
    if(row.oppId > 1) {
    const newRowId = row.oppId - 1;
    const newRow = data.find(({ oppId }) => oppId === newRowId);
    setTheRow(newRow)
    }
    else{return}
  }

  const [theRow, setTheRow] = React.useState([]);
  const [increaseData, setIncreaseData] = React.useState([]);
  const [decreaseData, setDecreaseData] = React.useState([]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [rowData, setRowData] = useState(data);
  const [incWeightData, setIncWeightData] = useState();
  const [amountOrderDirection, setAmountOrderDirection] = useState("asc");
  const [pxProbOrderDirection, setPxProbOrderDirection] = useState("asc");
  const [pxTierOrderDirection, setPxTierOrderDirection] = useState("asc");
  const [repProbOrderDirection, setRepProbOrderDirection] = useState("asc");
  const [incWeightValDirection, setIncWeightValDirection] = useState("asc");
  const [decWeightValDirection, setDecWeightValDirection] = useState("asc");
  const [theProbChartData, setProbChartData] = useState([]);

  const sortAmountArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.amount > b.amount ? 1 : b.amount > a.amount ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.amount < b.amount ? 1 : b.amount < a.amount ? -1 : 0
        );
    }
  };

  const handleAmountSortRequest = () => {
    setRowData(sortAmountArray(data, amountOrderDirection));
    setAmountOrderDirection(amountOrderDirection === "asc" ? "desc" : "asc");
  };

  const sortPxProbArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.pilytixProbability > b.pilytixProbability
            ? 1
            : b.pilytixProbability > a.pilytixProbability
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.pilytixProbability < b.pilytixProbability
            ? 1
            : b.pilytixProbability < a.pilytixProbability
            ? -1
            : 0
        );
    }
  };

  const handlePxProbSortRequest = () => {
    setRowData(sortPxProbArray(data, pxProbOrderDirection));
    setPxProbOrderDirection(pxProbOrderDirection === "asc" ? "desc" : "asc");
  };

  const sortPxTierArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.pilytixTier > b.pilytixTier
            ? 1
            : b.pilytixTier > a.pilytixTier
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.pilytixTier < b.pilytixTier
            ? 1
            : b.pilytixTier < a.pilytixTier
            ? -1
            : 0
        );
    }
  };

  const handlePxTierSortRequest = () => {
    setRowData(sortPxTierArray(data, pxTierOrderDirection));
    setPxTierOrderDirection(pxTierOrderDirection === "asc" ? "desc" : "asc");
  };

  const sortRepProbArray = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.repProbability > b.repProbability
            ? 1
            : b.repProbability > a.repProbability
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.repProbability < b.repProbability
            ? 1
            : b.repProbability < a.repProbability
            ? -1
            : 0
        );
    }
  };

  const handleRepProbSortRequest = () => {
    setRowData(sortRepProbArray(data, repProbOrderDirection));
    setRepProbOrderDirection(repProbOrderDirection === "asc" ? "desc" : "asc");
  };

  const sortIncWeightVal = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.weight.value > b.weight.value
            ? 1
            : b.weight.value > a.weight.value
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.weight.value < b.weight.value
            ? 1
            : b.weight.value < a.weight.value
            ? -1
            : 0
        );
    }
  };

  const handleIncWeightValSort = (event) => {
    setIncreaseData(sortIncWeightVal(increaseData, incWeightValDirection));
    setIncWeightValDirection(incWeightValDirection === "asc" ? "desc" : "asc");
  };

  const sortDecWeightVal = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.weight.value > b.weight.value
            ? 1
            : b.weight.value > a.weight.value
            ? -1
            : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.weight.value < b.weight.value
            ? 1
            : b.weight.value < a.weight.value
            ? -1
            : 0
        );
    }
  };

  const handleDecWeightValSort = (event) => {
    setDecreaseData(sortDecWeightVal(decreaseData, decWeightValDirection));
    setDecWeightValDirection(decWeightValDirection === "asc" ? "desc" : "asc");
  };

  let probHistoryData = [];

  const probChartData = (row) => {
    let daysAgo = (row.probabilityHistory || []).map(({ daysAgo }) => daysAgo);
    let pilytixProb = (row.probabilityHistory || []).map(
      ({ pilytixProb }) => pilytixProb
    );
    let repProb = (row.probabilityHistory || []).map(({ repProb }) => repProb);
    daysAgo.sort(function (a, b) {
      return a - b;
    });
    probHistoryData = {
      labels: daysAgo,
      datasets: [
        { label: "PX Probability", data: pilytixProb },
        { label: "Rep Probability", data: repProb },
      ],
    };
    setProbChartData(probHistoryData);
  };

  return (
    /*  */
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 18 }}>
      <Typography className="scored" variant="h4" component="h2">
        PILYTIX Scored Opportunities
      </Typography>
      <TableContainer
        sx={{ borderRadius: "20px", maxHeight: 620 }}
        className="theCard"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ borderTopLeftRadius: "20px" }}
                align="left"
                className="headers"
              > <Typography sx={{padding: 1, width: "60%"}} className="headersText">
                Opp Name
                </Typography>
              </TableCell>
              <TableCell className="headers" align="left">
              <Typography sx={{padding: 1, width: "60%"}} className="headersText">
                Opp Stage
                </Typography>
              </TableCell>
              <TableCell
                align="right"
                onClick={handleRepProbSortRequest}
                className="headers"
              >
                <TableSortLabel active={true} direction={repProbOrderDirection}>
                <Typography sx={{padding: 1}} className="headersText">
                  Rep Probability
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                onClick={handlePxProbSortRequest}
                className="headers"
              >
                <TableSortLabel active={true} direction={pxProbOrderDirection}>
                <Typography sx={{padding: 1}} className="headersText">
                  PX Probability
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="left"
                onClick={handlePxTierSortRequest}
                className="headers"
              >
                <TableSortLabel active={true} direction={pxTierOrderDirection}>
                <Typography sx={{padding: 1}} className="headersText">
                  PX Tier
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                onClick={handleAmountSortRequest}
                className="headers"
              >
                <TableSortLabel active={true} direction={amountOrderDirection}>
                <Typography sx={{padding: 1}} className="headersText">
                  Amount
                  </Typography>
                </TableSortLabel>
              </TableCell>
              <TableCell align="left" className="headers">
              <Typography sx={{padding: 1}} className="headersText">
                Product
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  borderTopRightRadius: "20px",
                }}
                align="left"
                className="headers"
              >
                <Typography sx={{padding: 1}} className="headersText">
                Sales Rep
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ borderBottomLeftRadius: "20px" }}>
            {rowData.map((row) => (
                <TableRow
                  onClick={(event) => handleRowClick(event, row)}
                  key={row.oppId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    ":hover": { backgroundColor: "#2ecdb0" },
                    "&:last-child th": { borderBottomLeftRadius: "20px" },
                    "&tr td": { fontSize: "14px" }
                  }}
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
                  <TableCell style={{ color: "black" }} align="left">
                    {row.salesRepName}
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={theRow.oppId}
        key={theRow.oppId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference={"none"}
        BackdropProps={{
          style: {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Card className="backCard">
          <CardContent className="theCard">
            <h3 style={{ textAlign: "center", margin: 0 }}>{theRow.oppName}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                alignItems: "center",
                maxWidth: 1260
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column"
                }}
              >
                {theRow.probabilityHistory ? (
                  <div
                    style={{ height: "320px", width: "550px", background: "rgba(255, 255, 255, .0)", marginRight: 10, marginBottom: 10 }}
                  >
                    <h4 style={{ textAlign: "center" }}>
                      Probability History
                    </h4>
                    <div
                    className="chart"
                    style={{ height: "280px", width: "550px" }}
                  >
                    <Line
                      height="280px"
                      width="550px"
                      options={probOptions}
                      data={theProbChartData}
                    />
                    </div>
                  </div>
                ) : (
                  <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                    No Probability Chart Data
                  </h4>
                )}
                {theRow.pilytixFactorsDecreasingWin ? (
                  <div style={{marginTop: 10, marginRight: 10}}>
                    <h4 style={{ textAlign: "center" }}>
                      PX Factors Decreasing Win
                    </h4>
                    <TableContainer
                       sx={{ borderRadius: "20px", maxHeight: 260 }}
                       className="popCard"
                    >
                      <Table
                        size="small"
                        style={{ maxWidth: "540px" }}
                        stickyHeader
                        aria-label="sticky table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell
                              sx={{
                                backgroundColor: "#3abaff",
                                borderTopLeftRadius: "20px",
                                width: "12%",
                              }}
                              align="left"
                              className="headers"
                              >
                                <Typography sx={{padding: 1}} className="headersText">
                              Name
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#3abaff", width: "38%" }}
                              align="left"
                              className="headers"
                              >
                              <Typography sx={{padding: 1}} className="headersText">
                              Message
                              </Typography>
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#3abaff", width: "8%" }}
                              align="left"
                              onClick={handleDecWeightValSort}
                              className="headers"
                            >
                              <TableSortLabel
                                active={true}
                                direction={decWeightValDirection}
                                >
                                <Typography sx={{padding: 1}} className="headersText">
                                Weight Value
                                </Typography>
                              </TableSortLabel>
                            </TableCell>
                            <TableCell
                              sx={{
                                backgroundColor: "#3abaff",
                                borderTopRightRadius: "20px",
                                width: "12%",
                              }}
                              align="left"
                              className="headers"
                            >
                              <Typography sx={{padding: 1}} className="headersText">
                              Weight Description
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {(theRow.pilytixFactorsDecreasingWin || []).map(
                            (row, i) => (
                              <TableRow
                                key={i}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell sx={{ height: "8%" }}>
                                  {row.name}
                                </TableCell>
                                <TableCell sx={{ height: "8%" }}>
                                  {row.message}
                                </TableCell>
                                <TableCell sx={{ height: "8%" }}>
                                  {row.weight.value}
                                </TableCell>
                                <TableCell sx={{ height: "8%" }}>
                                  {row.weight.description}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                ) : (
                  <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                    No PX Factors Decreasing Win
                  </h4>
                )}
              </div>
              {theRow.pilytixFactorsIncreasingWin ? (
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    PX Factors Increasing Win
                  </h4>
                  <TableContainer
                    sx={{ borderRadius: "20px", maxHeight: 300 }}
                    className="popCard"
                  >
                    <Table
                      size="small"
                      style={{ maxWidth: "550px" }}
                      stickyHeader
                      aria-label="sticky table"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell
                            sx={{
                              backgroundColor: "#3abaff",
                              borderTopLeftRadius: "20px",
                              width: "12%",
                            }}
                            align="left"
                            className="headers"
                            >
                              <Typography sx={{padding: 1}} className="headersText">
                            Name
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#3abaff", width: "38%" }}
                            align="left"
                            className="headers"
                            >
                              <Typography sx={{padding: 1}} className="headersText">
                            Message
                            </Typography>
                          </TableCell>
                          <TableCell
                            sx={{ backgroundColor: "#3abaff", width: "8%" }}
                            align="left"
                            onClick={handleIncWeightValSort}
                            className="headers"
                          >
                            <TableSortLabel
                              active={true}
                              direction={incWeightValDirection}
                            >
                              <Typography sx={{padding: 1}} className="headersText">
                              Weight Value
                              </Typography>
                            </TableSortLabel>
                          </TableCell>
                          <TableCell
                            sx={{
                              backgroundColor: "#3abaff",
                              borderTopRightRadius: "20px",
                              width: "12%",
                            }}
                            align="left"
                            className="headers"
                            >
                              <Typography sx={{padding: 1}} className="headersText">
                            Weight Description
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {(theRow.pilytixFactorsIncreasingWin || []).map(
                          (row, i) => (
                            <TableRow
                              key={i}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell sx={{ height: "10%" }}>
                                {row.name}
                              </TableCell>
                              <TableCell sx={{ height: "10%" }}>
                                {row.message}
                              </TableCell>
                              <TableCell sx={{ height: "10%" }}>
                                {row.weight.value}
                              </TableCell>
                              <TableCell sx={{ height: "10%" }}>
                                {row.weight.description}
                              </TableCell>
                            </TableRow>
                          )
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ) : (
                <h4 style={{ textAlign: "center", marginTop: "40px" }}>
                  No PX Factors Increasing Win
                </h4>
              )}
            </div>
            <div style={{marginTop: 20, marginBottom: 26}}>
          <Button sx={{marginRight: 5}} className="nextButtons" onClick={(event) => handlePreviousClick(event, theRow)}><ArrowBackIosNewIcon fontSize="small"></ArrowBackIosNewIcon>Previous</Button>
          <Button className="nextButtons" onClick={(event) => handleNextClick(event, theRow)}>Next<ArrowForwardIosIcon fontSize="small"></ArrowForwardIosIcon></Button>
        </div>
          </CardContent>
        </Card>
      </Popover>
    </div>
  );
}
