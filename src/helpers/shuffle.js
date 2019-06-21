function shuffle(array) {
  const toShuffle = array;
  let currentIndex = toShuffle.length;
  while (currentIndex !== 0) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    const temporaryValue = toShuffle[currentIndex];
    toShuffle[currentIndex] = toShuffle[randomIndex];
    toShuffle[randomIndex] = temporaryValue;
  }
  return toShuffle;
}

export default shuffle;
