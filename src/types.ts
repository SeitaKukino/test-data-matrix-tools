export interface CellData {
  value: string;
}

export interface ProcessedCellData extends CellData {
  minimizedNo: number;  // 最小化後の行番号
  originalNos: number[];  // 元の表の行番号の配列
}

export interface OriginalCellData extends CellData {
  minimizedNo: number;  // 対応する最小化済み表の行番号
} 