export function formatNames(
    usernames: string[],
    maxDisplay: number = 2
): string {
    if (usernames.length <= maxDisplay) {
        return usernames.join(", ")
    }
    const displayedNames = usernames.slice(0, maxDisplay)
    const remainingCount = usernames.length - maxDisplay

    return `${displayedNames.join(", ")} +${remainingCount}`
}
