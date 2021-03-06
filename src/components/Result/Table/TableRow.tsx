import styled from "styled-components";
import { UserSubData, UserSubDataList } from "../../../model/user";
import { useAppDispatch } from "../../../state/store/hook";
import { getResultByName } from "../../../utils/api/testapi";
import { updateUserSubDataList, changeClicked } from "../../../state/store/userData";
import SubTable from "./SubTable/SubTable";
import { useState } from "react";
import LoadingIndicator from "../../../assets/Loading_Indicator.gif";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

type clickedProp = {
  clicked: boolean;
  hasClickedSubData: boolean;
};

const ContentWrap = styled.div<clickedProp>`
  width: 100%;
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  background-color: ${(props) => (props.clicked || props.hasClickedSubData ? "rgba(200,200,200,0.3)" : "null")};
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  font-size: 24px;
  font-weight: 700;
  min-height: 90px;
`;

const SubTableWrap = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
`;

const LoadingScreen = styled.img``;
interface TableRowProps {
  rowData: [string, number, number];
  userId: string;
  called: boolean;
  clicked: boolean;
  hasClickedSubData: boolean;
}
const LoadingScreenWrap = styled.div`
  margin-top: 2%;
`;

const TableRow = ({ rowData, userId, called, clicked, hasClickedSubData }: TableRowProps) => {
  const dispatch = useAppDispatch();
  const [name, foxTrot, golf] = rowData;

  let foxPrecise = foxTrot.toPrecision(5);
  let golfPrecise = golf.toPrecision(5);

  const getSubData = async () => {
    dispatch(changeClicked(userId));
    try {
      if (!called) {
        let subApiData: number[][] = await getResultByName(name);
        let userSubDataList = subApiData.map((el) => {
          return {
            clicked: false,
            data: el,
          } as UserSubData;
        }) as UserSubDataList;
        dispatch(updateUserSubDataList({ userId, sublist: userSubDataList }));
      }
    } catch (e) {
      throw e;
    }
  };

  return (
    <Container>
      <ContentWrap clicked={clicked} hasClickedSubData={hasClickedSubData} onClick={getSubData}>
        <Content>{name}</Content>
        <Content>{foxPrecise}</Content>
        <Content>{golfPrecise}</Content>
      </ContentWrap>
      {called && clicked ? (
        <SubTableWrap>
          <SubTable userId={userId} />
        </SubTableWrap>
      ) : clicked && !called ? (
        <LoadingScreenWrap>
          <LoadingScreen src={LoadingIndicator} />
        </LoadingScreenWrap>
      ) : null}
    </Container>
  );
};

export default TableRow;
