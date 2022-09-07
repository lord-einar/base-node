const esAdminRole = (req, res, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se intetna verificar role sin haber verificado el token",
    });
  }

  const { role, nombre } = req.usuario;

  if (role != "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no tiene permisos para realizar esta acción`,
    });
  }

  next();
};

const tieneRole = (...role) => {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(500).json({
        msg: "Se intetna verificar role sin haber verificado el token",
      });
    }

    if (!role.includes(req.usuario.role))
      return res.status(401).json({
        msg: `Se requiere ${role} para ejecutar esta acción`,
      });

    next();
  };
};

module.exports = {
  esAdminRole,
  tieneRole,
};
