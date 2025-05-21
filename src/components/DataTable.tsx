import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { ProcessedCellData, OriginalCellData } from "../types";

interface DataTableProps {
  data: (ProcessedCellData | OriginalCellData)[][];
  isProcessed?: boolean;
}

export const DataTable = ({ data, isProcessed = false }: DataTableProps) => {
  if (data.length === 0) return null;

  const getReferenceColumn = (cell: ProcessedCellData | OriginalCellData) => {
    if (isProcessed) {
      return (cell as ProcessedCellData).originalNos.join(", ");
    } else {
      return (cell as OriginalCellData).minimizedNo.toString();
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              {isProcessed ? "最小化後No" : "元No"}
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
              {isProcessed ? "元No" : "最小化後No"}
            </TableCell>
            {data[0]?.map((_, index) => (
              <TableCell key={index} sx={{ fontWeight: "bold" }}>
                {String.fromCharCode(65 + index)}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                {isProcessed ? row[0].minimizedNo : rowIndex + 1}
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", backgroundColor: "#f5f5f5" }}>
                {getReferenceColumn(row[0])}
              </TableCell>
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  sx={{
                    color:
                      cell.value.toUpperCase() === "Y"
                        ? "success.main"
                        : cell.value.toUpperCase() === "N"
                        ? "error.main"
                        : cell.value === "-"
                        ? "text.secondary"
                        : "inherit",
                  }}
                >
                  {cell.value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}; 