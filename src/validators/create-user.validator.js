import Joi from 'joi';

// auth -> SIGN-UP
export default Joi.object().keys({
  full_name: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z\s.]*$/)
    .messages({
      'any.required': 'Nama lengkap wajib diisi',
      'string.empty': 'Nama lengkap tidak boleh kosong',
      'string.min': 'Nama lengkap harus memiliki setidaknya 2 karakter',
      'string.max': 'Nama lengkap tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'Nama lengkap hanya boleh terdiri dari huruf',
    }),
  email: Joi.string()
    .trim()
    .lowercase()
    .required()
    .min(6)
    .max(128)
    .pattern(/^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/)
    .messages({
      'any.required': 'Email wajib diisi',
      'string.empty': 'Email tidak boleh kosong',
      'string.min': 'Email harus memiliki setidaknya 6 karakter',
      'string.max': 'Email tidak boleh lebih dari 128 karakter',
      'string.pattern.base': 'Email tidak benar',
    }),
  password: Joi.string()
    .trim()
    .required()
    .min(7)
    .max(20)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&_]*$/)
    .messages({
      'any.required': 'Katasandi wajib diisi',
      'string.empty': 'Katasandi tidak boleh kosong',
      'string.min': 'Katasandi harus memiliki setidaknya 7 karakter',
      'string.max': 'Katasandi tidak boleh lebih dari 20 karakter',
      'string.pattern.base':
        'Katasandi harus memiliki setidaknya satu huruf besar, huruf kecil dan angka',
    }),
});
