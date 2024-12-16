export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 11) {
    return 'morning';
  } else if (hour >= 11 && hour < 14) {
    return 'noon';
  } else if (hour >= 14 && hour < 18) {
    return 'afternoon';
  } else {
    return 'night';
  }
};
