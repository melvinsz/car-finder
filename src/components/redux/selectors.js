export const selectCarsList = (state) => state.cars.cars.items;
export const selectFilterValue = (state) => state.cars.filter;

export const selectIsLoading = (state) => state.cars.isLoading;
export const selectError = (state) => state.cars.error;
