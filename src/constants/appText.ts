export const APP_TEXT = {
  title: "テストデータ行列ツール",
  overview: {
    title: "概要",
    description: "このツールは、テストデータの行列（マトリックス）を最小化するためのツールです。",
    features: {
      title: "主な機能",
      items: [
        "Excelからコピーしたテストデータを貼り付けて表示",
        "空白や「-」をワイルドカードとして扱い、同じパターンの行を統合",
        "元の表と最小化済みの表を同時に表示し、行の対応関係を確認可能",
      ],
    },
    inputFormat: {
      title: "入力データの形式",
      items: [
        "各セルには「Y」「N」「-」または空白を入力可能",
        "「-」と空白はワイルドカードとして扱われ、任意の値とマッチします",
        "Excelからコピーしたデータはタブ区切り形式で貼り付け可能",
      ],
    },
  },
  tables: {
    original: {
      title: "元の表",
      rowCount: (count: number) => `元の表（${count}行）`,
    },
    minimized: {
      title: "最小化済み表",
      rowCount: (count: number) => `最小化済み表（${count}行）`,
    },
  },
  input: {
    placeholder: "Excelからコピーしたデータをここに貼り付けてください（タブ区切り）",
    clearButton: "クリア",
  },
  validation: {
    emptyTable: "テーブルにデータがありません",
    invalidColumnCount: (row: number, expected: number, actual: number) =>
      `行 ${row} の列数が不正です（期待: ${expected}, 実際: ${actual}）`,
    invalidValue: (row: number, col: string, value: string) =>
      `行 ${row}, 列 ${col} の値 "${value}" が不正です（許可される値: Y, N, -, 空白）`,
  },
} as const; 