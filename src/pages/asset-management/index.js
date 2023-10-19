import React, { useState, useEffect } from "react";
import "./cmsdashboard.scss";
import floderEmpty from "../../assets/images/floder-empty.png";
import icroundsearch from "../../assets/images/ic_round-search.svg";
import floderaddicon from "../../assets/images/floder-add-icon.svg";
import floderremoveicon from "../../assets/images/floder-remove-icon.svg";
import viewlist from "../../assets/images/view_list.svg";
import view_module from "../../assets/images/view_module.svg";
import { Card, Dropdown, DropdownButton } from "react-bootstrap";
import rightarrow from "../../assets/images/rightvector.png";
import leftarrow from "../../assets/images/Vector.png";
import AddPartnerpopup from "../../component/popup/AddPartnerpopup";

import { Partner_archive, Partner_delete, Partner_list, Partner_search } from "../../api/api";
import filter_alt from "../../assets/images/sortarrow.png";
const PartnerDatas = [
  {
    status: true,
    message: "Data fetched successfully",
    data: [
      {
        createdAt: 1694660445315,
        updatedAt: 1694660445315,
        id: 1,
        code: "NAVBHT",
        name: "Navbharat Times",
      },
      {
        createdAt: 1694660445315,
        updatedAt: 1694660445315,
        id: 2,
        code: "PKTFLM",
        name: "Pocket Films",
      },
      {
        createdAt: 1694660445315,
        updatedAt: 1694660445315,
        id: 3,
        code: "SUPFLM",
        name: "Super Films",
      },
      {
        createdAt: 1694660445315,
        updatedAt: 1694660445315,
        id: 4,
        code: "NUNUTV",
        name: "Numnum Films",
      },
      {
        createdAt: 1697045534078,
        updatedAt: 1697045534078,
        id: 5,
        code: "DISNEY",
        name: "Disney Network",
      },
      {
        createdAt: 1697045634615,
        updatedAt: 1697045634615,
        id: 6,
        code: "AAJTAK",
        name: "Aaj tak Network",
      },
      {
        createdAt: 1697132316355,
        updatedAt: 1697132316355,
        id: 8,
        code: "NEWSNATION",
        name: "News Nation Network",
      },
      {
        createdAt: 1697135480408,
        updatedAt: 1697135480408,
        id: 9,
        code: "ULTIMATE",
        name: "Ultimate Network",
      },
    ],
  },
];

