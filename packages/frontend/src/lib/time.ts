export async function sleep(second: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, second * 1000);
  });
}
