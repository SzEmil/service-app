import Restaurant from '../service/schemas/restaurant.js';
import Dish from '../service/schemas/dish.js';
import serviceRestaurant from '../service/serviceRestaurant.js';
import Table from '../service/schemas/table.js';
import Order from '../service/schemas/order.js';
import userService from '../service/serviceUsers.js';
import Invitation from '../service/schemas/invitation.js';

const getUserRestaurants = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    const results = await serviceRestaurant.getAllUserRestaurants(_id);
    //tutaj bede sprawdzać czy dany user jest colaboraterem jesli tak to ten reslut bedzie zwracanyy dodatkowowo w responsie
    return res.status(200).json({
      status: 'OK',
      code: 200,
      ResponseBody: {
        restaurants: results,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserRestaurantById = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    const { restaurantId } = req.params;
    try {
      const result = await serviceRestaurant.getRestaurantById(
        restaurantId,
        _id
      );

      return res.status(200).json({
        status: 'OK',
        code: 200,
        ResponseBody: {
          restaurant: result,
        },
      });
    } catch (error) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found restaurant with id ${restaurantId}`,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }

    const { name, icon, menu } = req.body;

    const restaurant = await serviceRestaurant.getRestaurantByName(name, _id);

    if (restaurant) {
      return res.status(409).json({
        status: 'Conflict',
        code: 409,
        ResponseBody: {
          message: `Restaurant name ${name} already exist in your restaurants database`,
        },
      });
    }
    // Tworzenie nowej restauracji
    const newRestaurant = new Restaurant({
      name,
      icon,
      owner: _id,
      menu: [],
      tables: [],
      colabolators: [],
    });

    for (const dishData of menu) {
      const { name, description, price, kcal } = dishData;

      const newDish = new Dish({
        name,
        description,
        price,
        kcal,
        restaurant: newRestaurant._id,
        owner: req.user._id,
      });

      const savedDish = await newDish.save();
      newRestaurant.menu.push(savedDish);
    }

    const savedRestaurant = await newRestaurant.save();

    res.status(201).json({
      success: true,
      message: 'Restaurant created successfully',
      ResponseBody: {
        restaurant: savedRestaurant,
      },
    });
  } catch (error) {
    next(error);
  }
};
const createRestaurantTable = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }

    try {
      const { name, icon, description, orders } = req.body;
      const { restaurantId } = req.params;

      try {
        const restaurantById = await serviceRestaurant.getRestaurantById(
          restaurantId,
          req.user._id
        );

        // Tworzenie nowego stolika
        const newTable = new Table({
          name,
          icon,
          description,
          orders: [],
          restaurant: restaurantById._id,
          owner: req.user._id,
        });

        // Tworzenie nowego zamówienia
        for (const orderData of orders) {
          const { name, dishes } = orderData;

          const newOrder = new Order({
            name,
            dishes,
            restaurant: restaurantById._id,
            owner: req.user._id,
            table: newTable._id,
          });
          const kcalValues = newOrder.dishes.map(dish => dish.kcal);
          const fullKcal = kcalValues.reduce((total, kcal) => total + kcal, 0);

          const priceValues = newOrder.dishes.map(dish => dish.price);
          const fullPrice = priceValues.reduce(
            (total, price) => total + price,
            0
          );

          (newOrder.fullKcal = fullKcal), (newOrder.fullPrice = fullPrice);
          const savedOrder = await newOrder.save();
          newTable.orders.push(savedOrder);
        }

        await newTable.save();

        restaurantById.tables.push(newTable);
        await restaurantById.save();

        res.status(201).json({
          success: true,
          message: 'Table created successfully',
          ResponseBody: {
            Table: newTable,
          },
        });
      } catch (error) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: error.message,
          },
        });
      }
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        ResponseBody: {
          message: 'Missing fields',
        },
        code: 400,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getRestaurantInfo = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }

    try {
      const { restaurantId } = req.params;
      const restaurantById = await serviceRestaurant.getRestaurantById(
        restaurantId,
        req.user._id
      );

      const results = await serviceRestaurant.getRestaurantInfo(
        restaurantId,
        req.user._id
      );
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const getRestaurantTables = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const createInviteRestaurantColabolator = async (req, res, next) => {
  try {
    const { _id } = req.user;
    if (!_id) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        ResponseBody: {
          message: 'Unauthorized',
        },
      });
    }
    const { restaurantId } = req.params;
    try {
      const { email } = req.body;

      const foundColabolator = await userService.getUserByEmail(email);
      const invitationOwner = await userService.getUserById(_id);

      if (!foundColabolator) {
        return res.status(401).json({
          status: 'error',
          code: 401,
          ResponseBody: {
            message: `Colaborator ${email} not found`,
          },
        });
      }
      try {
        const restaurant = await serviceRestaurant.getRestaurantById(
          restaurantId,
          _id
        );
        const isInvitation =
          await serviceRestaurant.getInvitationByEmailAndRestaurantName(
            email,
            restaurant.name
          );

        if (isInvitation) {
          return res.status(401).json({
            status: 'error',
            code: 401,
            ResponseBody: {
              message: `Colaborator ${foundColabolator.email} already have invitation for your restaurant`,
            },
          });
        }


        const newInvitation = new Invitation({
          sender: invitationOwner.email,
          receiver: foundColabolator.email,
          restaurantName: restaurant.name,
          restaurantId: restaurant._id,
        });
        await newInvitation.save();
        return res.status(200).json({
          status: 'OK',
          code: 200,
          ResponseBody: {
            invitation: newInvitation,
          },
        });
      } catch (error) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found restaurant with id ${restaurantId}`,
          },
        });
      }
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const controllerRestaurant = {
  create,
  getUserRestaurants,
  getUserRestaurantById,
  getRestaurantTables,
  createRestaurantTable,
  createInviteRestaurantColabolator,
};

export default controllerRestaurant;
