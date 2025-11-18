import { sql } from '../config/db.js';

class OrderService {
  async createPickupOrder(orderData) {
    const { vendor_id, dropping_point_id, category, price, phone_number, quantity, comment, image } = orderData;
    
    const result = await sql`
      INSERT INTO pickup_order (vendor_id, dropping_point_id, category, price, phone_number, quantity, comment, image)
      VALUES (${vendor_id}, ${dropping_point_id}, ${category}, ${price}, ${phone_number}, ${quantity}, ${comment}, ${image})
      RETURNING *
    `;
    
    return result[0];
  }

  async getVendorOrders(vendor_id) {
    return await sql`
      SELECT po.*, dp.location_name, u.name as vendor_name
      FROM pickup_order po
      LEFT JOIN dropping_point dp ON po.dropping_point_id = dp.id
      LEFT JOIN users u ON po.vendor_id = u.user_id
      WHERE po.vendor_id = ${vendor_id}
      ORDER BY po.created_at DESC
    `;
  }

  async getAllOrders() {
    return await sql`
      SELECT 
        po.*, 
        dp.location_name,
        v.name as vendor_name,
        m.name as assigned_manager_name
      FROM pickup_order po
      LEFT JOIN dropping_point dp ON po.dropping_point_id = dp.id
      LEFT JOIN users v ON po.vendor_id = v.user_id
      LEFT JOIN users m ON po.assigned_to = m.user_id
      ORDER BY po.created_at DESC
    `;
  }

  async updateOrderStatus(id, status, assigned_to) {
    const updated = await sql`
      UPDATE pickup_order
      SET 
        status = ${status},
        assigned_to = ${assigned_to},
        completed_at = ${status === 'completed' ? new Date() : null}
      WHERE id = ${id}
      RETURNING *
    `;
    
    return updated[0];
  }

  async recordOrderCompletion(completionData) {
    const { order_id, completed_by, completion_notes } = completionData;
    
    const result = await sql`
      INSERT INTO order_completion (order_id, completed_by, completion_notes)
      VALUES (${order_id}, ${completed_by}, ${completion_notes})
      RETURNING *
    `;
    
    return result[0];
  }
}

export default new OrderService();