import dayjs from 'dayjs';

export const humanizeDateReview = (date: string) => dayjs(date).format('MMMM YYYY');
