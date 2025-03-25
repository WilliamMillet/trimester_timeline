const formatIsoDate = (dateString: string): string => {

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const dateParts = dateString.split(/-|T/);
    const day = dateParts[2];

    const getOrdinal = (day: string): string => {
        const dayNumber = parseInt(day, 10);
        if (dayNumber > 3 && dayNumber < 21) return "th";
        switch (dayNumber % 10) {
            case 1: return "st";
            case 2: return "nd";
            case 3: return "rd";
            default: return "th";
        }
    };

    const ordinal = getOrdinal(day);

    return `${Number(day)}${ordinal} of ${months[parseInt(dateParts[1], 10) - 1]}`
    // return `${Number(day)}${ordinal} of ${months[parseInt(dateParts[1], 10) - 1]} ${dateParts[0]}`

}

export default formatIsoDate