import { Tooltip } from "@mui/material";

interface GanttBarProps {
    avgWeeksToDo: number;
    dueDate: Date;
    releaseDate: Date;
    ability?: number;
    courseCode: string;
    assignmentName: string;
    onClick: () => void;
}

const GanttBar = ({ avgWeeksToDo, dueDate, releaseDate, ability, courseCode, assignmentName, onClick }: GanttBarProps) => {
    // Define Trimester 1 boundaries for 2025
    const startOfT1 = new Date(2025, 1, 17); // Feb 17, 2025
    const endOfT1 = new Date(2025, 3, 28);   // May 15, 2025

    const mapTo2025 = (date: Date): Date => {
        return new Date(2025, date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
      };

    

    // Function to map a date to T1 equivalent
    const mapToT1 = (date: Date): Date => {
        const inputDate = new Date(date);
        const t1StartTime = startOfT1.getTime();
        const t1EndTime = endOfT1.getTime();
        const t1Duration = t1EndTime - t1StartTime;

        // If the date is already in T1, return it as is
        if (inputDate >= startOfT1 && inputDate <= endOfT1) {
            return inputDate;
        }

        // Calculate the year's start for reference
        const yearStart = new Date(2025, 0, 1).getTime();
        const inputTime = inputDate.getTime();
        
        // Calculate relative position in the year (in milliseconds)
        const timeSinceYearStart = inputTime - yearStart;
        
        // Map to T1 by taking modulo of the year's time and adjusting to T1
        const equivalentTimeInT1 = t1StartTime + (timeSinceYearStart % t1Duration);
        const mappedDate = new Date(equivalentTimeInT1);

        // Ensure the mapped date stays within T1 bounds
        if (mappedDate < startOfT1) {
            mappedDate.setTime(mappedDate.getTime() + t1Duration);
        } else if (mappedDate > endOfT1) {
            mappedDate.setTime(mappedDate.getTime() - t1Duration);
        }

        return mappedDate;
    };
    // Calculate T1 duration in milliseconds
    const t1Duration = endOfT1.getTime() - startOfT1.getTime();

    // Map dueDate and releaseDate to T1
    const dueDateInT1 = mapToT1(mapTo2025(dueDate));
    const releaseDateInT1 = mapToT1(mapTo2025(releaseDate))


    const barPixels = 1015

    const marginRight = ((endOfT1.getTime() - dueDateInT1.getTime()) / t1Duration) * barPixels

    let barLength = ((avgWeeksToDo / 10) * 0.25) * barPixels

    if (ability) {
        barLength *= (2 - 0.2 * ability)
    }


    // Compute the offset from the start of T1 in percentage for releaseDate (if provided)
    
 

    const startPercentOfGreenbar = marginRight + barLength * 3


    const releaseOffsetPercent = (releaseDateInT1.getTime() - startOfT1.getTime()) / t1Duration 
    const endOffsetPercent = (barLength  / barPixels) * 3 + (marginRight / barPixels)



    const greenBarWidthPercent = (1 - releaseOffsetPercent - endOffsetPercent) * barPixels

    return (
        <Tooltip title={`${courseCode}: ${assignmentName}`} followCursor>
        <div className="gantt-bar" style={{ right: `${marginRight}px` }} onClick={onClick}>     
            <div className="green-bar bar-section" style={{ width: `${greenBarWidthPercent}px` }}></div>
            <div className="yellow-bar bar-section" style={{ width: `${barLength}px` }}></div>
            <div className="red-bar bar-section" style={{ width: `${barLength}px` }}></div>
            <div className="extreme-bar bar-section" style={{ width: `${barLength}px` }}>
                {Array(Math.floor((barLength) / 50))
                    .fill(null)
                    .map((_, idx) => (
                        <img
                            key={idx}
                            src="https://1000logos.net/wp-content/uploads/2023/05/Skull-Emoji.png"
                            alt="Skull emoji"
                        />
                    ))}
            </div>
        </div>
        </Tooltip>
    );
};

export default GanttBar;