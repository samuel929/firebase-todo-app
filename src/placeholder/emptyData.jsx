import React from "react"
import { Icon } from "semantic-ui-react";

export const emptyData = (text) => (
  <div className="empty-data">
    <Icon
      className="search"
      size="huge"
      style={{ color: "#626262" }}
    />
    <div style={{ marginTop: 20 }}>
      { text ?? "No data to show"}
    </div>
  </div>
);