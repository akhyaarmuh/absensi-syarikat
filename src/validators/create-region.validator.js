import Joi from 'joi';

// regions -> create
export default Joi.object().keys({
  name: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z0-9\s-.]*$/)
    .messages({
      'any.required': 'Nama wilayah wajib diisi',
      'string.empty': 'Nama wilayah tidak boleh kosong',
      'string.min': 'Nama wilayah harus memiliki setidaknya 3 karakter',
      'string.max': 'Nama wilayah tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'Nama wilayah hanya boleh terdiri dari huruf dan angka',
    }),
});
