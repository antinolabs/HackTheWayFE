import moment from 'moment';

export const extractDateTime = (payload) => {
  if (!payload) return '';

  const date = moment.utc(payload).format('LL');
  const time = moment.utc(payload).local().format('LT');

  const [hour, min, sec] = time.split(':');
  const format = sec && sec.match(/[a-z]/g)?.join('');
  return `${hour}:${min} , ${date}`;
};