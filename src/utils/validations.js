export const validationNames = (values) => {
  !values.name
    ? (errors.name = "Ingresa tu Nombre")
    : !/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name) &&
      (errors.name = "El nombre solo puede contener letras y espacios");
};
