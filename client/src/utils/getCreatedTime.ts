const getCreatedTime = (CreateTime: string) => {
  const timeDiff = CreateTime;
  const convertTime = new Date(timeDiff);
  const CurrntTime = new Date();
  const diffDate = CurrntTime.getTime() - convertTime.getTime();
  const result = Math.abs(diffDate / (1000 * 60 * 60 * 24));
  if (result > 1) {
    return Math.floor(result) + '일 전';
  } else if (result * 24 >= 1) {
    return Math.floor(result * 24) + '시간 전';
  } else if (result * 24 * 60 >= 1) {
    return Math.floor(result * 24 * 60) + '분 전';
  } else {
    return Math.floor(result * 24 * 60 * 60) + '초 전';
  }
};

export default getCreatedTime;
