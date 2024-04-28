export const createResponse = (data) => {
  const errors = {};

  data.forEach(({ context, message }) => {
    errors[context.label] = message;
  });

  return errors;
};
