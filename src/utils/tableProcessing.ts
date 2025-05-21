import type { CellData } from "../types";

interface ProcessedRow extends CellData {
  minimizedNo: number;  // 最小化後の行番号
  originalNos: number[];  // 元の表の行番号の配列
}

interface OriginalRow extends CellData {
  minimizedNo: number;  // 対応する最小化済み表の行番号
}

// 行の比較関数（空白と-をワイルドカードとして扱う）
const isRowMatch = (row1: CellData[], row2: CellData[]): boolean => {
  if (row1.length !== row2.length) return false;
  
  return row1.every((cell1, index) => {
    const cell2 = row2[index];
    // 空白と-はワイルドカードとして扱う
    return cell1.value === "" || cell1.value === "-" || 
           cell2.value === "" || cell2.value === "-" || 
           cell1.value === cell2.value;
  });
};

// 行の正規化（空白と-を含む行を優先的に保持）
const normalizeRow = (row1: CellData[], row2: CellData[]): CellData[] => {
  return row1.map((cell1, index) => {
    const cell2 = row2[index];
    // どちらかが空白または-の場合は、もう一方の値を使用
    if (cell1.value === "" || cell1.value === "-") return cell2;
    if (cell2.value === "" || cell2.value === "-") return cell1;
    // 両方同じ値の場合はその値を使用
    return cell1;
  });
};

export const processTableData = (
  data: CellData[][]
): {
  processedData: ProcessedRow[][];
  originalData: OriginalRow[][];
} => {
  if (data.length === 0) return { processedData: [], originalData: [] };

  // 重複行の削除と正規化、および行の関連付け情報を保持
  const uniqueRows: { row: CellData[]; originalIndices: number[] }[] = [];
  
  data.forEach((row, originalIndex) => {
    const existingRowIndex = uniqueRows.findIndex(({ row: existingRow }) => 
      isRowMatch(existingRow, row)
    );

    if (existingRowIndex === -1) {
      // 新しい行を追加
      uniqueRows.push({
        row: [...row],
        originalIndices: [originalIndex + 1]
      });
    } else {
      // 既存の行と正規化し、元の行番号を追加
      uniqueRows[existingRowIndex] = {
        row: normalizeRow(uniqueRows[existingRowIndex].row, row),
        originalIndices: [...uniqueRows[existingRowIndex].originalIndices, originalIndex + 1]
      };
    }
  });

  // 処理済みデータの作成（最小化後の行番号と元の行番号の配列を含む）
  const processedData = uniqueRows.map(({ row, originalIndices }, index) => 
    row.map(cell => ({
      ...cell,
      minimizedNo: index + 1,
      originalNos: originalIndices
    }))
  );

  // 元のデータの作成（対応する最小化済み表の行番号を含む）
  const originalData = data.map((row, index) => {
    const processedRowIndex = uniqueRows.findIndex(({ originalIndices }) => 
      originalIndices.includes(index + 1)
    );
    return row.map(cell => ({
      ...cell,
      minimizedNo: processedRowIndex + 1  // 対応する最小化済み表の行番号
    }));
  });

  return { processedData, originalData };
}; 