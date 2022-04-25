export const timestamp = () => {
  const dateWithouthSecond = new Date();
  return dateWithouthSecond.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}