import { Box, Button, TextField } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { useState, useCallback } from "react";
import type { CellData } from "../types";

interface PasteInputProps {
  onDataPaste: (data: CellData[][]) => void;
}

export const PasteInput = ({ onDataPaste }: PasteInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handlePaste = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pastedText = event.target.value;
    setInputValue(pastedText);

    if (!pastedText.trim()) {
      onDataPaste([]);
      return;
    }

    // タブ区切りのテキストを行ごとに分割
    const rows = pastedText.split("\n").filter((row) => row.trim());

    // 各行をタブで分割してデータを構築
    const data = rows.map((row) =>
      row.split("\t").map((cell) => ({
        value: cell.trim(),
      }))
    );

    onDataPaste(data);
  };

  const handlePasteButton = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInputValue(text);
      
      if (!text.trim()) {
        onDataPaste([]);
        return;
      }

      // タブ区切りのテキストを行ごとに分割
      const rows = text.split("\n").filter((row) => row.trim());

      // 各行をタブで分割してデータを構築
      const data = rows.map((row) =>
        row.split("\t").map((cell) => ({
          value: cell.trim(),
        }))
      );

      onDataPaste(data);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  }, [onDataPaste]);

  const handleClear = () => {
    setInputValue("");
    onDataPaste([]);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        multiline
        rows={4}
        value={inputValue}
        onChange={handlePaste}
        placeholder="Excelからコピーしたデータをここに貼り付けてください（タブ区切り）"
        variant="outlined"
        fullWidth
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          variant="contained"
          startIcon={<ContentPasteIcon />}
          onClick={handlePasteButton}
        >
          クリップボードから貼り付け
        </Button>
        <Button variant="outlined" onClick={handleClear}>
          クリア
        </Button>
      </Box>
    </Box>
  );
}; 