export function abbrNum(number: number, decPlaces: number) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ['k', 'm', 'b', 't'];
  const abb = { num: '' };

  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      abb.num = abbrev[i];
      break;
    }
  }

  return { number, abb: abb.num };
}

export function refactorNum(num: number, decPlaces: number) {
  const numObj = abbrNum(num, decPlaces);
  return num < 100000
    ? num.toLocaleString('en-IN', decPlaces === 0 ? { maximumSignificantDigits: 4 } : {})
    : String(numObj.number) + numObj.abb;
}
