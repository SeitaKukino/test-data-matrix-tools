import { Box, Container, Typography } from "@mui/material";
import { PasteInput } from "./components/PasteInput";
import { DataTable } from "./components/DataTable";
import { AppOverview } from "./components/AppOverview";
import { useState } from "react";
import type { CellData, ProcessedCellData, OriginalCellData } from "./types";
import { processTableData } from "./utils/tableProcessing";
import { validateTable } from "./utils/validation";

function App() {
  const [originalData, setOriginalData] = useState<OriginalCellData[][]>([]);
  const [processedData, setProcessedData] = useState<ProcessedCellData[][]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleDataPaste = (data: CellData[][]) => {
    const validation = validateTable(data);
    setErrors(validation.errors);

    if (validation.isValid) {
      const { processedData: newProcessedData, originalData: newOriginalData } =
        processTableData(data);
      setOriginalData(newOriginalData);
      setProcessedData(newProcessedData);
    } else {
      setOriginalData([]);
      setProcessedData([]);
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          テストデータ行列ツール
        </Typography>
        <AppOverview />
        <Box sx={{ mt: 4 }} />
        <PasteInput onDataPaste={handleDataPaste} />
        {errors.length > 0 && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography color="error" component="div">
              {errors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Typography>
          </Box>
        )}
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
          <Box>
            <Typography variant="h6" gutterBottom>
              元の表（{originalData.length}行）
            </Typography>
            <DataTable data={originalData} isProcessed={false} />
          </Box>
          <Box>
            <Typography variant="h6" gutterBottom>
              最小化済み表（{processedData.length}行）
            </Typography>
            <DataTable data={processedData} isProcessed={true} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
