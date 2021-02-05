import Theme from "../theme";

function getPixelsFromPercent(percent, surfaceHeight) {
  let height = Math.ceil((percent / 100) * 150);
  let rh =
    height > surfaceHeight
      ? percent === 100
        ? height
        : height - surfaceHeight
      : 0;
  return rh;
}

function getColorFromPercent(percent) {
  if (Number(percent) < 20) return Theme.colors.red;
  else if (Number(percent) >= 20 && Number(percent) < 40)
    return Theme.colors.lightRed;
  else if (Number(percent) >= 40 && Number(percent) < 60)
    return Theme.colors.yellow;
  else if (Number(percent) >= 60 && Number(percent) <= 80)
    return Theme.colors.lightGreen;
  else return Theme.colors.green;
}

function getColorFromTag(tag) {
  if (Number(tag) === -1) return Theme.colors.red;
  else if (Number(tag) === 0) return Theme.colors.yellow;
  else if (Number(tag) === 1) return Theme.colors.green;
}

export { getColorFromPercent, getPixelsFromPercent, getColorFromTag };
