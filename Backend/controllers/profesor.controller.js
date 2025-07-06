const Profesor = require('../models/profesor');
const profesorCtrl = {}

profesorCtrl.getProfesor = async (req, res) => {
      /*
  #swagger.tags = ['Profesores']
  #swagger.summary = 'Obtener todos los profesores'
  #swagger.description = 'Endpoint para obtener el listado completo de profesores registrados en el sistema con toda su información.'
  #swagger.responses[200] = {
    description: 'Listado de profesores obtenido exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            description: 'ID único del profesor',
            example: '60c72b2f9f1b2c001c8e4d21'
          },
          nombre: {
            type: 'string',
            description: 'Nombre del profesor',
            example: 'Mario'
          },
          apellido: {
            type: 'string',
            description: 'Apellido del profesor',
            example: 'Fariña'
          },
          espcializacion: {
            type: 'string',
            description: 'Área de especialización del profesor',
            example: 'Natación'
          },
          foto: {
            type: 'string',
            description: 'Nombre del archivo de foto del profesor',
            example: 'mario.jpg'
          },
          correo: {
            type: 'string',
            format: 'email',
            description: 'Correo electrónico del profesor',
            example: 'mario@gmail.com'
          },
          telefono: {
            type: 'string',
            description: 'Número de teléfono del profesor',
            example: '3884194234'
          },
          activo: {
            type: 'boolean',
            description: 'Estado de actividad del profesor',
            example: true
          }
        }
      }
    }
  }
  */
    var profesor = await Profesor.find();
    res.json(profesor);
}

profesorCtrl.getProfesorById = async (req, res) => {
     /*
  #swagger.tags = ['Profesores']
  #swagger.summary = 'Obtener profesor por ID'
  #swagger.description = 'Endpoint para obtener la información completa de un profesor específico mediante su ID único.'
  #swagger.parameters['id'] = {
    in: 'path',
    name: 'id',
    required: true,
    description: 'ID único del profesor a buscar',
    type: 'string',
    example: '60c72b2f9f1b2c001c8e4d21'
  }
  #swagger.responses[200] = {
    description: 'Profesor encontrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        _id: {
          type: 'string',
          description: 'ID único del profesor',
          example: '60c72b2f9f1b2c001c8e4d21'
        },
        nombre: {
          type: 'string',
          description: 'Nombre del profesor',
          example: 'Mario'
        },
        apellido: {
          type: 'string',
          description: 'Apellido del profesor',
          example: 'Fariña'
        },
        espcializacion: {
          type: 'string',
          description: 'Área de especialización del profesor',
          example: 'Natación'
        },
        foto: {
          type: 'string',
          description: 'Nombre del archivo de foto del profesor',
          example: 'mario.jpg'
        },
        correo: {
          type: 'string',
          format: 'email',
          description: 'Correo electrónico del profesor',
          example: 'mario@gmail.com'
        },
        telefono: {
          type: 'string',
          description: 'Número de teléfono del profesor',
          example: '3884194234'
        },
        activo: {
          type: 'boolean',
          description: 'Estado de actividad del profesor',
          example: true
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error en la búsqueda',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Error al buscar al profesor'
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'Profesor no encontrado',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Profesor no encontrado'
        }
      }
    }
  }
  */
    try {
        const profesor = await Profesor.findById(req.params.id);
        if (!profesor) {
            return res.status(404).json({
                status: "0",
                msg: "Profesor no encontrado",
            });
        }
        res.json(profesor);
    } catch (error) {
        res.status(400).json({
            status: "0",
            msg: "Error al buscar al profesor",
        });
    }
}

