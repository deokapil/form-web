function zeroPad(number: number) {
  return number < 10 ? "0" + number : number;
}
export function generateRandomTime() {
  const randomHours = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
  const randomMin = Math.floor(Math.random() * 60);
  let end = "AM";
  let hrs = randomHours;
  if (randomHours > 12) {
    hrs = randomHours - 12;
    end = "PM";
  }
  return `${zeroPad(hrs)}:${zeroPad(randomMin)} ${end}`;
}

export const convertDate = (dateString: string | null) => {
  if (!dateString) {
    return "";
  }
  const dateStringList = dateString.split("-");
  if (dateStringList.length != 3) {
    return "";
  }
  return `${dateStringList[2]}-${dateStringList[1]}-${dateStringList[0]}`;
};
