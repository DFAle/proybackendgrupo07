const Rol = require("../models/rol");
const rolCtrl = {};

rolCtrl.getRoles = async (req, res) => {
      /*
  #swagger.tags = ['Roles']
  #swagger.summary = 'Obtener todos los roles'
  #swagger.description = 'Endpoint para obtener el listado completo de roles disponibles en el sistema.'
  #swagger.responses[200] = {
    description: 'Listado de roles obtenido exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '60c72b2f9f1b2c001c8e4d20'
          },
          tipo: {
            type: 'string',
            example: 'Administrador'
          }
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Error al cargar los roles'
        }
      }
    }
  }
  */
    try {
        const roles = await Rol.find();
        res.json(roles);
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error al cargar los roles'
        });
    }
};

rolCtrl.createRol = async (req, res) => {
      /*
  #swagger.tags = ['Roles']
  #swagger.summary = 'Crear un nuevo rol'
  #swagger.description = 'Endpoint para registrar un nuevo rol en el sistema.'
  #swagger.parameters['body'] = {
    in: 'body',
    description: 'Datos del rol a crear',
    required: true,
    schema: {
      type: 'object',
      properties: {
        tipo: {
          type: 'string',
          description: 'Nombre/tipo del rol',
          example: 'Administrador'
        }
      },
      required: ['tipo']
    }
  }
  #swagger.responses[200] = {
    description: 'Rol creado exitosamente',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '1'
        },
        msg: {
          type: 'string',
          example: 'Rol guardado'
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
          example: 'Error al guardar el rol'
        }
      }
    }
  }
  */
    const rol = new Rol(req.body);
    try {
        await rol.save();
        res.json({
            'status': '1',
            'msg': 'Rol guardado'
        });
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error al guardar el rol'
        });
    }
};


rolCtrl.deleteRol = async (req, res) => {
     /*
  #swagger.tags = ['Roles']
  #swagger.summary = 'Eliminar un rol'
  #swagger.description = 'Endpoint para eliminar un rol existente del sistema mediante su ID.'
  #swagger.parameters['id'] = {
    in: 'path',
    name: 'id',
    required: true,
    description: 'ID único del rol a eliminar',
    type: 'string',
    example: '60c72b2f9f1b2c001c8e4d20'
  }
  #swagger.responses[200] = {
    description: 'Rol eliminado exitosamente',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '1'
        },
        msg: {
          type: 'string',
          example: 'Rol eliminado con éxito'
        }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'Rol no encontrado',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Rol no encontrado'
        }
      }
    }
  }
  #swagger.responses[500] = {
    description: 'Error interno del servidor',
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: '0'
        },
        msg: {
          type: 'string',
          example: 'Error al eliminar el rol'
        }
      }
    }
  }
  */
    const { id } = req.params;
    try {
        const rolEliminado = await Rol.findByIdAndDelete(id);
        if (!rolEliminado) {
            return res.status(404).json({
                'status': '0',
                'msg': 'Rol no encontrado'
            });
        }
        res.json({
            'status': '1',
            'msg': 'Rol eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({
            'status': '0',
            'msg': 'Error al eliminar el rol'
        });
    }
};

module.exports = rolCtrl;