profesorCtrl.createProfesor = async (req, res) => {
     /*
  #swagger.tags = ['Profesores']
  #swagger.summary = 'Crear nuevo profesor'
  #swagger.description = 'Endpoint para registrar un nuevo profesor en el sistema.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos del profesor a registrar',
    required: true,
    schema: {
      type: 'object',
      properties: {
        nombre: {
          type: 'string',
          description: 'Nombre del profesor',
          example: 'Mario',
          required: true
        },
        apellido: {
          type: 'string',
          description: 'Apellido del profesor',
          example: 'Fariña',
          required: true
        },
        espcializacion: {
          type: 'string',
          description: 'Área de especialización',
          example: 'Natación',
          required: true
        },
        foto: {
          type: 'string',
          description: 'Nombre del archivo de foto',
          example: 'mario.jpg'
        },
        correo: {
          type: 'string',
          format: 'email',
          description: 'Correo electrónico',
          example: 'mario@gmail.com',
          required: true
        },
        telefono: {
          type: 'string',
          description: 'Número de teléfono',
          example: '3884194234'
        },
        activo: {
          type: 'boolean',
          description: 'Estado de actividad',
          example: true,
          default: true
        }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Profesor creado exitosamente',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '1'
        },
        msg: {
          type: 'string',
          example: 'Profesor guardado.'
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error en la creación',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Error procesando operacion.'
        }
      }
    }
  }
  */
    var profesor = new Profesor(req.body);
    try {
        await profesor.save();
        res.json({
            'status': '1',
            'msg': 'Profesor guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

profesorCtrl.deleteProfesor = async (req, res) => {
      /*
  #swagger.tags = ['Profesores']
  #swagger.summary = 'Eliminar profesor'
  #swagger.description = 'Endpoint para eliminar un profesor del sistema mediante su ID.'
  #swagger.parameters['id'] = {
    in: 'path',
    name: 'id',
    required: true,
    description: 'ID único del profesor a eliminar',
    type: 'string',
    example: '60c72b2f9f1b2c001c8e4d21'
  }
  #swagger.responses[200] = {
    description: 'Profesor eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '1',
          description: 'Indicador de éxito (1=éxito)'
        },
        msg: {
          type: 'string',
          example: 'Profesor removed',
          description: 'Mensaje de confirmación'
        }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Error en la eliminación',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0',
          description: 'Indicador de error (0=fallo)'
        },
        msg: {
          type: 'string',
          example: 'Error procesando la operacion',
          description: 'Mensaje de error'
        }
      }
    }
  }
  */

    try {
        await Profesor.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Profesor removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}


profesorCtrl.editProfesor = async (req, res) => {
      /*
  #swagger.tags = ['Profesores']
  #swagger.summary = 'Actualizar profesor'
  #swagger.description = 'Endpoint para actualizar los datos de un profesor existente mediante su ID.'
  
  #swagger.parameters['id'] = {
    in: 'path',
    name: 'id',
    required: true,
    description: 'ID único del profesor a actualizar',
    type: 'string',
    example: '60c72b2f9f1b2c001c8e4d21'
  }
  
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos del profesor a actualizar (solo incluir campos a modificar)',
    required: true,
    schema: {
      type: 'object',
      properties: {
        nombre: {
          type: 'string',
          description: 'Nombre del profesor',
          example: 'Mario'
        },
        apellido: {
          type: 'string',
          description: 'Apellido del profesor',
          example: 'Fariña'
        },
        espcializacion: {
          type: 'string',
          description: 'Área de especialización',
          example: 'Natación'
        },
        foto: {
          type: 'string',
          description: 'Nombre del archivo de foto',
          example: 'mario.jpg'
        },
        correo: {
          type: 'string',
          format: 'email',
          description: 'Correo electrónico',
          example: 'mario@gmail.com'
        },
        telefono: {
          type: 'string',
          description: 'Número de teléfono',
          example: '3884194234'
        },
        activo: {
          type: 'boolean',
          description: 'Estado de actividad',
          example: true
        }
      }
    }
  }
  
  #swagger.responses[200] = {
    description: 'Profesor actualizado exitosamente',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '1'
        },
        msg: {
          type: 'string',
          example: 'Profesor actualizado'
        },
        profesor: {
          type: 'object',
          properties: {
            _id: { type: 'string', example: '60c72b2f9f1b2c001c8e4d21' },
            nombre: { type: 'string', example: 'Mario' },
            apellido: { type: 'string', example: 'Fariña' },
            espcializacion: { type: 'string', example: 'Natación' },
            foto: { type: 'string', example: 'mario.jpg' },
            correo: { type: 'string', example: 'mario@gmail.com' },
            telefono: { type: 'string', example: '3884194234' },
            activo: { type: 'boolean', example: true }
          }
        }
      }
    }
  }
  
  #swagger.responses[400] = {
    description: 'Error en la actualización',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Error procesando la operación'
        },
        error: {
          type: 'string',
          example: 'Mensaje detallado del error'
        }
      }
    }
  }
  
  #swagger.responses[404] = {
    description: 'Profesor no encontrado',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Profesor no encontrado para actualizar'
        }
      }
    }
  }
  */
    try {
        const updatedProfesor = await Profesor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedProfesor) {
            return res.status(404).json({
                status: '0',
                msg: 'Profesor no encontrado para actualizar'
            });
        }

        res.json({
            status: '1',
            msg: 'Profesor actualizado',
            profesor: updatedProfesor
        });
    } catch (error) {
        res.status(400).json({
            status: '0',
            msg: 'Error procesando la operación',
            error: error.message
        });
    }
};

module.exports = profesorCtrl;