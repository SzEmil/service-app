export const fakeDB = {
  users: [
    {
      _id: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      username: 'yellowDuck',
      email: 'yellowDuck@wp.pl',
      token: null,
      password: '$2b$06$y6Z1tmaVzm57eCo5AUnWXeAmpnJNk45MjetPp8yvC/UoWGjDv.Wi.',
      avatarURL:
        '/avatars/SoVzddj2Z8JqNjvqVaKp7_64b59412c4ba4b95bdbc2df5_chicken.png',
      createdAt: {
        $date: '2023-07-17T19:18:42.937Z',
      },
      updatedAt: {
        $date: '2023-08-04T09:11:33.201Z',
      },
      invitations: [],
    },
    {
      _id: {
        $oid: '64c7a750fcf23829588d1286',
      },
      username: 'user',
      email: 'user@wp.pl',
      token: null,
      invitations: [],
      password: '$2b$06$mtaj20uEOp2A0E.JC/o5Y.FtMb5YvcJ1g7aJ.cTYAWqk3JfMMtULy',
      avatarURL:
        '/avatars/Vl6p0XEmnkhk-0HCUTZJ4_64c7a750fcf23829588d1286_LcjHnO14tTlOdCfFGxP9x_64b59412c4ba4b95bdbc2df5_pig.png',
      createdAt: {
        $date: '2023-07-31T12:21:36.642Z',
      },
      updatedAt: {
        $date: '2023-07-31T13:17:02.028Z',
      },
    },
  ],
  restaurants: [
    {
      _id: {
        $oid: '64b69a26808d025bb9eec758',
      },
      name: 'PizzaStory',
      icon: 'icon.img',
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      menu: [
        {
          _id: {
            $oid: '64b69a26808d025bb9eec759',
          },
          name: 'Pizza Margherita',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          price: 10.99,
          kcal: 800,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          createdAt: {
            $date: '2023-07-18T13:56:54.990Z',
          },
          updatedAt: {
            $date: '2023-08-02T15:08:20.888Z',
          },
          sold: 2,
        },
        {
          _id: {
            $oid: '64b69a27808d025bb9eec75b',
          },
          name: 'Pizza Pepperoni',
          description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
          price: 12.49,
          kcal: 900,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          createdAt: {
            $date: '2023-07-18T13:56:55.022Z',
          },
          updatedAt: {
            $date: '2023-08-02T15:08:20.944Z',
          },
          sold: 5,
        },
        {
          _id: {
            $oid: '64b69a27808d025bb9eec75d',
          },
          name: 'Pasta Carbonara',
          description: 'Pasta with creamy sauce, bacon, and Parmesan cheese',
          price: 14.99,
          kcal: 1200,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          createdAt: {
            $date: '2023-07-18T13:56:55.052Z',
          },
          updatedAt: {
            $date: '2023-08-02T15:08:21.005Z',
          },
          sold: 2,
        },
        {
          _id: {
            $oid: '64c52ba9da4a22ef47821705',
          },
          name: 'Spaghetti Bolognese',
          description:
            'Classic Italian pasta dish with meat sauce, tomatoes, and herbs',
          price: 35.99,
          kcal: 1200,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          createdAt: {
            $date: '2023-07-29T15:09:29.007Z',
          },
          updatedAt: {
            $date: '2023-08-02T15:08:21.082Z',
          },
          sold: 1,
        },
        {
          _id: {
            $oid: '64ca7dd8ae060c0f7a898b97',
          },
          name: 'BBQ Chicken Pizza',
          description:
            'A delicious fusion pizza with tender BBQ chicken, red onions, cilantro, and a tangy BBQ sauce.',
          price: 16.99,
          kcal: 1100,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          sold: 1,
          createdAt: {
            $date: '2023-08-02T16:01:28.691Z',
          },
          updatedAt: {
            $date: '2023-08-02T16:02:18.851Z',
          },
        },
        {
          _id: {
            $oid: '64ca7dd8ae060c0f7a898b99',
          },
          name: 'Vegetarian Supreme Pizza',
          description:
            'A wholesome pizza loaded with assorted vegetables such as bell peppers, mushrooms, olives, and onions',
          price: 13.99,
          kcal: 920,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          sold: 2,
          createdAt: {
            $date: '2023-08-02T16:01:28.727Z',
          },
          updatedAt: {
            $date: '2023-08-02T16:02:18.797Z',
          },
        },
        {
          _id: {
            $oid: '64ca7dd8ae060c0f7a898b9b',
          },
          name: 'Hawaiian Pizza',
          description:
            'A tropical-inspired pizza featuring ham, pineapple chunks, tomato sauce, and melted mozzarella cheese',
          price: 15.99,
          kcal: 1050,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          sold: 1,
          createdAt: {
            $date: '2023-08-02T16:01:28.757Z',
          },
          updatedAt: {
            $date: '2023-08-02T16:02:18.905Z',
          },
        },
        {
          name: "Meat Lover's Pizza",
          description:
            "A carnivore's delight, this pizza is topped with a hearty combination of pepperoni, sausage, bacon, and ground beef",
          price: 17.95,
          kcal: 1250,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          sold: 0,
          _id: {
            $oid: '64ca7ffbae060c0f7a898bd2',
          },
          createdAt: {
            $date: '2023-08-02T16:10:35.265Z',
          },
          updatedAt: {
            $date: '2023-08-02T16:10:35.265Z',
          },
        },
        {
          name: 'Mediterranean Pizza',
          description:
            'A taste of the Mediterranean with toppings like feta cheese, sun-dried tomatoes, olives, and artichoke hearts',
          price: 16.46,
          kcal: 950,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          sold: 0,
          _id: {
            $oid: '64ca7ffbae060c0f7a898bd4',
          },
          createdAt: {
            $date: '2023-08-02T16:10:35.301Z',
          },
          updatedAt: {
            $date: '2023-08-02T16:10:35.301Z',
          },
        },
        {
          name: 'Four Cheese Pizza',
          description:
            "A cheese lover's dream! This pizza is loaded with a blend of four cheeses - mozzarella, cheddar, gouda, and parmesan",
          price: 14.99,
          kcal: 890,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          sold: 0,
          _id: {
            $oid: '64ca7ffbae060c0f7a898bd6',
          },
          createdAt: {
            $date: '2023-08-02T16:10:35.331Z',
          },
          updatedAt: {
            $date: '2023-08-02T16:10:35.331Z',
          },
        },
      ],
      tables: [
        {
          _id: {
            $oid: '64ccbbbae44baace8ec240b0',
          },
          name: 'Table main',
          icon: 'icon.img',
          description: '4 people',
          orders: [
            {
              name: 'For kids',
              dishes: [
                {
                  _id: '64ca7dd8ae060c0f7a898b99',
                  name: 'Vegetarian Supreme Pizza',
                  description:
                    'A wholesome pizza loaded with assorted vegetables such as bell peppers, mushrooms, olives, and onions',
                  price: 13.99,
                  kcal: 920,
                  restaurant: '64b69a26808d025bb9eec758',
                  owner: '64b59412c4ba4b95bdbc2df5',
                  sold: 2,
                  createdAt: '2023-08-02T16:01:28.727Z',
                  updatedAt: '2023-08-02T16:02:18.797Z',
                },
                {
                  _id: '64b69a26808d025bb9eec759',
                  name: 'Pizza Margherita',
                  description:
                    'Classic pizza with tomato sauce, mozzarella, and basil',
                  price: 10.99,
                  kcal: 800,
                  restaurant: '64b69a26808d025bb9eec758',
                  owner: '64b59412c4ba4b95bdbc2df5',
                  createdAt: '2023-07-18T13:56:54.990Z',
                  updatedAt: '2023-08-02T15:08:20.888Z',
                  sold: 2,
                },
              ],
              fullKcal: 1720,
              fullPrice: 24.98,
              restaurant: {
                $oid: '64b69a26808d025bb9eec758',
              },
              owner: {
                $oid: '64b59412c4ba4b95bdbc2df5',
              },
              table: {
                $oid: '64ccbbbae44baace8ec240b0',
              },
              _id: {
                $oid: '64ccbbbae44baace8ec240b1',
              },
              __v: 0,
            },
          ],
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          createdAt: {
            $date: '2023-08-04T08:50:02.387Z',
          },
          updatedAt: {
            $date: '2023-08-04T09:10:47.112Z',
          },
        },
      ],
      createdAt: {
        $date: '2023-07-18T13:56:55.080Z',
      },
      updatedAt: {
        $date: '2023-08-04T09:10:47.121Z',
      },
      colabolators: [
        {
          $oid: '64b3ea3ee0624ce46cb376d3',
        },
        {
          $oid: '64c7a750fcf23829588d1286',
        },
        {
          $oid: '64cb5c6ffb6156eed351a4e6',
        },
      ],
      currency: '$',
      overview: {
        topDishes: [],
        totalOrders: 11,
        cashEarned: 328.17,
      },
    },
  ],
  dishes: [
    {
      _id: {
        $oid: '64b524cc0b89b70b7a3faf32',
      },
      name: 'Pizza Margherita',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      price: 10,
      kcal: 800,
      restaurant: {
        $oid: '64b524cc0b89b70b7a3faf31',
      },
      owner: {
        $oid: '64b3ea3ee0624ce46cb376d3',
      },
      createdAt: {
        $date: '2023-07-17T11:23:56.883Z',
      },
      updatedAt: {
        $date: '2023-07-17T11:23:56.883Z',
      },
    },
    {
      _id: {
        $oid: '64b524cc0b89b70b7a3faf34',
      },
      name: 'Pizza Pepperoni',
      description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
      price: 12,
      kcal: 900,
      restaurant: {
        $oid: '64b524cc0b89b70b7a3faf31',
      },
      owner: {
        $oid: '64b3ea3ee0624ce46cb376d3',
      },
      createdAt: {
        $date: '2023-07-17T11:23:56.917Z',
      },
      updatedAt: {
        $date: '2023-07-17T11:23:56.917Z',
      },
    },
    {
      _id: {
        $oid: '64b524cc0b89b70b7a3faf36',
      },
      name: 'Pasta Carbonara',
      description: 'Pasta with creamy sauce, bacon, and Parmesan cheese',
      price: 15,
      kcal: 1200,
      restaurant: {
        $oid: '64b524cc0b89b70b7a3faf31',
      },
      owner: {
        $oid: '64b3ea3ee0624ce46cb376d3',
      },
      createdAt: {
        $date: '2023-07-17T11:23:56.960Z',
      },
      updatedAt: {
        $date: '2023-07-17T11:23:56.960Z',
      },
    },
    {
      _id: {
        $oid: '64b69a18808d025bb9eec74e',
      },
      name: 'Pizza Margherita',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      price: 10,
      kcal: 800,
      restaurant: {
        $oid: '64b69a18808d025bb9eec74d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-18T13:56:40.937Z',
      },
      updatedAt: {
        $date: '2023-07-18T13:56:40.937Z',
      },
    },
    {
      _id: {
        $oid: '64b69a18808d025bb9eec750',
      },
      name: 'Pizza Pepperoni',
      description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
      price: 12,
      kcal: 900,
      restaurant: {
        $oid: '64b69a18808d025bb9eec74d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-18T13:56:40.979Z',
      },
      updatedAt: {
        $date: '2023-07-18T13:56:40.979Z',
      },
    },
    {
      _id: {
        $oid: '64b69a19808d025bb9eec752',
      },
      name: 'Pasta Carbonara',
      description: 'Pasta with creamy sauce, bacon, and Parmesan cheese',
      price: 15,
      kcal: 1200,
      restaurant: {
        $oid: '64b69a18808d025bb9eec74d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-18T13:56:41.009Z',
      },
      updatedAt: {
        $date: '2023-07-18T13:56:41.009Z',
      },
    },
    {
      _id: {
        $oid: '64b69a26808d025bb9eec759',
      },
      name: 'Pizza Margherita',
      description: 'Classic pizza with tomato sauce, mozzarella, and basil',
      price: 10.99,
      kcal: 800,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-18T13:56:54.990Z',
      },
      updatedAt: {
        $date: '2023-08-03T22:00:05.371Z',
      },
      sold: 4,
    },
    {
      _id: {
        $oid: '64b69a27808d025bb9eec75b',
      },
      name: 'Pizza Pepperoni',
      description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
      price: 12.49,
      kcal: 900,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-18T13:56:55.022Z',
      },
      updatedAt: {
        $date: '2023-08-04T09:10:47.006Z',
      },
      sold: 8,
    },
    {
      _id: {
        $oid: '64b69a27808d025bb9eec75d',
      },
      name: 'Pasta Carbonara',
      description: 'Pasta with creamy sauce, bacon, and Parmesan cheese',
      price: 14.99,
      kcal: 1200,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-18T13:56:55.052Z',
      },
      updatedAt: {
        $date: '2023-08-03T17:19:29.551Z',
      },
      sold: 4,
    },
    {
      _id: {
        $oid: '64c52ba9da4a22ef47821705',
      },
      name: 'Spaghetti Bolognese',
      description:
        'Classic Italian pasta dish with meat sauce, tomatoes, and herbs',
      price: 35.99,
      kcal: 1200,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-29T15:09:29.007Z',
      },
      updatedAt: {
        $date: '2023-08-02T15:08:21.082Z',
      },
      sold: 1,
    },
    {
      _id: {
        $oid: '64c531459ed2085af579950e',
      },
      name: 'Classic BLT',
      description: 'Bacon, lettuce, and tomato with mayo on toasted bread.',
      price: 8,
      kcal: 399,
      restaurant: {
        $oid: '64c531459ed2085af579950d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-29T15:33:25.914Z',
      },
      updatedAt: {
        $date: '2023-08-02T18:22:04.400Z',
      },
      sold: 2,
    },
    {
      _id: {
        $oid: '64c531459ed2085af5799510',
      },
      name: 'Italian Sub',
      description: 'Salami, ham, provolone, lettuce, and Italian dressing.',
      price: 10,
      kcal: 500,
      restaurant: {
        $oid: '64c531459ed2085af579950d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-29T15:33:25.956Z',
      },
      updatedAt: {
        $date: '2023-07-29T15:33:25.956Z',
      },
    },
    {
      _id: {
        $oid: '64c531459ed2085af5799512',
      },
      name: 'Veggie Delight',
      description: 'Grilled veggies, hummus, and mixed greens on whole grain.',
      price: 8,
      kcal: 350,
      restaurant: {
        $oid: '64c531459ed2085af579950d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-29T15:33:25.985Z',
      },
      updatedAt: {
        $date: '2023-07-29T15:33:25.985Z',
      },
    },
    {
      _id: {
        $oid: '64c531469ed2085af5799514',
      },
      name: 'Spicy Chicken',
      description: 'Grilled chicken, pepper jack cheese, and spicy mayo.',
      price: 9,
      kcal: 450,
      restaurant: {
        $oid: '64c531459ed2085af579950d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-29T15:33:26.015Z',
      },
      updatedAt: {
        $date: '2023-08-02T18:22:04.389Z',
      },
      sold: 1,
    },
    {
      _id: {
        $oid: '64c531469ed2085af5799516',
      },
      name: 'Turkey Avocado',
      description: 'Turkey, avocado, lettuce, and mayo on a ciabatta roll.',
      price: 8,
      kcal: 420,
      restaurant: {
        $oid: '64c531459ed2085af579950d',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-07-29T15:33:26.045Z',
      },
      updatedAt: {
        $date: '2023-07-29T15:33:26.045Z',
      },
    },
    {
      _id: {
        $oid: '64c8f588dfd798823c6f85f4',
      },
      name: 'Regular sandwitch',
      description: 'meat love',
      price: 12,
      kcal: 25.4,
      restaurant: {
        $oid: '64c8f588dfd798823c6f85f3',
      },
      owner: {
        $oid: '64b3ea3ee0624ce46cb376d3',
      },
      createdAt: {
        $date: '2023-08-01T12:07:36.343Z',
      },
      updatedAt: {
        $date: '2023-08-01T12:07:36.343Z',
      },
    },
    {
      _id: {
        $oid: '64ca7dd8ae060c0f7a898b97',
      },
      name: 'BBQ Chicken Pizza',
      description:
        'A delicious fusion pizza with tender BBQ chicken, red onions, cilantro, and a tangy BBQ sauce.',
      price: 16.99,
      kcal: 1100,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      sold: 1,
      createdAt: {
        $date: '2023-08-02T16:01:28.691Z',
      },
      updatedAt: {
        $date: '2023-08-02T16:02:18.851Z',
      },
    },
    {
      _id: {
        $oid: '64ca7dd8ae060c0f7a898b99',
      },
      name: 'Vegetarian Supreme Pizza',
      description:
        'A wholesome pizza loaded with assorted vegetables such as bell peppers, mushrooms, olives, and onions',
      price: 13.99,
      kcal: 920,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      sold: 2,
      createdAt: {
        $date: '2023-08-02T16:01:28.727Z',
      },
      updatedAt: {
        $date: '2023-08-02T16:02:18.797Z',
      },
    },
    {
      _id: {
        $oid: '64ca7dd8ae060c0f7a898b9b',
      },
      name: 'Hawaiian Pizza',
      description:
        'A tropical-inspired pizza featuring ham, pineapple chunks, tomato sauce, and melted mozzarella cheese',
      price: 15.99,
      kcal: 1050,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      sold: 1,
      createdAt: {
        $date: '2023-08-02T16:01:28.757Z',
      },
      updatedAt: {
        $date: '2023-08-02T16:02:18.905Z',
      },
    },
    {
      _id: {
        $oid: '64ca7ffbae060c0f7a898bd2',
      },
      name: "Meat Lover's Pizza",
      description:
        "A carnivore's delight, this pizza is topped with a hearty combination of pepperoni, sausage, bacon, and ground beef",
      price: 17.95,
      kcal: 1250,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      sold: 2,
      createdAt: {
        $date: '2023-08-02T16:10:35.265Z',
      },
      updatedAt: {
        $date: '2023-08-04T09:10:47.095Z',
      },
    },
    {
      _id: {
        $oid: '64ca7ffbae060c0f7a898bd4',
      },
      name: 'Mediterranean Pizza',
      description:
        'A taste of the Mediterranean with toppings like feta cheese, sun-dried tomatoes, olives, and artichoke hearts',
      price: 16.46,
      kcal: 950,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      sold: 1,
      createdAt: {
        $date: '2023-08-02T16:10:35.301Z',
      },
      updatedAt: {
        $date: '2023-08-02T18:16:33.017Z',
      },
    },
    {
      _id: {
        $oid: '64ca7ffbae060c0f7a898bd6',
      },
      name: 'Four Cheese Pizza',
      description:
        "A cheese lover's dream! This pizza is loaded with a blend of four cheeses - mozzarella, cheddar, gouda, and parmesan",
      price: 14.99,
      kcal: 890,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      sold: 1,
      createdAt: {
        $date: '2023-08-02T16:10:35.331Z',
      },
      updatedAt: {
        $date: '2023-08-02T18:16:33.004Z',
      },
    },
  ],
  tables: [
    {
      _id: {
        $oid: '64ccbbbae44baace8ec240b0',
      },
      name: 'Table main',
      icon: 'icon.img',
      description: '4 people',
      orders: [
        {
          name: 'For kids',
          dishes: [
            {
              _id: '64ca7dd8ae060c0f7a898b99',
              name: 'Vegetarian Supreme Pizza',
              description:
                'A wholesome pizza loaded with assorted vegetables such as bell peppers, mushrooms, olives, and onions',
              price: 13.99,
              kcal: 920,
              restaurant: '64b69a26808d025bb9eec758',
              owner: '64b59412c4ba4b95bdbc2df5',
              sold: 2,
              createdAt: '2023-08-02T16:01:28.727Z',
              updatedAt: '2023-08-02T16:02:18.797Z',
            },
            {
              _id: '64b69a26808d025bb9eec759',
              name: 'Pizza Margherita',
              description:
                'Classic pizza with tomato sauce, mozzarella, and basil',
              price: 10.99,
              kcal: 800,
              restaurant: '64b69a26808d025bb9eec758',
              owner: '64b59412c4ba4b95bdbc2df5',
              createdAt: '2023-07-18T13:56:54.990Z',
              updatedAt: '2023-08-02T15:08:20.888Z',
              sold: 2,
            },
          ],
          fullKcal: 1720,
          fullPrice: 24.98,
          restaurant: {
            $oid: '64b69a26808d025bb9eec758',
          },
          owner: {
            $oid: '64b59412c4ba4b95bdbc2df5',
          },
          table: {
            $oid: '64ccbbbae44baace8ec240b0',
          },
          _id: {
            $oid: '64ccbbbae44baace8ec240b1',
          },
          __v: 0,
        },
      ],
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      createdAt: {
        $date: '2023-08-04T08:50:02.387Z',
      },
      updatedAt: {
        $date: '2023-08-04T09:10:47.112Z',
      },
    },
  ],
  orders: [
    {
      _id: {
        $oid: '64c020adaaa90faf5b310b34',
      },
      name: 'Order for 2 kids',
      dishes: [
        {
          name: 'Pizza Pepperoni',
          description: 'Pizza with tomato sauce, mozzarella, and pepperoni',
          price: 12,
          kcal: 900,
          restaurant: '64b524cc0b89b70b7a3faf31',
          owner: '64b3ea3ee0624ce46cb376d3',
          _id: '64b524cc0b89b70b7a3faf34',
          createdAt: '2023-07-17T11:23:56.917Z',
          updatedAt: '2023-07-17T11:23:56.917Z',
        },
        {
          name: 'Pizza Margherita',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          price: 10,
          kcal: 800,
          restaurant: '64b69a26808d025bb9eec758',
          owner: '64b59412c4ba4b95bdbc2df5',
          _id: '64b69a26808d025bb9eec759',
          createdAt: '2023-07-18T13:56:54.990Z',
          updatedAt: '2023-07-18T13:56:54.990Z',
        },
      ],
      fullKcal: 1700,
      fullPrice: 22,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      table: {
        $oid: '64c020adaaa90faf5b310b33',
      },
      __v: 1,
    },
    {
      _id: {
        $oid: '64ccbbbae44baace8ec240b1',
      },
      name: 'For kids',
      dishes: [
        {
          _id: '64ca7dd8ae060c0f7a898b99',
          name: 'Vegetarian Supreme Pizza',
          description:
            'A wholesome pizza loaded with assorted vegetables such as bell peppers, mushrooms, olives, and onions',
          price: 13.99,
          kcal: 920,
          restaurant: '64b69a26808d025bb9eec758',
          owner: '64b59412c4ba4b95bdbc2df5',
          sold: 2,
          createdAt: '2023-08-02T16:01:28.727Z',
          updatedAt: '2023-08-02T16:02:18.797Z',
        },
        {
          _id: '64b69a26808d025bb9eec759',
          name: 'Pizza Margherita',
          description: 'Classic pizza with tomato sauce, mozzarella, and basil',
          price: 10.99,
          kcal: 800,
          restaurant: '64b69a26808d025bb9eec758',
          owner: '64b59412c4ba4b95bdbc2df5',
          createdAt: '2023-07-18T13:56:54.990Z',
          updatedAt: '2023-08-02T15:08:20.888Z',
          sold: 2,
        },
      ],
      fullKcal: 1720,
      fullPrice: 24.98,
      restaurant: {
        $oid: '64b69a26808d025bb9eec758',
      },
      owner: {
        $oid: '64b59412c4ba4b95bdbc2df5',
      },
      table: {
        $oid: '64ccbbbae44baace8ec240b0',
      },
      __v: 0,
    },
  ],
};
