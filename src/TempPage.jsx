import { Input, Table } from "@nextui-org/react";
import React from "react";

function TempPage() {
  return (
    <div>
      <h1>TempPage</h1>
      <div className="max-w-md">
        <Table
          aria-label="Example disabled keys collection table"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
          disallowEmptySelection
          defaultSelectedKeys={["2"]}
          selectionMode="multiple"
          color="secondary"
        >
          <Table.Header>
            <Table.Column hideHeader>
              <input type="text" className="z-100" />
            </Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row key="1">
              <Table.Cell>Tony Reichert</Table.Cell>
            </Table.Row>
            <Table.Row key="2">
              <Table.Cell>Zoey Lang</Table.Cell>
            </Table.Row>
            <Table.Row key="3">
              <Table.Cell>Jane Fisher</Table.Cell>
            </Table.Row>
            <Table.Row key="4">
              <Table.Cell>William Howard</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default TempPage;
