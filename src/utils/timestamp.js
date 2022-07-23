export const generate = () => {
  let d = new Date();
  const timestamp = new Date(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds()
  );
  return timestamp;
};

export const convertDateToBackendFormat = (dat) => {
  let goodD = '';
  let tmp = new Date(dat);

  let year = tmp
    .getFullYear()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  let month = tmp
    .getMonth()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  let date = tmp
    .getDate()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  goodD = `${year}-${month}-${date}`;

  return goodD;
};

export const convertDateTimeToBackendFormat = (dat) => {
  let goodD = '';
  let tmp = new Date(dat);

  let year = tmp
    .getFullYear()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  let month = tmp
    .getMonth()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  let date = tmp
    .getDate()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  let hours = tmp
    .getHours()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  let minutes = tmp
    .getMinutes()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });
  let seconds = tmp
    .getSeconds()
    .toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false });

  let timezoneOffset = parseInt(tmp.getTimezoneOffset());
  let beyond = timezoneOffset <= 0;
  timezoneOffset = Math.abs(timezoneOffset);

  let timezoneHours = 0;
  let timezoneMinutes = 0;

  while (timezoneOffset > 0) {
    timezoneOffset -= 60;
    timezoneHours += 1;
  }

  timezoneMinutes = timezoneOffset;

  timezoneHours = timezoneHours.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  timezoneMinutes = timezoneMinutes.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  goodD = `${year}-${month}-${date} ${hours}:${minutes}:${seconds} ${
    beyond ? '+' : '-'
  }${timezoneHours}:${timezoneMinutes}`;

  return goodD;
};

export const convert = (date, absolute) => {
  const oldDate = new Date(date);
  const currentDate = new Date(generate());

  if (absolute) {
    const splitted = oldDate.toString().split(' ');

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const days = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    const year = splitted[3];
    const date = splitted[2];
    const month = months[oldDate.getMonth()];
    const day = days[oldDate.getDay()];
    const time = splitted[4];

    return `${time} - ${day}, ${date} ${month} ${year}`;
  }

  let localTerms = [
    ' years',
    ' months',
    ' days',
    ' hours',
    ' minutes',
    ' seconds',
  ];

  let ms = Math.abs(currentDate - oldDate);
  let prettyTime;

  if (ms >= 1000 * 60 * 60 * 24 * 365) {
    prettyTime = Math.floor(ms / (1000 * 60 * 60 * 24 * 365)) + localTerms[0];
  } else if (ms >= 1000 * 60 * 60 * 24 * 30) {
    prettyTime = Math.floor(ms / (1000 * 60 * 60 * 24 * 30)) + localTerms[1];
  } else if (ms >= 1000 * 60 * 60 * 24) {
    prettyTime = Math.floor(ms / (1000 * 60 * 60 * 24)) + localTerms[2];
  } else if (ms >= 1000 * 60 * 60) {
    prettyTime = Math.floor(ms / (1000 * 60 * 60)) + localTerms[3];
  } else if (ms >= 1000 * 60) {
    prettyTime = Math.floor(ms / (1000 * 60)) + localTerms[4];
  } else {
    prettyTime = Math.floor(ms / 1000) + localTerms[5];
  }

  let endString = ' ago';

  return (
    (prettyTime.split(' ')[0] === '1' ? prettyTime.slice(0, -1) : prettyTime) +
    endString
  );
};
