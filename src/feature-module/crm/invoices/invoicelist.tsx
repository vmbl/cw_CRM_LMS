import React, { useState } from "react";
import Table from "../../../core/common/dataTable/index";
import { invoiceList } from "../../../core/data/json/invoicelist";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import DateRangePicker from "react-bootstrap-daterangepicker";
import {
  activeList,
  clientList,
  currencyselect,
  initialSettings,
  newselectOption,
} from "../../../core/common/selectoption/selectoption";
import CollapseHeader from "../../../core/common/collapse-header";
import { useDispatch, useSelector } from "react-redux";
import { setActivityTogglePopup } from "../../../core/data/redux/commonSlice";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { all_routes } from "../../router/all_routes";

const InvoiceList = () => {
  const route = all_routes;
  const handleDateChange1 = (date: Date | null) => {
    setSelectedDate1(date);
  };
  const handleStarToggle = (index: number) => {
    setStars((prevStars) => ({
      ...prevStars,
      [index]: !prevStars[index],
    }));
  };
  const [stars, setStars] = useState<{ [key: number]: boolean }>({});

  const initializeStarsState = () => {
    const starsState: { [key: number]: boolean } = {};
    invoiceList.forEach((item, index) => {
      starsState[index] = false;
    });
    setStars(starsState);
  };

  React.useEffect(() => {
    initializeStarsState();
  }, []);
  const [selectedDate1, setSelectedDate1] = useState<Date | null>(new Date());
  const dispatch = useDispatch();
  const toggleEditInvoice = () => {
    setEditInvoice(!editInvoice);
  };
  const data = invoiceList;
  const [editInvoice, setEditInvoice] = useState(false);
  const columns = [
    {
      title: "",
      dataIndex: "",
      render: (text: string, record: any, index: number) => (
        <div
          className={`set-star rating-select ${stars[index] ? "filled" : ""}`}
          onClick={() => handleStarToggle(index)}
        >
          <i className="fa fa-star"></i>
        </div>
      ),
    },
    {
      title: "InvoiceID",
      dataIndex: "invoiceId",
      key: "invoiceId",
      sorter: true,
    },
    {
      title: "Client",
      dataIndex: "client",
      key: "client",
      sorter: true,
      render: (text: any, record: any) => (
        <h2 className="table-avatar d-flex align-items-center">
          <Link
            to={route.companyDetails}
            className="avatar avatar-sm border me-2"
          >
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.img}
              alt="User Image"
            />
          </Link>
          <Link
            to={route.companyDetails}
            className="profile-split d-flex flex-column"
          >
            {record.client}
          </Link>
        </h2>
      ),
    },

    {
      title: "Project",
      dataIndex: "project",
      key: "project",
      sorter: true,
      render: (text: any, record: any) => (
        <h2 className="table-avatar d-flex align-items-center">
          <Link to="#" className="avatar avatar-sm border me-2">
            <ImageWithBasePath
              className="w-auto h-auto"
              src={record.img1}
              alt="User Image"
            />
          </Link>
          <Link to="#" className="profile-split d-flex flex-column">
            {record.project}
          </Link>
        </h2>
      ),
    },
    {
      title: "DueDate",
      dataIndex: "dueDate",
      key: "dueDate",
      sorter: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: true,
    },

    {
      title: "PaidAmount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      sorter: true,
    },
    {
      title: "BalanceAmount",
      dataIndex: "balanceAmount",
      key: "balanceAmount",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <div className="dropdown table-action">
          <Link
            to="#"
            className="action-icon "
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvas_edit"
            >
              <i className="ti ti-edit text-blue"></i> Edit
            </Link>
            <Link
              className="dropdown-item"
              to="#"
              data-bs-toggle="modal"
              data-bs-target="#delete_invoices"
            >
              <i className="ti ti-trash text-danger" />
              Delete
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-clipboard-copy text-violet" /> View Invoice
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-checks text-green" /> Mark as Accpeted
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-file" /> Mark as Draft
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-sticker text-blue" /> Mark as Declined
            </Link>
            <Link className="dropdown-item" to="#">
              <i className="ti ti-printer text-info" /> Print
            </Link>
          </div>
        </div>
      ),
    },
  ];
  const activityToggle = useSelector(
    (state: any) => state?.activityTogglePopup
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const currency = [
    { value: "Choose", label: "Choose" },
    { value: "Dollar", label: "Dollar" },
    { value: "Euro", label: "Euro" },
    { value: "Pound", label: "Pound" },
    { value: "Rupee", label: "Rupee" },
  ];
  return (
    <div>
      <>
        {/* Page Wrapper */}
        <div className="page-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                {/* Page Header */}
                <div className="page-header">
                  <div className="row align-items-center">
                    <div className="col-4">
                      <h4 className="page-title">
                        Invoices<span className="count-title">123</span>
                      </h4>
                    </div>
                    <div className="col-8 text-end">
                      <div className="head-icons">
                        <CollapseHeader />
                      </div>
                    </div>
                  </div>
                </div>
                {/* /Page Header */}
                <div className="card">
                  <div className="card-header">
                    {/* Search */}
                    <div className="row align-items-center">
                      <div className="col-sm-4">
                        <div className="icon-form mb-3 mb-sm-0">
                          <span className="form-icon">
                            <i className="ti ti-search" />
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Search Invoices"
                          />
                        </div>
                      </div>
                      <div className="col-sm-8">
                        <div className="d-flex align-items-center flex-wrap row-gap-2 justify-content-sm-end">
                          <div className="dropdown me-2">
                            <Link
                              to="#"
                              className="dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              <i className="ti ti-package-export me-2" />
                              Export
                            </Link>
                            <div className="dropdown-menu  dropdown-menu-end">
                              <ul>
                                <li>
                                  <Link to="#" className="dropdown-item">
                                    <i className="ti ti-file-type-pdf text-danger me-1" />
                                    Export as PDF
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#" className="dropdown-item">
                                    <i className="ti ti-file-type-xls text-green me-1" />
                                    Export as Excel{" "}
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <Link
                            to="#"
                            className="btn btn-primary"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvas_add"
                          >
                            <i className="ti ti-square-rounded-plus me-2" />
                            Add New Invoices
                          </Link>
                        </div>
                      </div>
                    </div>
                    {/* /Search */}
                  </div>

                  <div className="card-body">
                    <>
                      {/* Filter */}
                      <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-4">
                        <div className="d-flex align-items-center flex-wrap row-gap-2">
                          <div className="sort-dropdown drop-down task-drops me-3">
                            <Link
                              to="#"
                              className="dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              All Invoices{" "}
                            </Link>
                            <div className="dropdown-menu  dropdown-menu-start">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <i className="ti ti-dots-vertical" />
                                    All Invoices
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="ti ti-dots-vertical" />
                                    Paid
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="ti ti-dots-vertical" />
                                    Partially Paid
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="ti ti-dots-vertical" />
                                    Overdue
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="ti ti-dots-vertical" />
                                    Unpaid
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="dropdown me-2">
                            <Link
                              to="#"
                              className="dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              <i className="ti ti-sort-ascending-2 me-2" />
                              Sort{" "}
                            </Link>
                            <div className="dropdown-menu  dropdown-menu-start">
                              <ul>
                                <li>
                                  <Link to="#" className="dropdown-item">
                                    <i className="ti ti-circle-chevron-right me-1" />
                                    Ascending
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#" className="dropdown-item">
                                    <i className="ti ti-circle-chevron-right me-1" />
                                    Descending
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#" className="dropdown-item">
                                    <i className="ti ti-circle-chevron-right me-1" />
                                    Recently Viewed
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#" className="dropdown-item">
                                    <i className="ti ti-circle-chevron-right me-1" />
                                    Recently Added
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="icon-form">
                            <span className="form-icon">
                              <i className="ti ti-calendar" />
                            </span>
                            <DateRangePicker initialSettings={initialSettings}>
                              <input
                                className="form-control bookingrange"
                                type="text"
                              />
                            </DateRangePicker>
                          </div>
                        </div>
                        <div className="d-flex align-items-center flex-wrap row-gap-2">
                          <div className="dropdown me-2">
                            <Link
                              to="#"
                              className="btn bg-soft-purple text-purple"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="outside"
                            >
                              <i className="ti ti-columns-3 me-2" />
                              Manage Columns
                            </Link>
                            <div className="dropdown-menu  dropdown-menu-md-end dropdown-md p-3">
                              <h4 className="mb-2 fw-semibold">
                                Want to manage datatables?
                              </h4>
                              <p className="mb-3">
                                Please drag and drop your column to reorder your
                                table and enable see option as you want.
                              </p>
                              <div className="border-top pt-3">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Estimations ID
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-name"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-name"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Client
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-phone"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-phone"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Project
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-email"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-email"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Due Date
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-tag"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-tag"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Amount
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-loc"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-loc"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Paid Amount
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-rate"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-rate"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Balance Amount
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-owner"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-owner"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Status
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-status"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-status"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <p className="mb-0 d-flex align-items-center">
                                    <i className="ti ti-grip-vertical me-2" />
                                    Action
                                  </p>
                                  <div className="status-toggle">
                                    <input
                                      type="checkbox"
                                      id="col-action"
                                      className="check"
                                    />
                                    <label
                                      htmlFor="col-action"
                                      className="checktoggle"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="form-sorts dropdown me-2">
                            <Link
                              to="#"
                              data-bs-toggle="dropdown"
                              data-bs-auto-close="outside"
                            >
                              <i className="ti ti-filter-share" />
                              Filter
                            </Link>
                            <div className="filter-dropdown-menu dropdown-menu  dropdown-menu-md-end p-4">
                              <div className="filter-set-view">
                                <div className="filter-set-head">
                                  <h4>
                                    <i className="ti ti-filter-share" />
                                    Filter
                                  </h4>
                                </div>
                                <div
                                  className="accordion"
                                  id="accordionExample"
                                >
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link
                                        to="#"
                                        className="collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#owner"
                                        aria-expanded="false"
                                        aria-controls="owner"
                                      >
                                        Client
                                      </Link>
                                    </div>
                                    <div
                                      className="filter-set-contents accordion-collapse collapse"
                                      id="owner"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="filter-content-list">
                                        <div className="mb-2 icon-form">
                                          <span className="form-icon">
                                            <i className="ti ti-search" />
                                          </span>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Client"
                                          />
                                        </div>
                                        <ul>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input
                                                  type="checkbox"
                                                  defaultChecked
                                                />
                                                <span className="checkmarks" />
                                                NovaWave LLC
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Redwood Inc
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                HarborVie w
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                CoastalStar Co.
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                RiverStone Ventur
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link
                                        to="#"
                                        className="collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="false"
                                        aria-controls="collapseThree"
                                      >
                                        Project
                                      </Link>
                                    </div>
                                    <div
                                      className="filter-set-contents accordion-collapse collapse"
                                      id="collapseThree"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="filter-content-list">
                                        <ul>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input
                                                  type="checkbox"
                                                  defaultChecked
                                                />
                                                <span className="checkmarks" />
                                                Truelysell
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Dreamsports
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Best@laundry
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                Doccure
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="filter-set-content">
                                    <div className="filter-set-content-head">
                                      <Link
                                        to="#"
                                        className="collapsed"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapsethree"
                                        aria-expanded="false"
                                        aria-controls="collapsethree"
                                      >
                                        Amount
                                      </Link>
                                    </div>
                                    <div
                                      className="filter-set-contents accordion-collapse collapse"
                                      id="collapsethree"
                                      data-bs-parent="#accordionExample"
                                    >
                                      <div className="filter-content-list">
                                        <div className="mb-2 icon-form">
                                          <span className="form-icon">
                                            <i className="ti ti-search" />
                                          </span>
                                          <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search Amount"
                                          />
                                        </div>
                                        <ul>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input
                                                  type="checkbox"
                                                  defaultChecked
                                                />
                                                <span className="checkmarks" />
                                                $2,15,000
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $1,45,000
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $2,15,000
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $4,80,380
                                              </label>
                                            </div>
                                          </li>
                                          <li>
                                            <div className="filter-checks">
                                              <label className="checkboxs">
                                                <input type="checkbox" />
                                                <span className="checkmarks" />
                                                $2,12,000
                                              </label>
                                            </div>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="filter-reset-btns">
                                  <div className="row">
                                    <div className="col-6">
                                      <Link to="#" className="btn btn-light">
                                        Reset
                                      </Link>
                                    </div>
                                    <div className="col-6">
                                      <Link
                                        to="#"
                                        className="btn btn-primary"
                                      >
                                        Filter
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="view-icons">
                            <Link to="#" className="active">
                              <i className="ti ti-list-tree" />
                            </Link>
                            <Link to={route.InvoiceGrid}>
                              <i className="ti ti-grid-dots" />
                            </Link>
                          </div>
                        </div>
                      </div>
                      {/* /Filter */}
                    </>

                    {/* Projects List */}
                    <div className="table-responsive custom-table">
                      <Table dataSource={data} columns={columns} />
                    </div>
                    <div className="row align-items-center">
                      <div className="col-md-6">
                        <div className="datatable-length" />
                      </div>
                      <div className="col-md-6">
                        <div className="datatable-paginate" />
                      </div>
                    </div>
                    {/* /Projects List */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Page Wrapper */}
      </>
      <>
        {/* Add New Invoices */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_add"
        >
          <div className="offcanvas-header border-bottom">
            <h4>Add New Invoice</h4>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="offcanvas-body">
            <form>
              <div>
                <div className="row">
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Client</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#add_deal"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={clientList}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Bill To<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Ship To<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Project</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#add_deal"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={newselectOption}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Amount<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Currency</label>
                      <Select
                        className="select"
                        options={currency}
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Invoice Date <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Due Date<span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate}
                          onChange={handleDateChange}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Payment Method</label>
                      <Select
                        className="select"
                        options={activeList}
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Status</label>
                      <Select
                        className="select"
                        options={activeList}
                        placeholder="Choose"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Description <span className="text-danger">*</span>
                      </label>
                      <div className="summernote" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Project</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#add_deal"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      className="select"
                      options={clientList}
                      placeholder="Choose"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="table-responsive">
                    <table className="table table-view">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="input-table input-table-descripition">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <select>
                                <option>%</option>
                                <option>5%</option>
                              </select>
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <Link to="#" className="btn btn-success-light">
                              <i className="ti ti-check" />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="subtotal-div mb-3">
                    <ul className="mb-3">
                      <li>
                        <h5>Subtotal</h5>
                        <h6>$0.00</h6>
                      </li>
                      <li>
                        <h5>Discount 2%</h5>
                        <h6>$0.00</h6>
                      </li>
                      <li>
                        <h5>Extra Discount 0%</h5>
                        <h6>$0.00</h6>
                      </li>
                      <li>
                        <h5>Tax</h5>
                        <h6>$0.00</h6>
                      </li>
                      <li>
                        <h5>Total</h5>
                        <h6>$0.00</h6>
                      </li>
                    </ul>
                    <div className="row">
                      <div className="mb-3">
                        <label className="col-form-label">Signature Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-3">
                        <label className="col-form-label">
                          Signature Image
                        </label>
                        <div className="upload-signature">
                          <input type="file" />
                          <Link to="#">Upload Signature</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Notes<span className="text-danger"> *</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Terms &amp; Conditions
                        <span className="text-danger"> *</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  className="btn btn-light me-2"
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Add New Invoices */}
        {/* Edit Invoices */}
        <div
          className="offcanvas offcanvas-end offcanvas-large"
          tabIndex={-1}
          id="offcanvas_edit"
        >
          <div className="offcanvas-header border-bottom">
            <h4>Edit Invoice</h4>
            <button
              type="button"
              className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <div className="offcanvas-body">
            <form>
              <div>
                <div className="row">
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Client</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#add_deal"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      options={clientList}
                      className="select"
                      placeholder="NovaWave LLC"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Bill To<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Ship To<span className="text-danger"> *</span>
                      </label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Project</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#add_deal"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      options={newselectOption}
                      className="select"
                      placeholder="Truelysell"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Amount<span className="text-danger"> *</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        defaultValue="2,15,000"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Currency</label>
                      <Select
                        options={currency}
                        className="select"
                        placeholder="$"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Invoice Date <span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <input
                          type="text"
                          className="form-control datetimepicker"
                          defaultValue="15 Oct 2023"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Due Date<span className="text-danger">*</span>
                      </label>
                      <div className="icon-form">
                        <span className="form-icon">
                          <i className="ti ti-calendar-check" />
                        </span>
                        <DatePicker
                          className="form-control datetimepicker"
                          selected={selectedDate1}
                          onChange={handleDateChange1}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Payment Method</label>
                      <Select
                        options={activeList}
                        className="select"
                        placeholder="$"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label className="col-form-label">Status</label>
                      <Select
                        options={activeList}
                        className="select"
                        placeholder="$"
                        classNamePrefix="react-select"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Description <span className="text-danger">*</span>
                      </label>
                      <div className="summernote" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="d-flex align-items-center justify-content-between">
                      <label className="col-form-label">Project</label>
                      <Link
                        to="#"
                        className="label-add"
                        data-bs-toggle="modal"
                        data-bs-target="#add_deal"
                      >
                        <i className="ti ti-square-rounded-plus" />
                        Add New
                      </Link>
                    </div>
                    <Select
                      options={clientList}
                      className="select"
                      placeholder="$"
                      classNamePrefix="react-select"
                    />
                  </div>
                  <div className="table-responsive">
                    <table className="table table-view">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="input-table input-table-descripition">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <select>
                                <option>%</option>
                                <option>5%</option>
                              </select>
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" />
                            </div>
                          </td>
                          <td>
                            <Link to="#" className="btn btn-success-light">
                              <i className="ti ti-check" />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-view">
                      <thead>
                        <tr>
                          <th>Item</th>
                          <th>Quantity</th>
                          <th>Price</th>
                          <th>Discount</th>
                          <th>Amount</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="input-table input-table-descripition">
                              <input type="text" defaultValue="Web Design" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" defaultValue={1} />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" defaultValue="$200" />
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <select>
                                <option>2%</option>
                                <option>5%</option>
                              </select>
                            </div>
                          </td>
                          <td>
                            <div className="input-table">
                              <input type="text" defaultValue="$196" />
                            </div>
                          </td>
                          <td>
                            <Link to="#" className="btn btn-danger-light">
                              <i className="ti ti-x" />
                            </Link>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="subtotal-div mb-3">
                    <ul className="mb-3">
                      <li>
                        <h5>Subtotal</h5>
                        <h6>$196.00</h6>
                      </li>
                      <li>
                        <h5>Discount 2%</h5>
                        <h6>$4.00</h6>
                      </li>
                      <li>
                        <h5>Extra Discount 0%</h5>
                        <h6>$0.00</h6>
                      </li>
                      <li>
                        <h5>Tax</h5>
                        <h6>$0.00</h6>
                      </li>
                      <li>
                        <h5>Total</h5>
                        <h6>$192.00</h6>
                      </li>
                    </ul>
                    <div className="row">
                      <div className="mb-3">
                        <label className="col-form-label">Signature Name</label>
                        <input type="text" className="form-control" />
                      </div>
                      <div className="mb-0">
                        <label className="col-form-label">
                          Signature Image
                        </label>
                        <div className="upload-signature ">
                          <input type="file" />
                          <Link to="#" className="text-start">
                            <img src="assets/img/signature.png" alt="img" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Notes<span className="text-danger"> *</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="mb-3">
                      <label className="col-form-label">
                        Terms &amp; Conditions
                        <span className="text-danger"> *</span>
                      </label>
                      <textarea
                        className="form-control"
                        rows={5}
                        defaultValue={""}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-end">
                <button
                  type="button"
                  data-bs-dismiss="offcanvas"
                  className="btn btn-light me-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#create_success"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
        {/* /Edit Invoices */}
        {/* Delete Invoices */}
        <div className="modal fade" id="delete_invoices" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body">
                <div className="text-center">
                  <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
                    <i className="ti ti-trash-x fs-36 text-danger" />
                  </div>
                  <h4 className="mb-2">Remove Invoice?</h4>
                  <p className="mb-0">
                    Are you sure you want to remove <br /> invoice you selected.
                  </p>
                  <div className="d-flex align-items-center justify-content-center mt-4">
                    <Link
                      to="#"
                      className="btn btn-light me-2"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <Link to="#" className="btn btn-danger">
                      Yes, Delete it
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* /Delete Invoices */}
        {/* Add New View */}
        <div className="modal custom-modal fade" id="add_deal" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add</h5>
                <button
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body">
                <form action="#">
                  <div className="mb-3">
                    <label className="col-form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Name"
                    />
                  </div>
                  <div className="modal-btn text-end">
                    <Link
                      to="#"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </Link>
                    <button type="button"  data-bs-dismiss="modal" className="btn btn-danger">
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* /Add New View */}
      </>
    </div>
  );
};

export default InvoiceList;
