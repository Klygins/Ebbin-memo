export function calculateNextShowTime(startTime, showedAmount) {
    switch (showedAmount){
        case 0:
            return startTime + 1000 * 60 * 10
        case 1:
            return startTime + 1000 * 3600
        case 2:
            return startTime + 1000 * 3600 * 5
        case 3:
            return startTime + 1000 * 3600 * 24
        case 4:
            return startTime + 1000 * 3600 * 24 * 25
    }
}