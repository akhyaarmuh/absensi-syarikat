import Joi from 'joi';

// regions -> create
export default Joi.object().keys({
  name: Joi.string()
    .trim()
    .required()
    .min(3)
    .max(25)
    .pattern(/^[a-zA-Z\s-.]*$/)
    .messages({
      'any.required': 'Nama wajib diisi',
      'string.empty': 'Nama tidak boleh kosong',
      'string.min': 'Nama harus memiliki setidaknya 3 karakter',
      'string.max': 'Nama tidak boleh lebih dari 25 karakter',
      'string.pattern.base': 'Nama hanya boleh terdiri dari huruf',
    }),
  type: Joi.string().required().valid('dzikiran', 'kematian').messages({
    'any.required': 'Jenis kegiatan wajib diisi',
  }),
  description: Joi.string()
    .trim()
    .min(3)
    .max(125)
    .empty('')
    .pattern(/^[a-zA-Z0-9\s-.,]*$/)
    .messages({
      'string.min': 'Keterangan harus memiliki setidaknya 2 karakter',
      'string.max': 'Keterangan tidak boleh lebih dari 125 karakter',
      'string.pattern.base': 'Keterangan hanya boleh terdiri dari huruf dan angka',
    }),
});
