/**
 * Calculate percentage for each nominee based on votes
 * Percentage = (nominee votes / total votes in category) * 100
 */

export function calculatePercentages(nominees: any[]): any[] {
    if (!nominees || nominees.length === 0) return nominees;

    const categoriesMap = new Map<string, any[]>();

    nominees.forEach((nominee) => {
        const categoryId = String(nominee?.category_id || nominee?.categoryId || 'unknown');
        if (!categoriesMap.has(categoryId)) {
            categoriesMap.set(categoryId, []);
        }
        categoriesMap.get(categoryId)!.push(nominee);
    });

    const result = nominees.map((nominee) => {
        const categoryId = String(nominee?.category_id || nominee?.categoryId || 'unknown');
        const categoryGroup = categoriesMap.get(categoryId) || [];

        const totalVotesInCategory = categoryGroup.reduce((sum, n) => sum + (parseInt(n.votes) || 0), 0);

        const currentVotes = parseInt(nominee.votes) || 0;
        const percentage = totalVotesInCategory > 0
            ? Math.round((currentVotes / totalVotesInCategory) * 100)
            : 0;

        return {
            ...nominee,
            percentage,
            totalVotesInCategory
        };
    });

    return result;
}
