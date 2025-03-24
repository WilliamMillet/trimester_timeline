interface GanttBarProps {
    avgWeeksToDo: number;
    dueDate: Date;
    releaseDate?: Date;
}

const GanttBar = ({avgWeeksToDo, dueDate, releaseDate}: GanttBarProps) => {
    const startOfTerm = new Date(2025, 1, 17)
    const endOfTerm = new Date(2025, 3, 28)
    
    const marginRight = (endOfTerm.getTime() - dueDate.getTime()) / (endOfTerm.getTime() - startOfTerm.getTime());
    const barLength = (avgWeeksToDo / 10) * 0.25

    console.log(marginRight)

    return ( 
        <div className="gantt-bar" style={{ right: `${marginRight * 100}%` }}>
            <div className="green-bar bar-section" style={{ width: `${barLength * 100}%` }}></div>
            <div className="yellow-bar bar-section" style={{ width: `${barLength * 100}%` }}></div>
            <div className="red-bar bar-section" style={{ width: `${barLength * 100}%` }}></div>
            <div className="extreme-bar bar-section" style={{ width: `${barLength * 100}%` }}></div>

        </div>
    );
}
 
export default GanttBar;