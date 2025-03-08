import { Handler } from '@netlify/functions';
import { storage } from '../../server/storage';

export const handler: Handler = async (event) => {
  const path = event.path.replace('/.netlify/functions/api', '');

  try {
    switch (path) {
      case '/api/dashboard': {
        const [users, newSignups, orders, recentOrders, topStores] = await Promise.all([
          storage.getUsers(),
          storage.getNewSignups(30),
          storage.getOrders(),
          storage.getRecentOrders(5),
          storage.getTopStores(),
        ]);

        return {
          statusCode: 200,
          body: JSON.stringify({
            totalUsers: users.length,
            newSignups,
            totalOrders: orders.length,
            pendingApprovals: orders.filter(o => o.status === "pending").length,
            recentOrders,
            topStores,
          }),
        };
      }

      case '/api/orders': {
        const [orders, users, stores] = await Promise.all([
          storage.getOrders(),
          storage.getUsers(),
          storage.getTopStores(),
        ]);

        const usersMap = new Map(users.map(u => [u.id, u]));
        const storesMap = new Map(stores.map(s => [s.id, s]));

        const ordersWithDetails = orders.map(order => ({
          id: order.orderId,
          buyer: {
            name: usersMap.get(order.customerId)?.username || "Unknown",
            avatar: usersMap.get(order.customerId)?.avatar || "",
          },
          seller: {
            name: storesMap.get(1)?.name || "Unknown",
            avatar: storesMap.get(1)?.avatar || "",
          },
          date: order.createdAt,
          amount: order.amount,
          status: order.status,
        }));

        const completed = orders.filter(o => o.status === "completed").length;
        const pending = orders.filter(o => o.status === "pending").length;
        const cancelled = orders.filter(o => o.status === "cancelled").length;

        return {
          statusCode: 200,
          body: JSON.stringify({
            totalOrders: orders.length,
            completedOrders: completed,
            pendingOrders: pending,
            cancelledOrders: cancelled,
            orders: ordersWithDetails,
          }),
        };
      }

      default:
        return {
          statusCode: 404,
          body: JSON.stringify({ error: 'Not Found' }),
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}; 