// Define Trimester 1 boundaries for 2025
const startOfT1 = new Date(2025, 1, 17); // Feb 17, 2025
const endOfT1 = new Date(2025, 3, 28);   // April 28, 2025 (adjusted to match intent: May 15)
const t1Duration = endOfT1.getTime() - startOfT1.getTime();

// Function to map a date to year 2025
const mapTo2025 = (date: Date): Date => {
    return new Date(
        2025,
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
};

// Function to map a date to T1 period
const mapToT1 = (date: Date): Date => {
    const inputDate = new Date(date);
    const t1StartTime = startOfT1.getTime();
    const t1EndTime = endOfT1.getTime();
    const duration = t1EndTime - t1StartTime;

    if (inputDate >= startOfT1 && inputDate <= endOfT1) {
        return inputDate;
    }

    const yearStart = new Date(2025, 0, 1).getTime();
    const inputTime = inputDate.getTime();
    const timeSinceYearStart = inputTime - yearStart;
    const equivalentTimeInT1 = t1StartTime + (timeSinceYearStart % duration);
    let mappedDate = new Date(equivalentTimeInT1);

    if (mappedDate < startOfT1) {
        mappedDate.setTime(mappedDate.getTime() + duration);
    } else if (mappedDate > endOfT1) {
        mappedDate.setTime(mappedDate.getTime() - duration);
    }

    return mappedDate;
};

// Main function to calculate the "cooked" level
function calculateCooked(userCourses: any[], currentDate: Date): number {
    // Validate current date is within T1
    if (currentDate < startOfT1 || currentDate > endOfT1) {
        throw new Error("Current date must be within T1 2025 (Feb 17 - May 15)");
    }

    // Flatten courses into assignments while carrying course ability
    const assignments: any[] = (Array.isArray(userCourses) ? userCourses : [])
        .flatMap((course: any) =>
            course.assignments.map((assignment: any) => ({
                ...assignment,
                ability: course.ability
            }))
        );

    // Map dates to T1 and identify active assignments
    const activeAssignments = assignments
        .map((assignment: any) => {
            const releaseDateInT1 = mapToT1(mapTo2025(new Date(assignment.averageReleaseDate)));
            const dueDateInT1 = mapToT1(mapTo2025(new Date(assignment.averageDueDate)));
            return {
                ...assignment,
                releaseDateInT1,
                dueDateInT1,
                isActive: releaseDateInT1 <= currentDate && currentDate < dueDateInT1
            };
        })
        .filter((assignment: any) => assignment.isActive);

    // If no active assignments, user is minimally cooked
    if (activeAssignments.length === 0) {
        return 1;
    }

    // Calculate individual cooked scores.
    // Adjust slack by adding (ability - 1) so that higher ability gives extra effective time.
    const a = Math.log(3) / 7; // Parameter for sigmoid function
    const cookedScores = activeAssignments.map((assignment: any) => {
        const timeLeftMs = assignment.dueDateInT1.getTime() - currentDate.getTime();
        const timeLeftDays = timeLeftMs / (1000 * 60 * 60 * 24);
        const timeNeededDays = assignment.averageWeeksToComplete * 7;
        // Adjust slack with course ability, so no adjustment if ability is 1.
        const adjustedSlack = timeLeftDays - timeNeededDays + (assignment.ability - 1);
        const cookedScore = 100 / (1 + Math.exp(a * adjustedSlack));
        return cookedScore;
    });

    // Combine scores into overall cooked level
    const product = cookedScores.reduce((prod: number, score: number) => {
        return prod * (1 - score / 100);
    }, 1);
    const overallCooked = 100 * (1 - product);

    return Math.round(Math.max(1, Math.min(100, overallCooked)));
}

export default calculateCooked;