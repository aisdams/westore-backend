export const expiresInSeconds = (seconds: number) => {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    return date;
  };
  