interface GanttBarProps {
    avgWeeksToDo: number;
    dueDate: Date;
    releaseDate?: Date;
    ability?: number;
}

const GanttBar = ({ avgWeeksToDo, dueDate, releaseDate, ability }: GanttBarProps) => {
    // Define Trimester 1 boundaries for 2025
    const startOfT1 = new Date(2025, 1, 17); // Feb 17, 2025
    const endOfT1 = new Date(2025, 4, 15);   // May 15, 2025

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

    // Map dueDate and releaseDate to T1
    const dueDateInT1 = mapToT1(dueDate);
    const releaseDateInT1 = releaseDate ? mapToT1(releaseDate) : undefined;

    const marginRight = (endOfT1.getTime() - dueDateInT1.getTime()) / 
                       (endOfT1.getTime() - startOfT1.getTime());
    let barLength = (avgWeeksToDo / 10) * 0.25
    console.log(ability)
    if (ability) {
        barLength *= (2 - 0.2 * ability)
    }

    return (
        <div className="gantt-bar" style={{ right: `${marginRight * 100}%` }}>
            <div className="green-bar bar-section" style={{ width: `${barLength * 100}%` }}></div>
            <div className="yellow-bar bar-section" style={{ width: `${barLength * 100}%` }}></div>
            <div className="red-bar bar-section" style={{ width: `${barLength * 100}%` }}></div>
            <div className="extreme-bar bar-section" style={{ width: `${barLength * 100}%` }}>
                {Array(Math.floor((barLength * 100) / 5))
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
    );
};

export default GanttBar;