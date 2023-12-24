const options = {
  errors: {
    wrap: {
      label: "",
    },
  },
};
const validateRequest = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body, options);
    if (result.error) {
      return res.status(400).json({
        status: false,
        message: result.error.details[0].message,
      });
    }
    if (!req.value) {
      req.value = {};
    }
    req.value["body"] = result.value;
    next();
  };
};

export default validateRequest;
