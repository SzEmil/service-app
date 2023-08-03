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

    const { name, icon, menu, currency } = req.body;

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
    const newRestaurant = new Restaurant({
      name,
      icon,
      owner: _id,
      menu: [],
      tables: [],
      colabolators: [],
      currency,
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
          ResponseBody: {
            message: 'Table created successfully',
            table: newTable,
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

const updateRestaurantTable = async (req, res, next) => {
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
      const { name, icon, description, orders, tableId, ordersToDelete } =
        req.body;
      const { restaurantId } = req.params;

      try {
        const restaurantById = await serviceRestaurant.getRestaurantById(
          restaurantId,
          req.user._id
        );

        const table = await serviceRestaurant.getRestaurantTableById(
          restaurantId,
          tableId
        );

        const restaurantTableIndex = restaurantById.tables.findIndex(
          table => table._id === tableId
        );

        //dla każdego id z tablicy orders toDelete trzeba usunąć order
        if (ordersToDelete.length > 0) {
          for (const orderToDelete of ordersToDelete) {
            const orderIndexToRemove = table.orders.findIndex(
              order => order._id === orderToDelete
            );
            table.orders.splice(orderIndexToRemove, 1);

            await serviceRestaurant.removeRestaurantTableOrderById(
              restaurantId,
              tableId,
              orderToDelete
            );
          }
        }

        table.name = name;
        table.icon = icon;
        table.description = description;

        for (const orderData of orders) {
          if (!orderData._id) {
            const { name, dishes } = orderData;

            const newOrder = new Order({
              name,
              dishes,
              restaurant: restaurantById._id,
              owner: req.user._id,
              table: table._id,
            });
            const kcalValues = newOrder.dishes.map(dish => dish.kcal);
            const fullKcal = kcalValues.reduce(
              (total, kcal) => total + kcal,
              0
            );

            const priceValues = newOrder.dishes.map(dish => dish.price);
            const fullPrice = priceValues.reduce(
              (total, price) => total + price,
              0
            );

            newOrder.fullKcal = fullKcal;
            newOrder.fullPrice = fullPrice;
            const savedOrder = await newOrder.save();
            table.orders.push(savedOrder);
          } else {
            const orderToUpdate =
              await serviceRestaurant.getRestaurantTableOrderById(
                restaurantId,
                tableId,
                orderData._id
              );

            const { name, dishes } = orderData;

            orderToUpdate.name = name;
            orderToUpdate.dishes = dishes;

            const kcalValues = orderToUpdate.dishes.map(dish => dish.kcal);
            const fullKcal = kcalValues.reduce(
              (total, kcal) => total + kcal,
              0
            );

            const priceValues = orderToUpdate.dishes.map(dish => dish.price);
            const fullPrice = priceValues.reduce(
              (total, price) => total + price,
              0
            );

            orderToUpdate.fullKcal = fullKcal;
            orderToUpdate.fullPrice = fullPrice;

            await orderToUpdate.save();

            const orderIndexToUpdate = table.orders.findIndex(
              orderRestaurant => orderRestaurant._id == orderData._id
            );

            table.orders.splice(orderIndexToUpdate, 1, orderToUpdate);
          }
        }

        restaurantById.tables.splice(restaurantTableIndex, 1, table);
        await restaurantById.save();
        await table.save();

        res.status(201).json({
          success: true,
          ResponseBody: {
            message: 'Table updated successfully',
            table: table,
            restaurantId: restaurantId,
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
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Colaborator ${email} not found`,
          },
        });
      }
      console.log('restaurantId: ', restaurantId);
      const restaurant = await serviceRestaurant.getUserRestaurantById(
        restaurantId,
        _id
      );

      if (!restaurant) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Restaurant ${restaurantId} not found`,
          },
        });
      }
      const isInvitation =
        await serviceRestaurant.getInvitationByEmailAndRestaurantName(
          email,
          restaurant.name
        );

      if (isInvitation) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Colaborator ${foundColabolator.email} already have invitation for your restaurant`,
          },
        });
      }
      const isRestaurantOwner = await serviceRestaurant.getRestaurantsByOwner(
        foundColabolator._id,
        restaurant._id
      );

      if (isRestaurantOwner) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `User ${foundColabolator.email} is owner of this restaurant`,
          },
        });
      }

      const isRestaurantColabolator =
        await serviceRestaurant.getRestaurantByColabolator(
          foundColabolator._id,
          restaurantId
        );

      if (isRestaurantColabolator) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `User ${foundColabolator.email} is already a member of this restaurant`,
          },
        });
      }

      if (invitationOwner._id === foundColabolator._id) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `You cant invite yourself to restaurant`,
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
          message: `User ${foundColabolator.email} was invited successfully`,
          invitation: newInvitation,
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const removeColabolatorRestaurant = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
      const { restaurantId } = req.params;
      const restaurant = await serviceRestaurant.getRestaurantOnlyById(
        restaurantId
      );
      if (!restaurant) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found restaurant with id ${restaurantId}`,
          },
        });
      }
      const indexToRemove = restaurant.colabolators.findIndex(colabolator =>
        colabolator.equals(user._id)
      );

      if (indexToRemove === -1) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found colabolator in restaurant ${restaurant.name} with id ${user._id}`,
          },
        });
      }
      restaurant.colabolators.splice(indexToRemove, 1);
      restaurant.save();
      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          message: 'Colabolator was successfully removed',
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const completeOrder = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
    const { restaurantId } = req.params;
    const { orderId, tableId } = req.body;

    const restaurant = await serviceRestaurant.getRestaurantOnlyById(
      restaurantId
    );
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found restaurant with id ${restaurantId}`,
        },
      });
    }
    const table = await serviceRestaurant.getRestaurantTableById(
      restaurantId,
      tableId
    );
    if (!table) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found table with id ${tableId}`,
        },
      });
    }

    const order = await serviceRestaurant.getRestaurantTableOrderById(
      restaurantId,
      tableId,
      orderId
    );
    if (!order) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found order with id ${orderId}`,
        },
      });
    }
    for (const dish of order.dishes) {
      const foundDish = await serviceRestaurant.getDishOnlyById(
        dish._id,
        restaurantId
      );

      foundDish.sold += 1;
      await foundDish.save();
    }

    restaurant.overview.totalOrders += 1;
    restaurant.overview.cashEarned += Number(order.fullPrice.toFixed(2));

    const restaurantTableIndex = restaurant.tables.findIndex(
      tableToDelete => tableToDelete._id == tableId
    );

    const orderIndexToRemove = table.orders.findIndex(
      order => order._id == orderId
    );
    table.orders.splice(orderIndexToRemove, 1);

    restaurant.tables.splice(restaurantTableIndex, 1, table);

    await serviceRestaurant.removeRestaurantTableOrderById(
      restaurantId,
      table._id,
      order._id
    );

    await table.save();
    await restaurant.save();
    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'Order completed successfully',
        data: restaurant,
      },
    });
  } catch (error) {
    next(error);
  }
};

