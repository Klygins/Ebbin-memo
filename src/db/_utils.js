export function calculateNextShowTime(startTime, showedAmount) {
    const minutes = startTime + 1000 * 60
    const hours = startTime + 1000 * 3600
    const days = startTime + 1000 * 3600 * 24
    switch (showedAmount){
        case 0:
            return minutes * 10     // 10 minutes
        case 1:
            return hours            // 1 hours
        case 2:
            return hours * 5        // 5 hours
        case 3:
            return days             // 1 day
        case 4:
            return days * 5         // 5 days
        case 5:
            return days * 25        // 25 days
        case 6:
            return days * 30 * 4    // 4 month
    }
}