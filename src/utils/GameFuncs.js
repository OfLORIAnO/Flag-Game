function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
}

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
                randomNum = 1;
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
        currentLevelFilteredData = currentLevelFilteredData.concat(
            otherLevelFilteredData
        );
        const shuffledArray = shuffleArray(currentLevelFilteredData);
        return shuffledArray;
    }
};
export const GetVariants = (allData, currentObject) => {
    let massOfSimilar = new Array();
    for (let i = 0; i < currentObject.similar.length; i++) {
        const similarId = currentObject.similar[i]; // Id элементов
        const findedElem = allData.find((item) => item.id == similarId);
        if (findedElem) {
            massOfSimilar.push(findedElem);
        } else {
            return null;
        }
    }
    let RandNum = Math.floor(Math.random() * 3) + 1;

    if (massOfSimilar.length > 0 && massOfSimilar.length < 3) {
        RandNum = Math.floor(Math.random() * massOfSimilar.length) + 1;
    }
    let readyMass = new Array();
    let cnt = 0;
    while (cnt < RandNum) {
        cnt += 1;
        const RandIndex = Math.floor(Math.random() * massOfSimilar.length);
        readyMass.push(massOfSimilar[RandIndex]);
        massOfSimilar = massOfSimilar.filter(
            (item) => item.id !== massOfSimilar[RandIndex].id
        );
    }
    readyMass.push(currentObject);
    while (readyMass.length < 4) {
        const RandIndex = Math.floor(Math.random() * allData.length);
        const newElem = allData[RandIndex];
        if (!readyMass.includes(newElem)) {
            readyMass.push(newElem);
        }
    }
    console.log(readyMass);
    return shuffleArray(readyMass);
};
