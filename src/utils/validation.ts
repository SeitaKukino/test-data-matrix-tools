import type { CellData } from "../types";

export const validateCell = (value: string): boolean => {
  // 空白、Y、N、- のみを許可
  return value === "" || value.toUpperCase() === "Y" || value.toUpperCase() === "N" || value === "-";
};

export const validateTable = (data: CellData[][]): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.length === 0) {
    errors.push("テーブルにデータがありません");
    return { isValid: false, errors };
  }

  // 各行の列数が一致するか確認
  const columnCount = data[0].length;
  data.forEach((row, rowIndex) => {
    if (row.length !== columnCount) {
      errors.push(`行 ${rowIndex + 1} の列数が不正です（期待: ${columnCount}, 実際: ${row.length}）`);
    }
  });

  // 各セルの値を検証
  data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!validateCell(cell.value)) {
        errors.push(
          `行 ${rowIndex + 1}, 列 ${String.fromCharCode(65 + colIndex)} の値 "${cell.value}" が不正です（許可される値: Y, N, -, 空白）`
        );
      }
    });
  });

  return { isValid: errors.length === 0, errors };
}; 