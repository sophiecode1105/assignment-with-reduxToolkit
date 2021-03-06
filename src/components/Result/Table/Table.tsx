import styled from "styled-components";
import TableHeader from "./TableHeader";
import TableContents from "./TableContents";
import { FOX, GOLF } from "../../../model/constants";
import Print from "../Print/Print";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1%;
  overflow-y: scroll;
  height: 50vh;
`;

const Table = () => {
  let columnDetails = [
    { name: "Name", sortKey: 0 },
    { name: "Foxtrot", sortKey: FOX },
    { name: "Golf", sortKey: GOLF },
  ];
  return (
    <Container>
      <Print />
      <TableHeader columnDetails={columnDetails} />
      <TableContents />
    </Container>
  );
};
export default Table;
