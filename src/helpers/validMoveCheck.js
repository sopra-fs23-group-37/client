export const checkMove = (playerCard, tableCards, selectedTableCards) => {
  console.log("Check Move");
  console.log(playerCard.value);
  console.log(tableCards.length);
  console.log(selectedTableCards.length);
  const pictureCards = ["QUEEN", "KING", "JACK"];
  // 3: JACK
  if (playerCard.value === "JACK") {
    if (tableCards.length === 0) {
      //To-Field
      return "4";
    }
    //Jack
    return "3";
  } else if (selectedTableCards.length === 1) {
    if (playerCard.value === selectedTableCards[0].value) {
      // 1-1 move
      return "1";
    }
    // 1-1 move doesn't match
    return "Your selected cards don't match";
  } else if (selectedTableCards.length > 1) {
    console.log(selectedTableCards[0].value);
    console.log(selectedTableCards[1].value);
    let sum = 0;
    // check if card from hand is a Queen, King, or Jack
    if (pictureCards.includes(playerCard.value)) {
      return "Picture Cards don't add up";
    }
    //add up all cards in selected table cards
    for (let i = 0; i < selectedTableCards.length; i++) {
      //check if card from table is a Queen, King, or Jack
      if (pictureCards.includes(selectedTableCards[i].value)) {
        return "Picture Cards don't add up";
      }
      if (selectedTableCards[i].value === "ACE") {
        sum += 1;
      } else {
        sum += parseInt(selectedTableCards[i].value);
      }
    }
    if (parseInt(playerCard.value) === sum) {
      // x-1 move
      return "2";
    }
    console.log("sum: ", sum);
  } else if (selectedTableCards.length === 0) {
    // to field
    return "4";
  }
  return "Invalid Move is not possible";
};
