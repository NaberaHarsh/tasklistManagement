import React, { Fragment, useState } from "react";
import ReactTable from "react-table-6";
import "react-table-6/react-table.css";
import { DefaultFilterFunction } from "react-table-6";
import {
  Container,
  Grid,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./viewTask.css";
import { Link } from "react-router-dom";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setDateFormat from "./formatDate";

const caseInsensitiveSearch: DefaultFilterFunction = (filter, row) => {
  const id = filter.pivotId || filter.id;
  return row[id] !== undefined
    ? String(row[id]).toLowerCase().includes(filter.value.toLowerCase())
    : true;
};

interface IProps {
  taskData: { [k: string]: any }[];
  handleDelete: (e: string) => {};
  handleEdit: (e: { [k: string]: any }) => {};
}

const ViewTask: React.FC<IProps> = ({ taskData, handleDelete, handleEdit }) => {
  const [tableData, setTableData] = useState<any>(taskData);
  const [deleteOpen, setDeleteOpen] = useState<any>(null);
  const [startDate, setStartDate] = useState<any>("");
  const [endDate, setEndDate] = useState<any>("");

  const handleClose = () => {
    setDeleteOpen(null);
  };

  const handleDeleteRecord = () => {
    handleDelete(deleteOpen);
    handleClose();
    if (startDate || endDate) {
      handleDeleteFiltered(deleteOpen);
    }
  };

  const handleDeleteFiltered = (id: string) => {
    const val = id;
    let index: any = "";
    const gotData = tableData;
    tableData.map((ele: any, i: number) =>
      ele.taskId === val ? (index = i) : ""
    );
    gotData.splice(index, 1);
    setTableData(gotData);
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setTableData(taskData);
  };

  const handleFilterdata = () => {
    if (startDate && endDate) {
      let filterData: any = [];
      const dateFrom = setDateFormat(startDate);
      const dateTo = setDateFormat(endDate);
      taskData.map((ele: any) => {
        const startDateCheck = setDateFormat(ele.startTime);
        const endDateCheck = setDateFormat(ele.endTime);

        const d1: any = dateFrom.split("/");
        const d2: any = dateTo.split("/");
        const c1: any = startDateCheck.split("/");
        const c2: any = endDateCheck.split("/");
        const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
        const to = new Date(d1[2], parseInt(d2[1]) - 1, d2[0]);
        const check1 = new Date(c1[2], parseInt(c1[1]) - 1, c1[0]);
        const check2 = new Date(c2[2], parseInt(c2[1]) - 1, c2[0]);
        if (check1 >= from && check2 <= to) {
          filterData.push(ele);
        }
        return null;
      });
      setTableData(filterData);
    } else if (startDate) {
      const dateFrom = setDateFormat(startDate);
      let filterData: any = [];
      taskData.map((ele: any) => {
        const startDateCheck = setDateFormat(ele.startTime);
        const d1: any = dateFrom.split("/");
        const c: any = startDateCheck.split("/");
        const from = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
        const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

        if (check >= from) {
          filterData.push(ele);
        }
        return null;
      });
      setTableData(filterData);
    } else if (endDate) {
      const dateTo = setDateFormat(endDate);
      let filterData: any = [];
      taskData.map((ele: any) => {
        const endDateCheck = setDateFormat(ele.endTime);
        const d1: any = dateTo.split("/");
        const c: any = endDateCheck.split("/");
        const to = new Date(d1[2], parseInt(d1[1]) - 1, d1[0]);
        const check = new Date(c[2], parseInt(c[1]) - 1, c[0]);

        if (check <= to) {
          filterData.push(ele);
        }
        return null;
      });
      setTableData(filterData);
    }
  };

  const tableColumns = [
    {
      accessor: "taskName",
      Header: () => (
        <div>
          Task Name <ArrowDropUpIcon /> <ArrowDropDownIcon />{" "}
        </div>
      ),
      Cell: (props: any) => <div className="listingAlign">{props.value}</div>,
      filterable: true,
      sortable: true,
    },
    {
      accessor: "description",
      Header: "Description",
      Cell: (props: any) => (
        <div className="listingAlign" style={{ whiteSpace: "pre-wrap" }}>
          {props.value}
        </div>
      ),
      sortable: false,
    },
    {
      accesssor: "startTime",
      Header: () => <div>Status</div>,
      Cell: (props: any) => {
        const row = props.original;
        const { startTime, endTime } = row;
        const currentTimestamp = new Date().getTime();
        const startTimestamp = new Date(startTime).getTime();
        const endTimestamp = new Date(endTime).getTime();

        if (currentTimestamp < startTimestamp) {
          return <div className="listingAlign">Scheduled</div>;
        } else if (currentTimestamp > endTimestamp) {
          return <div className="listingAlign">Expired</div>;
        } else if (
          currentTimestamp >= startTimestamp &&
          currentTimestamp <= endTimestamp
        ) {
          return <div className="listingAlign">Running</div>;
        }
      },
      sortable: false,
    },
    {
      accessor: "taskId",
      Header: "Action",
      Cell: (props: any) => {
        const row = props.original;
        return (
          <Grid container spacing={0} className="listingAlign">
            <Grid xl={6} lg={6} md={6} sm={6} xs={6} item>
              <Tooltip title="Edit">
                <Link to="/editTask">
                  <EditIcon
                    className="action"
                    onClick={() => handleEdit(row)}
                    style={{ color: "darkcyan" }}
                  />
                </Link>
              </Tooltip>
            </Grid>
            <Grid xl={6} lg={6} md={6} sm={6} xs={6} item>
              <Tooltip title="Delete">
                <DeleteIcon
                  className="action"
                  onClick={() => setDeleteOpen(props.value)}
                  style={{ color: "red" }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        );
      },
      sortable: false,
    },
  ];

  return (
    <Fragment>
      <br />
      <Container maxWidth="lg">
        <Grid container spacing={0}>
          <Grid
            xl={2}
            lg={2}
            md={2}
            sm={12}
            xs={12}
            item
            style={{ padding: "4px" }}
          >
            <DatePicker
              placeholderText="Start Date"
              selected={startDate}
              onChange={(e: any) => setStartDate(e)}
              dateFormat="dd/MM/yyyy"
              customInput={
                <TextField
                  className="width100"
                  variant="outlined"
                  value={startDate}
                  label="Start Date"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              }
            />
          </Grid>
          <Grid
            xl={2}
            lg={2}
            md={2}
            sm={12}
            xs={12}
            item
            style={{ padding: "4px" }}
          >
            <DatePicker
              placeholderText="End Date"
              selected={endDate}
              onChange={(e: any) => setEndDate(e)}
              dateFormat="dd/MM/yyyy"
              customInput={
                <TextField
                  className="width100"
                  variant="outlined"
                  value={endDate}
                  label="End Date"
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
              }
            />
          </Grid>
          <Grid
            xl={1}
            lg={1}
            md={1}
            sm={6}
            xs={6}
            item
            style={{ padding: "4px" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleFilterdata}
            >
              Submit
            </Button>
          </Grid>
          <Grid
            xl={1}
            lg={1}
            md={1}
            sm={6}
            xs={6}
            item
            style={{ padding: "4px" }}
          >
            <Button variant="contained" color="secondary" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
        <br />
        <ReactTable
          data={tableData}
          columns={tableColumns}
          sortable
          showPagination={false}
          pageSize={taskData.length}
          defaultFilterMethod={caseInsensitiveSearch}
        />
      </Container>
      <br />
      <Dialog
        open={typeof deleteOpen === "number"}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogContent>
          Are you sure you want to delete this record ?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleDeleteRecord}
          >
            Yes
          </Button>
          <Button variant="contained" onClick={handleClose}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ViewTask;
