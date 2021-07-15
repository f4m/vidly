import React from "react";

const ListGroup = (props) => {
  const { items, id, value, onItemSelect, selectedItem } = props;

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          style={{ cursor: "pointer" }}
          key={item[id]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[value]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  id: "_id",
  value: "name",
};

export default ListGroup;
