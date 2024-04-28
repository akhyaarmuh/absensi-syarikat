import Joi from 'joi';

// regions -> create
export default Joi.object().keys({
  no_induk: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z0-9]*$/)
    .messages({
      'any.required': 'No. induk wajib diisi',
      'string.empty': 'No. induk tidak boleh kosong',
      'string.min': 'No. induk harus memiliki setidaknya 3 karakter',
      'string.max': 'No. induk tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'No. induk hanya boleh terdiri dari huruf dan angka',
    }),
  full_name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z\s.]*$/)
    .messages({
      'any.required': 'Nama lengkap wajib diisi',
      'string.empty': 'Nama lengkap tidak boleh kosong',
      'string.min': 'Nama lengkap harus memiliki setidaknya 3 karakter',
      'string.max': 'Nama lengkap tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'Nama lengkap hanya boleh terdiri dari huruf',
    }),
  birth: Joi.date().required(),
  father_name: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z\s.]*$/)
    .messages({
      'any.required': 'Nama orangtua wajib diisi',
      'string.empty': 'Nama orangtua tidak boleh kosong',
      'string.min': 'Nama orangtua harus memiliki setidaknya 3 karakter',
      'string.max': 'Nama orangtua tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'Nama orangtua hanya boleh terdiri dari huruf',
    }),
  address: Joi.string()
    .required()
    .trim()
    .min(3)
    .max(125)
    .pattern(/^[a-zA-Z0-9\s-.,]*$/)
    .messages({
      'any.required': 'Alamat wajib diisi',
      'string.empty': 'Alamat tidak boleh kosong',
      'string.min': 'Alamat harus memiliki setidaknya 3 karakter',
      'string.max': 'Alamat tidak boleh lebih dari 125 karakter',
      'string.pattern.base': 'Alamat hanya boleh terdiri dari huruf dan angka',
    }),
  region_id: Joi.number().required().messages({
    'any.required': 'Wilayah anggota wajib diisi',
  }),
  status: Joi.string().valid('new', 'active', 'not active', 'repeat'),
});
