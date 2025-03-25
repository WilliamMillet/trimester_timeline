import { Box } from "@mui/material";
import { Gauge } from "@mui/x-charts";
import calculateCooked from "./calculateCooked";
import { ClassContext } from "./DashboardPage";
import { useContext } from "react";
import getCookedMessage from "./getCookedMessage";

const CookedOMeter = () => {

  const classContext = useContext(ClassContext)
  const cookedLevel = calculateCooked(classContext.classData, new Date())
  const name = localStorage.getItem('name')
  if (classContext.classData.length > 0) {
    classContext.setMessage(getCookedMessage(name, cookedLevel));
  } else {
    classContext.setMessage(`Hello, ${name}`);
  }

  
  return (
    <Box position="relative" display="inline-flex">
      <Gauge
        width={150}
        height={150}
        value={cookedLevel}
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