const removeRestaurantTable = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
    const { restaurantId } = req.params;
    const { tableId } = req.body;

    const restaurant = await serviceRestaurant.getRestaurantOnlyById(
      restaurantId
    );
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found restaurant with id ${restaurantId}`,
        },
      });
    }
    const table = await serviceRestaurant.getRestaurantTableById(
      restaurantId,
      tableId
    );
    if (!table) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found table with id ${tableId}`,
        },
      });
    }

    const restaurantTableIndex = restaurant.tables.findIndex(
      tableToDelete => tableToDelete._id == tableId
    );
    restaurant.tables.splice(restaurantTableIndex, 1);

    await serviceRestaurant.removeRestaurantTable(restaurantId, tableId);
    await restaurant.save();
    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        message: 'Table finished successfully',
        restaurant: restaurant,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurantTables = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
    const { restaurantId } = req.params;

    const restaurant = await serviceRestaurant.getRestaurantOnlyById(
      restaurantId
    );
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found restaurant with id ${restaurantId}`,
        },
      });
    }
    const tables = await serviceRestaurant.getRestaurantTables(restaurantId);

    if (!tables) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `tables no found`,
        },
      });
    }

    restaurant.tables = tables;

    restaurant.save();

    res.status(200).json({
      status: 'success',
      code: 200,
      ResponseBody: {
        tables: restaurant.tables,
      },
    });
  } catch (error) {
    next(error);
  }
};

const getRestaurantColabolatorsAndOwner = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
    const { restaurantId } = req.params;

    const restaurant = await serviceRestaurant.getRestaurantOnlyById(
      restaurantId
    );
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found restaurant with id ${restaurantId}`,
        },
      });
    }
    try {
      const colabolators = restaurant.colabolators;
      let userColabolators = [];

      for (const colabolator of colabolators) {
        const foundColabolator = await userService.getUserById(colabolator);
        userColabolators.push(foundColabolator);
      }

      const ownerId = restaurant.owner;
      const owner = await userService.getUserById(ownerId);

      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          restaurantData: {
            colabolators: userColabolators,
            owner,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const updateRestaurantMenu = async (req, res, next) => {
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
      const { menu, dishesToDelete } = req.body;
      const { restaurantId } = req.params;

      try {
        const restaurantById = await serviceRestaurant.getRestaurantById(
          restaurantId,
          req.user._id
        );
        if (dishesToDelete.length > 0) {
          for (const dishToDelete of dishesToDelete) {
            const dishIndexToRemove = restaurantById.menu.findIndex(
              dish => dish._id === dishToDelete
            );
            restaurantById.menu.splice(dishIndexToRemove, 1);
          }
          await serviceRestaurant.removeDishesFromRestaurant(
            dishesToDelete,
            restaurantId
          );
        }

        for (const dishData of menu) {
          if (!dishData._id) {
            const { name, description, price, kcal } = dishData;

            const newDish = new Dish({
              name,
              description,
              price,
              kcal,
              restaurant: restaurantById._id,
              owner: req.user._id,
            });

            restaurantById.menu.push(newDish);
            await newDish.save();
          } else {
            const dishToUpdate = await serviceRestaurant.getDishOnlyById(
              dishData._id,
              restaurantId
            );

            const { name, description, price, kcal } = dishData;

            dishToUpdate.name = name;
            dishToUpdate.description = description;
            dishToUpdate.price = price;
            dishToUpdate.kcal = kcal;

            await dishToUpdate.save();

            const dishIndexToUpdate = restaurantById.menu.findIndex(
              dishRestaurant => dishRestaurant._id == dishData._id
            );

            restaurantById.menu.splice(dishIndexToUpdate, 1, dishToUpdate);
          }
        }

        await restaurantById.save();

        res.status(201).json({
          success: true,
          ResponseBody: {
            message: 'Menu updated successfully',
            menu: restaurantById.menu,
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

const removeRestaurant = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
      const { restaurantId } = req.params;
      const restaurant = await serviceRestaurant.getRestaurantOnlyById(
        restaurantId
      );
      if (!restaurant) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found restaurant with id ${restaurantId}`,
          },
        });
      }
      const dishesToDelete = restaurant.menu.map(dish => dish._id);
      await serviceRestaurant.removeDishesFromRestaurant(
        dishesToDelete,
        restaurantId
      );
      const removeRestaurant = serviceRestaurant.removeRestaurant(
        user._id,
        restaurantId
      );
      if (!removeRestaurant) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `User ${user.email} is not allowed to remove`,
          },
        });
      }

      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          message: 'Restaurant was successfully removed',
          restaurantId: removeRestaurant._id,
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const editTableOrder = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
      const { restaurantId } = req.params;
      const restaurant = await serviceRestaurant.getRestaurantOnlyById(
        restaurantId
      );
      if (!restaurant) {
        return res.status(404).json({
          status: 'error',
          code: 404,
          ResponseBody: {
            message: `Not found restaurant with id ${restaurantId}`,
          },
        });
      }
      const { orders } = req.body;

      if (!orders) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          ResponseBody: {
            message: `Missing fields`,
          },
        });
      }
      let orderToSend = {};

      const table = await serviceRestaurant.getRestaurantTableById(
        restaurantId,
        orders[0].table
      );

      if (!table) {
        return res.status(400).json({
          status: 'error',
          code: 400,
          ResponseBody: {
            message: `This table does not exist}`,
          },
        });
      }
      for (const order of orders) {
        const foundOrder = await serviceRestaurant.getRestaurantTableOrderById(
          restaurantId,
          order.table,
          order._id
        );
        foundOrder.name = order.name;
        foundOrder.dishes = order.dishes;

        const kcalValues = order.dishes.map(dish => dish.kcal);
        const fullKcal = kcalValues.reduce((total, kcal) => total + kcal, 0);

        const priceValues = order.dishes.map(dish => dish.price);
        const fullPrice = priceValues.reduce(
          (total, price) => total + price,
          0
        );

        foundOrder.fullPrice = fullPrice;
        foundOrder.fullKcal = fullKcal;

        const tableIndex = restaurant.tables.findIndex(tableToFind =>
          tableToFind._id.equals(table._id)
        );

        const indexToUpdateFromRestaurant = restaurant.tables[
          tableIndex
        ].orders.findIndex(orderToFind => orderToFind._id.equals(order._id));

        restaurant.tables[tableIndex].orders.splice(
          indexToUpdateFromRestaurant,
          1,
          order
        );

        table.orders.splice(indexToUpdateFromRestaurant, 1, order);

        await restaurant.save();
        await table.save();
        await foundOrder.save();
        orderToSend = foundOrder;
      }

      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          message: 'Order was successfully updated.',
          orderData: {
            order: orderToSend,
            tableId: table._id,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const getRestaurantOverview = async (req, res, next) => {
  try {
    const { _id } = req.user;
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
    const { restaurantId } = req.params;

    const restaurant = await serviceRestaurant.getRestaurantOnlyById(
      restaurantId
    );
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        ResponseBody: {
          message: `Not found restaurant with id ${restaurantId}`,
        },
      });
    }
    try {
      const dishes = await serviceRestaurant.getAllRestaurantDishes(
        restaurantId
      );

      const sortedDishes = dishes.sort((a, b) => b.sold - a.sold);

      const overviewData = {
        totalOrders: restaurant.overview.totalOrders,
        cashEarned: restaurant.overview.cashEarned,
        topDishes: [...sortedDishes],
      };

      return res.status(200).json({
        status: 'success',
        ResponseBody: {
          overviewData,
        },
      });
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const controllerRestaurant = {
  create,
  editTableOrder,
  getUserRestaurants,
  getUserRestaurantById,
  createRestaurantTable,
  createInviteRestaurantColabolator,
  removeColabolatorRestaurant,
  completeOrder,
  updateRestaurantTable,
  removeRestaurantTable,
  getRestaurantColabolatorsAndOwner,
  updateRestaurantMenu,
  removeRestaurant,
  getRestaurantTables,
  getRestaurantOverview,
};

export default controllerRestaurant;
