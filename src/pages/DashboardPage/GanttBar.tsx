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
}
 
export default GanttBar;