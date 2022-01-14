import { TableHeaderTabs } from "../../../assets/star";
import StarRow from "./starRow";
import { Table, TableRow, TableCell, Button } from "@mui/material";
import { ArrowDropDown } from "@material-ui/icons";
import { starType } from "../../../assets/star";

interface starProps {
  stars: starType[];
  setStar: (star: starType) => void;
  removeStar: (star: starType) => void;
}
const StarsTable = ({ stars, setStar, removeStar }: starProps) => {
  return (
    <div
      style={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Table className="tableHeader">
        <TableRow>
          {TableHeaderTabs.map((tab: any) => {
            return (
              <TableCell width={tab.width}>
                <Button
                  sx={{
                    color: "Gray",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {tab.displayName}
                  <ArrowDropDown
                    className="dropDownIcon"
                    style={{ display: tab.isDropDown ? "" : "none" }}
                  />
                </Button>
              </TableCell>
            );
          })}
        </TableRow>
      </Table>
      <div className="starsTable">
        {stars.map((star: starType) => {
          return <StarRow star={star} setStar={setStar} removeStar={removeStar} />;
        })}
      </div>
    </div>
  );
};

export default StarsTable;
