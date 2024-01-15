function calcNextDate(date: Date | string, days: number) {
  var res = new Date(date);
  res.setDate(res.getDate() + days);
  return res;
}

export default calcNextDate;
