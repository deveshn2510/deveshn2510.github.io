import axios from "axios";
import "./index.css";
import React, { useEffect } from "react";
import Card from "../../Components/Card";
import Header from "../../Components/Header";
import { API } from "../../Utils/Constant";
import Select from "../../Components/Select";

export default function Homepage() {
  const [data, setData] = React.useState([]);
  const [selectedOptionGrouping, setSelectedOptionGrouping] =
    React.useState("Status");
  const [selectedOptionOrdering, setSelectedOptionOrdering] =
    React.useState("Priority");
  const [alteredData, setAlteredData] = React.useState([]);
  useEffect(() => {
    axios.get(API).then((res) => {
      setData(res.data);
      setAlteredData(getStatusData(res?.data));
    });
  }, []);

  useEffect(() => {
    if (data?.tickets) {
      onChangeGrouping(
        localStorage.getItem("groupBy") || selectedOptionGrouping
      );
      onChangeOrdering(
        localStorage.getItem("orderBy") || selectedOptionOrdering
      );
    }
  }, [data]);

  const getStatusData = (data) => {
    let newArr = [
      { name: "Todo", arrayOfData: [] },
      { name: "In progress", arrayOfData: [] },
      { name: "Backlog", arrayOfData: [] },
      { name: "Done", arrayOfData: [] },
      { name: "Cancelled", arrayOfData: [] },
    ];
    data?.tickets?.forEach((el) => {
      let existingElementIndex = newArr.findIndex(
        (elem) => elem.name === el.status
      );
      if (existingElementIndex !== -1) {
        newArr[existingElementIndex].arrayOfData.push(el);
      } else {
        newArr.push({ name: el.status, arrayOfData: [el] });
      }
    });
    return newArr;
  };

  const getPriorityData = (data) => {
    let newArr = [
      { name: "No priority", level: 0, arrayOfData: [] },
      { name: "Low", level: 1, arrayOfData: [] },
      { name: "Medium", level: 2, arrayOfData: [] },
      { name: "High", level: 3, arrayOfData: [] },
      { name: "Urgent", level: 4, arrayOfData: [] },
    ];
    data?.tickets?.forEach((el) => {
      let existingElementIndex = newArr.findIndex(
        (elem) => elem.level === el.priority
      );
      if (existingElementIndex !== -1) {
        newArr[existingElementIndex].arrayOfData.push(el);
      }
    });
    return newArr;
  };

  const getUserData = (data) => {
    let newArr = [];
    data?.users?.forEach((el) => {
      newArr.push({ name: el.name, id: el.id, arrayOfData: [] });
    });

    data?.tickets?.forEach((el) => {
      let existingElementIndex = newArr.findIndex(
        (elem) => elem.id === el.userId
      );
      if (existingElementIndex !== -1) {
        newArr[existingElementIndex].arrayOfData.push(el);
      }
    });
    return newArr;
  };

  const onChangeGrouping = (value) => {
    localStorage.setItem("groupBy", value);
    setSelectedOptionGrouping(value);
    if (value === "Status") {
      setAlteredData(getStatusData(data));
    } else if (value === "User") {
      setAlteredData(getUserData(data));
    } else if (value === "Priority") {
      setAlteredData(getPriorityData(data));
    }
  };

  const getPriorityOrdering = (key) => {
    let alteredDataCopy = [...alteredData];
    alteredDataCopy.forEach((el) => {
      el.arrayOfData?.sort((a, b) => {
        if (a[key] < b[key]) {
          return -1;
        }
        if (a[key] > b[key]) {
          return 1;
        }
        return 0;
      });
    });
    return alteredDataCopy;
  };

  const onChangeOrdering = (value) => {
    localStorage.setItem("orderBy", value);
    setSelectedOptionOrdering(value);
    if (value === "Priority") {
      setAlteredData(getPriorityOrdering("priority"));
    } else if (value === "Title") {
      setAlteredData(getPriorityOrdering("title"));
    }
  };

  let content = (
    <div>
      <Select
        label={"Grouping"}
        value={selectedOptionGrouping}
        onChange={onChangeGrouping}
        options={["Status", "User", "Priority"]}
      />
      <Select
        label={"Ordering"}
        value={selectedOptionOrdering}
        onChange={onChangeOrdering}
        options={["Priority", "Title"]}
      />
    </div>
  );
  return (
    <div>
      <Header content={content} />
      <div className="grid-container">
        {alteredData.length > 0 &&
          alteredData.map((item, index) => {
            return (
              <>
                <div className="grid-item">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <p>
                      {item.name}{" "}
                      <span style={{ marginLeft: 8 }}>
                        {item?.arrayOfData?.length}
                      </span>
                    </p>
                    <p></p>
                  </div>
                  {item?.arrayOfData?.map((el) => {
                    return (
                      <div style={{ marginTop: "16px" }}>
                        <Card data={el} />
                      </div>
                    );
                  })}
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
}