function AssetManagement() {
  const [activeView, setActiveView] = useState("grid");

  const [PartnerData, setPartnerData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [createEdit, setCreateEdit] = useState("create");
  const [singledata, setSingleData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const handleViewChange = (view) => {
    setActiveView(view);
  };

  // console.log(PartnerData);
  useEffect(() => {
    partnerListDetail();
  }, []);
  const partnerListDetail = async () => {
    const partnerData = await Partner_list();

    if (partnerData?.data && partnerData?.status === true) {
      setPartnerData(partnerData.data);
    }
  };

  const partnerSearch = async (searchQuery) => {
    const partnerDataSearch = await Partner_search(searchQuery);

    if (partnerDataSearch?.data && partnerDataSearch?.status == true) {
      setPartnerData(partnerDataSearch?.data);
    }
  };

  // List view
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = PartnerData.slice(startIndex, endIndex);

  const totalPages = Math.ceil(PartnerData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //card

  // Create an array to store open states for each card
  const [isDropdownOpenArray, setIsDropdownOpenArray] = useState(
    new Array(PartnerData.length).fill(false)
  );
  const handleDropdownSelect = (selectedOption, index) => {
    // Implement the action for the selected option here
    // Close the dropdown for the selected card
    setIsDropdownOpenArray((prevState) =>
      prevState.map((value, i) => (i === index ? false : value))
    );
  };

  //add partner pop

  const openCreatePartnerPopup = () => {
    setCreateEdit("create");
    setShowPopup(true);
  };

  const openEditPartnerPopup = (partner) => {
    setCreateEdit("edit");
    setSingleData(partner);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setCreateEdit("create"); // Reset to create mode
    setSingleData(null); // Clear the single data
    partnerListDetail();
  };

  // search
  const handleSearch = () => {
    // Call your search API with the searchQuery value
    // You can use libraries like Axios or fetch for making the API request
    // For this example, we'll use a simple console.log to demonstrate
    console.log("Searching for:", searchQuery);
    partnerSearch(searchQuery);
  };

  const partnerDelete = async (data) => {
    const partnerDelete = await Partner_delete(data);

    if (partnerDelete.message == "Cannot delete a non empty partner") {
      // console.log("respons1234e", partnerDelete);
      alert("Cannot delete a non empty partner");
    } else {
      // console.log("1245678", partnerDelete);
      partnerListDetail();
    }
  };
  const partnerArchive = async (data) => {
    const partnerDelete = await Partner_archive(data);

   console.log(partnerDelete);
  };

  const sortOrderEvent = () => {};
  return (
    <div className="content-body">
      <div className="dashboard-content">
        <div className="top-content">
          <div className="left-side">
            <h3>Asset Management</h3>
          </div>
          <div className="right-side">
            <div className="icon-list">
              <div className="icon-list">
                <input
                  className="search-box"
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="search-icon">
                  <a className="icon" onClick={handleSearch}>
                    <img src={icroundsearch} alt="Search" />
                  </a>
                </div>
                <div className="add-icon">
                  <a className="icon" onClick={openCreatePartnerPopup}>
                    <img src={floderaddicon} alt="" />
                  </a>
                </div>

                <div className="view-list">
                  <a
                    className={`grid-icon icon ${
                      activeView === "grid" ? "active" : ""
                    }`}
                    onClick={() => handleViewChange("grid")}
                  >
                    <img src={view_module} alt="" />
                  </a>
                  <a
                    className={`grid-icon icon ${
                      activeView === "list" ? "active" : ""
                    }`}
                    onClick={() => handleViewChange("list")}
                  >
                    <img src={viewlist} alt="" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="folder-list">
          {activeView === "grid" ? (
            PartnerData.length != 0 ? (
              PartnerData.map((folder, index) => (
                <div key={folder.id} className="floder-block">
                  <Card>
                    <Card.Header>
                      <div className="d-flex justify-content-between">
                        <div>{folder.name}</div>
                        <Dropdown
                          show={isDropdownOpenArray[index]}
                          onToggle={() =>
                            setIsDropdownOpenArray((prevState) =>
                              prevState.map((value, i) =>
                                i === index ? !value : false
                              )
                            )
                          }
                        >
                          <Dropdown.Toggle
                            id={`dropdown-basic-${folder.id}`}
                            variant="light"
                            style={{ cursor: "pointer" }}
                          >
                            <span className="three-dots">⋮</span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              onClick={() => openEditPartnerPopup(folder)}
                              eventKey="option1"
                              onSelect={() =>
                                handleDropdownSelect("option1", index)
                              }
                            >
                              <img src={floderaddicon} alt="" /> Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="option2"
                              onSelect={() =>
                                handleDropdownSelect("option2", index)
                              }
                              onClick={()=>partnerArchive(folder.id)}
                            >
                              <img src={floderaddicon} alt="" /> Archive
                            </Dropdown.Item>
                            <Dropdown.Item
                              eventKey="option3"
                              onSelect={() =>
                                handleDropdownSelect("option3", index)
                              }
                              onClick={() => {
                                partnerDelete(folder.id);
                              }}
                            >
                              <img src={floderaddicon} alt="" /> Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </Card.Header>
                    <Card.Body>
                      {/* Your card body content goes here */}
                      Programs :<b>{folder.programsCount}</b>
                      <p className="my-1">
                        <span className="mx-1">
                          {" "}
                          Transcoded{" "}
                          <p className=" my-1 text-center">
                            <b>{folder.transcodeCount}</b>
                          </p>
                        </span>
                        <span className="mx-1">
                          {" "}
                          Validated{" "}
                          <p className=" my-1 text-center">
                            <b>{folder.validateCount}</b>{" "}
                          </p>
                        </span>
                        <span className="mx-1">
                          {" "}
                          Published{" "}
                          <p className="my-1  text-center">
                            {" "}
                            <b>{folder.publishCount}</b>{" "}
                          </p>
                        </span>
                      </p>
                      <div>
                        POSTERS : <b>{folder.postersCount}</b>
                      </div>
                      <div>
                        PROMOS :<b>{folder.promosCount}</b>{" "}
                      </div>
                      <div>
                        FILLERS : <b>{folder.fillersCount}</b>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ))
            ) : (
              "Match not found"
            )
          ) : (
            <div className="table table-checkbox">
              <table className="listTable text-center">
                <thead >
                  <tr>
                    <th style={{width:"20%"}}>
                      FILE NAME{" "}
                      <a
                        className="filter-icon mx-2"
                        onClick={() => sortOrderEvent("viewKey")}
                      >
                        <img src={filter_alt} alt="Filter" />
                      </a>
                    </th>
                    <th style={{width:"35%", textAlign:"center"}}>
                      PROGRAMS{" "}
                      <a
                        className="filter-icon mx-2"
                        onClick={() => sortOrderEvent("viewKey")}
                      >
                        <img src={filter_alt} alt="Filter" />
                      </a>
                    </th>
                    <th style={{width:"15%"}}>
                      POSTERS{" "}
                      <a
                        className="filter-icon mx-2"
                        onClick={() => sortOrderEvent("viewKey")}
                      >
                        <img src={filter_alt} alt="Filter" />
                      </a>
                    </th>
                    <th style={{width:"15%"}}>
                      PROMOS{" "}
                      <a
                        className="filter-icon mx-2"
                        onClick={() => sortOrderEvent("viewKey")}
                      >
                        <img src={filter_alt} alt="Filter" />
                      </a>
                    </th>
                    <th style={{width:"10%"}}>
                      FILLERS{" "}
                      <a
                        className="filter-icon mx-2"
                        onClick={() => sortOrderEvent("viewKey")}
                      >
                        <img src={filter_alt} alt="Filter" />
                      </a>
                    </th>
                    <th style={{width:"5%"}}>
                      OPTION{" "}
                      <a
                        className="filter-icon mx-2"
                        onClick={() => sortOrderEvent("viewKey")}
                      >
                      
                      </a>
                    </th>
                  </tr>
                </thead>
                {currentData.length != 0 ? (
                  <tbody>
                    {currentData.map((row, index) => (
                      <tr key={row.id}>
                        <td style={{textAlign:"left"}}>
                          <img
                            style={{ height: "25px" }}
                            src={floderEmpty}
                            alt=""
                          />
                          <span> {row.name}</span>
                        </td>
                        <td >
                          Total : {row.programsCount}
                          <p>
                            (Transcoded:{row.transcodeCount}, Validated:
                            {row.validateCount}, Published: {row.publishCount})
                          </p>
                        </td>
                        <td>{row.postersCount}</td>
                        <td>{row.promosCount}</td>
                        <td>{row.fillersCount}</td>
                        <td>
                          <Dropdown
                            show={isDropdownOpenArray[index]}
                            onToggle={() =>
                              setIsDropdownOpenArray((prevState) =>
                                prevState.map((value, i) =>
                                  i === index ? !value : false
                                )
                              )
                            }
                          >
                            <Dropdown.Toggle
                              id={`dropdown-basic-${row.id}`}
                              variant="light"
                              style={{ cursor: "pointer" }}
                            >
                              <span className="three-dots">⋮</span>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                eventKey="option1"
                                onSelect={() =>
                                  handleDropdownSelect("option1", index)
                                }
                                onClick={() => openEditPartnerPopup(row)}
                              >
                                <img src={floderaddicon} alt="" /> Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="option2"
                                onSelect={() =>
                                  handleDropdownSelect("option2", index)
                                }
                                onClick={()=>partnerArchive(row.id)}
                              >
                                <img src={floderaddicon} alt="" /> Archive
                              </Dropdown.Item>
                              <Dropdown.Item
                                eventKey="option3"
                                onSelect={() =>
                                  handleDropdownSelect("option3", index)
                                }
                                onClick={() => {
                                  partnerDelete(row.id);
                                }}
                             
                              >
                                <img src={floderaddicon} alt="" /> Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                ) : (
                  <tr>
                    <td>Match not found</td>
                  </tr>
                )}
              </table>

              <div className="table-pagination">
                <div className="pagination-count">
                  <div className="count">
                    {`${(currentPage - 1) * itemsPerPage + 1}-${Math.min(
                      currentPage * itemsPerPage,
                      PartnerData.length
                    )} of ${PartnerData.length}`}
                  </div>
                  <div className="pagination-arrow">
                    <a
                      className="prev"
                      onClick={() =>
                        currentPage > 1 && handlePageChange(currentPage - 1)
                      }
                    >
                      <img src={leftarrow} alt="Previous" />
                    </a>
                    <a
                      className="next"
                      onClick={() =>
                        currentPage < totalPages &&
                        handlePageChange(currentPage + 1)
                      }
                    >
                      <img src={rightarrow} alt="Next" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          <AddPartnerpopup
            show={showPopup}
            handleClose={closePopup}
            isEditing={createEdit === "edit"} // Pass true if editing, false if creating
            partnerData={singledata}
          />
        </div>
      </div>
    </div>
  );
}

export default AssetManagement;
