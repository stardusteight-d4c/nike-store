export function mergeArrayOfObjectsByIdProperty(array1: any, array2: any) {
  const mergeArray = array1.map((obj1: any) => ({
    ...obj1,
    ...array2.find((obj2: any) => obj2.id === obj1.id),
  }));

  return mergeArray;
}
