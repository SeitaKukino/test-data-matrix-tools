import {
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AppOverview = () => {
  return (
    <Accordion defaultExpanded={true}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          backgroundColor: "#f8f9fa",
          "&:hover": {
            backgroundColor: "#f0f0f0",
          },
        }}
      >
        <Typography variant="h6">概要</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box sx={{ p: 3 }}>
          <Typography paragraph>
            このツールは、テストデータの行列（マトリックス）を最小化するためのツールです。
          </Typography>

          <Typography variant="subtitle1" gutterBottom>
            主な機能
          </Typography>
          <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
            <Typography component="li" paragraph>
              Excelからコピーしたテストデータを貼り付けて表示
            </Typography>
            <Typography component="li" paragraph>
              空白や「-」をワイルドカードとして扱い、同じパターンの行を統合
            </Typography>
            <Typography component="li" paragraph>
              元の表と最小化済みの表を同時に表示し、行の対応関係を確認可能
            </Typography>
          </ul>

          <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
            入力データの形式
          </Typography>
          <ul style={{ margin: 0, paddingLeft: "1.5rem" }}>
            <Typography component="li" paragraph>
              各セルには「Y」「N」「-」または空白を入力可能
            </Typography>
            <Typography component="li" paragraph>
              「-」と空白はワイルドカードとして扱われ、任意の値とマッチします
            </Typography>
            <Typography component="li" paragraph>
              Excelからコピーしたデータはタブ区切り形式で貼り付け可能
            </Typography>
          </ul>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
