import { Box } from "@mui/material";
import { Gauge } from "@mui/x-charts";

interface CookedOMeterProps {
  value: number;
}
const CookedOMeter = ({ value }: CookedOMeterProps) => {
  return (
    <Box position="relative" display="inline-flex">
      <Gauge
        width={150}
        height={150}
        value={60}
        startAngle={-90}
        endAngle={90}
        text={
            ({ value }) => `${value} / 100`
         }
      />
    </Box>
  );
};

export default CookedOMeter;
