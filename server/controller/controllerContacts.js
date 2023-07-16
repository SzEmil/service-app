import contactService from '../service/serviceContacts.js';
import userService from '../service/serviceUsers.js';

const getAll = async (req, res, next) => {
  try {
    const results = await contactService.getAllContacts();

    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        contacts: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const get = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const favorite = req.query.favorite;

    const results = await contactService.getPaginationContacts(
      page,
      limit,
      favorite
    );
    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        contacts: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const results = await contactService.getContactById(req.params.contactId);

    if (!results)
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: `Not found task with id ${req.params.contactId}`,
        data: 'Not Found',
      });

    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        contact: results,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const create = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { _id } = req.user;
  try {
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      const result = await contactService.createContact({
        name,
        email,
        phone,
        owner: user._id,
      });

      res.status(201).json({
        status: 'succes',
        code: 201,
        ResponseBody: {
          contact: result,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      const result = await contactService.removeContact(
        req.params.contactId,
        user._id
      );

      if (!result)
        return res.status(404).json({
          status: 'error',
          code: 404,
          message: 'Not found',
        });

      res.status(200).json({
        status: 'succes',
        code: 200,
        message: 'contact deleted successfully',
        ResponseBody: {
          contact: result,
        },
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      if (!req.body)
        return res.status(400).json({
          status: 'error',
          message: 'missing fields',
          code: 400,
        });

      try {
        const existingContact = await contactService.getContactById(
          req.params.contactId
        );

        if (!existingContact)
          return res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found task with id ${req.params.contactId}`,
          });
        const { name, email, phone } = req.body;
        const result = await contactService.updateContact(
          req.params.contactId,
          {
            name,
            email,
            phone,
          },
          user._id
        );
        res.status(200).json({
          status: 'success',
          code: 200,
          ResponseBody: {
            contact: result,
          },
        });
      } catch (error) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: error.message,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await userService.getUserById(_id);
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    try {
      if (!req.body)
        return res.status(400).json({
          status: 'error',
          message: 'missing fields',
          code: 400,
        });

      try {
        const existingContact = await contactService.getContactById(
          req.params.contactId
        );

        if (!existingContact)
          return res.status(404).json({
            status: 'error',
            code: 404,
            message: `Not found task with id ${req.params.contactId}`,
          });
        const { favorite } = req.body;
        const result = await contactService.updateContact(
          req.params.contactId,
          {
            favorite,
          },
          user._id
        );
        res.status(200).json({
          status: 'success',
          code: 200,
          data: {
            contact: result,
          },
        });
      } catch (error) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: error.message,
        });
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  } catch (error) {
    next(error);
  }
};
const contactsController = {
  getAll,
  get,
  getById,
  create,
  remove,
  update,
  updateStatus,
};
export default contactsController;
