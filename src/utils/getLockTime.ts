import { Assessment } from '../typeorm/entities/assessment.entity';

export const getLockTime = (assessmentsFromMe: Assessment[]): string | null => {
  if (!assessmentsFromMe.length) {
    return null;
  }
  const date = new Date(
    assessmentsFromMe[assessmentsFromMe.length - 1].createdAt,
  );
  const now = new Date();
  let totalSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (hours >= 24) {
    return null;
  } else {
    const reverseMinutes = String(60 - minutes).padStart(2, '0');
    const reverseHours = String(23 - hours).padStart(2, '0');
    const reverseSeconds = String(60 - seconds).padStart(2, '0');
    return `${reverseHours}:${reverseMinutes}:${reverseSeconds}`;
  }
};
