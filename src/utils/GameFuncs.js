export const getLevelList = (allData, level) => {
    let currentLevelFilteredData = allData.filter(
        (item) => item.level === level
    );

    if (currentLevelFilteredData.length === 0) {
        console.log('GetLevelListError');
        return null;
    } else {
        while (currentLevelFilteredData.length > 15) {
            const randIndex = Math.floor(
                Math.random() * currentLevelFilteredData.length
            );
            currentLevelFilteredData.splice(randIndex, 1);
        }
        let otherLevelFilteredData = new Array();
        while (otherLevelFilteredData.length < 5) {
            let randomNum = Math.floor(Math.random() * 2);
            if (level == 1) {
                randomNum += 1;
            } else if (1 < level && level < 12) {
                if (randomNum === 0) {
                    randomNum = -1;
                }
            } else if (level == 12) {
                randomNum -= 2;
            }
            const dataRandLevel = allData.filter(
                (item) => item.level === randomNum + level
            );
            const DataRandElem =
                dataRandLevel[Math.floor(Math.random() * dataRandLevel.length)];
            if (!otherLevelFilteredData.includes(DataRandElem)) {
                otherLevelFilteredData.push(DataRandElem);
            }
        }
        currentLevelFilteredData = currentLevelFilteredData.concat(otherLevelFilteredData)
        return currentLevelFilteredData;
    }
};
