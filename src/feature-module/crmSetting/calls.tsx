import React from 'react'
import Table from "../../core/common/dataTable/index";
import { callsData } from '../../core/data/json/calls';
import { Link } from "react-router-dom";
import { all_routes } from '../router/all_routes';
import { TableData } from '../../core/data/interface';
import CollapseHeader from '../../core/common/collapse-header';
const route = all_routes;

const Calls = () => {
  const dataSource = callsData;

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
       sorter: (a: TableData, b: TableData) =>
        a.title.length - b.title.length,
      key: 'title',
      width: '182px',
    },
    {
      title: 'Created at',
      dataIndex: 'createdAt',
       sorter: (a: TableData, b: TableData) =>
        a.createdAt.length - b.createdAt.length,
      key: 'createdAt',
      width: '258px',
    },
    {
      title: "Status",
      dataIndex: "status",
       sorter: (a: TableData, b: TableData) =>
        a.status.length - b.status.length,
      key: "status",
      width: "109px",
      render: (status: any) => (
        <span
          className={`${
            status == "Active"
              ? "badge badge-pill badge-status bg-success"
              : status == "Inactive"
              ? "badge badge-pill badge-status bg-danger"
              : ""
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '101px',
      render: () => (
        <div className="dropdown table-action">
          <Link to="#" className="action-icon" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa fa-ellipsis-v" />
          </Link>
          <div className="dropdown-menu dropdown-menu-right">
            <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#edit_calls">
              <i className="ti ti-edit text-blue" /> Edit
            </Link>
            <Link className="dropdown-item" to="#" data-bs-toggle="modal" data-bs-target="#delete_calls">
              <i className="ti ti-trash text-danger" /> Delete
            </Link>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <>
  {/* Page Wrapper */}
  <div className="page-wrapper">
    <div className="content">
      <div className="row">
        <div className="col-md-12">
          {/* Page Header */}
          <div className="page-header">
            <div className="row align-items-center">
              <div className="col-sm-8">
                <h4 className="page-title">
                  Calls Reason <span className="count-title">123</span>
                </h4>
              </div>
              <div className="col-sm-4 text-sm-end">
                <div className="head-icons">
                 <CollapseHeader/>
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
                      placeholder="Search Call Reason"
                    />
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="text-sm-end">
                    <Link
                      to="#"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#add_calls"
                    >
                      <i className="ti ti-square-rounded-plus me-2" />
                      Add New Call Reason
                    </Link>
                  </div>
                </div>
              </div>
              {/* /Search */}
            </div>
            <div className="card-body">
              {/* Calls List */}
              <div className="table-responsive custom-table">
              <Table columns={columns} dataSource={dataSource} />
              </div>
              <div className="row align-items-center">
                <div className="col-md-6">
                  <div className="datatable-length" />
                </div>
                <div className="col-md-6">
                  <div className="datatable-paginate" />
                </div>
              </div>
              {/* /Calls List */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Page Wrapper */}
  {/* Add New Calls */}
  <div className="modal fade" id="add_calls" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Call Reason</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Reason <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">Status</label>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <input
                    type="radio"
                    className="status-radio"
                    id="add-active"
                    name="status"
                    defaultChecked
                  />
                  <label htmlFor="add-active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="status-radio"
                    id="add-inactive"
                    name="status"
                  />
                  <label htmlFor="add-inactive">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" className="btn btn-primary">
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Add New Calls */}
  {/* Edit Calls */}
  <div className="modal fade" id="edit_calls" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Edit Call Reason</h5>
          <button
            className="btn-close custom-btn-close border p-1 me-0 text-dark"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            <i className="ti ti-x" />
          </button>
        </div>
        <form >
          <div className="modal-body">
            <div className="mb-3">
              <label className="col-form-label">
                Reason <span className="text-danger">*</span>
              </label>
              <input type="text" className="form-control" defaultValue="Busy" />
            </div>
            <div className="mb-0">
              <label className="col-form-label">Status</label>
              <div className="d-flex align-items-center">
                <div className="me-2">
                  <input
                    type="radio"
                    className="status-radio"
                    id="edit-active"
                    name="status"
                    defaultChecked
                  />
                  <label htmlFor="edit-active">Active</label>
                </div>
                <div>
                  <input
                    type="radio"
                    className="status-radio"
                    id="edit-inactive"
                    name="status"
                  />
                  <label htmlFor="edit-inactive">Inactive</label>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="d-flex align-items-center justify-content-end m-0">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <button type="button" data-bs-dismiss="modal" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/* /Edit Calls */}
  {/* Delete Calls */}
  <div className="modal fade" id="delete_calls" role="dialog">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-body">
          <div className="text-center">
            <div className="avatar avatar-xl bg-danger-light rounded-circle mb-3">
              <i className="ti ti-trash-x fs-36 text-danger" />
            </div>
            <h4 className="mb-2">Remove Call Reason?</h4>
            <p className="mb-0">AAre you sure you want to remove it.</p>
            <div className="d-flex align-items-center justify-content-center mt-4">
              <Link
                to="#"
                className="btn btn-light me-2"
                data-bs-dismiss="modal"
              >
                Cancel
              </Link>
              <Link to="#" data-bs-dismiss="modal" className="btn btn-danger">
                Yes, Delete it
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* /Delete Calls */}
</>

  )
}

export default Calls