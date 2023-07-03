import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddNew from "./ModalAddNew";
import ModalEditUser from "./ModalEditUser";  
import _, { debounce } from "lodash";
import ModalComfirm from "./ModalConfirm";
import "./TableUsers.scss";
import { CSVLink } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";

function TableUsers() {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});

  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");

  const [keyword, setKeyword] = useState("");

  const [dataExport, setDataExport] = useState([]);

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };

  useEffect(() => {
    getUsers(1);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUser(page);

    if (res && res.data && res.data) {
      setListUser(res.data);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
    }
  };

  const handleClose = () => {
    setIsShowModalAddNew(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };

  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };
  const handlePageClick = (event) => {
    console.log(event);
    getUsers(+event.selected + 1);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleEditUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);

    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };

  const handleDeleteUser = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  const handleDelteUserFromModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };

  const handleSearch = debounce((e) => {
    let term = e.target.value;
    // console.log("check run keyword when call api", term);
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 800);

  const getUserExport = (event, done) => {
    let result = [];

    if (listUser && listUser.length > 0) {
      result.push(["Id", "first_name", "last_name", "email"]);
      listUser.map((item) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.first_name;
        arr[2] = item.last_name;
        arr[3] = item.email;
        result.push(arr);
      });

      setDataExport(result);
      done();
    }
  };

  const handleImportCSV = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      if (file.type !== "text/csv") {
        toast.error("Only accept csv file");
        return;
      }
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "first_name" ||
                rawCSV[0][1] !== "last_name" ||
                rawCSV[0][2] !== "email"
              ) {
                toast.error("Wrong format header CSV file!");
              } else {
                let result = [];
                // eslint-disable-next-line array-callback-return
                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.first_name = item[0];
                    obj.last_name = item[1];
                    obj.email = item[2];
                    result.push(obj);
                  }
                });
                setListUser(result);
                console.log(result);
              }
            } else {
              toast.error("Not found data on CSV file!");
            }
          } else {
            toast.error("Not found data on CSV file!");
          }
          console.log("Finished: ", results.data);
        },
      });
    }
  };

  return (
    <Container>
      <div className="my-3 container add-new">
        <h4>List Users:</h4>

        <div className="col-4 ">
          <input
            className="form-control"
            placeholder="search user by email..."
            // value={keyword}
            onChange={(e) => handleSearch(e)}
          />
        </div>
        <div className="group-btns">
          {/* Wow 1 mẹo custom ui cho input type file */}
          <label htmlFor="file" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <input
            id="file"
            type="file"
            hidden
            onChange={(event) => handleImportCSV(event)}
          />

          <CSVLink
            filename={"users.csv"}
            className="btn btn-primary"
            target="_blank"
            data={dataExport}
            asyncOnClick={true}
            onClick={getUserExport}
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)}
          >
            <i className="fa-solid fa-circle-plus"></i> Add user
          </button>
        </div>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>Id</span>
                <span>
                  <i
                    className="fa-sharp fa-solid fa-down-long"
                    onClick={() => handleSort("desc", "id")}
                  ></i>

                  <i
                    className="fa-sharp fa-solid fa-up-long"
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </div>
            </th>
            <th>
              <div className="sort-header">
                <span> First Name</span>
                <span>
                  <i
                    className="fa-sharp fa-solid fa-down-long"
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>

                  <i
                    className="fa-sharp fa-solid fa-up-long"
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </div>
            </th>
            <th>Last Name</th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>{item.email}</td>
                  <td>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleEditUser(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => handleDeleteUser(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>

      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPages}
        onPageChange={handlePageClick}
        containerClassName="pagination"
        activeClassName="active"
      />
      <ModalAddNew
        show={isShowModalAddNew}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />

      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleUpdateTable={handleUpdateTable}
        handleEditUserFromModal={handleEditUserFromModal}
      />

      <ModalComfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDelteUserFromModal={handleDelteUserFromModal}
      />
    </Container>
  );
}

export default TableUsers;
