import { sql } from '../config/db.js';

class PriceService {
  async createDailyPrice(priceData) {
    const { dropping_point_id, category, price, created_by } = priceData;
    
    const result = await sql`
      INSERT INTO daily_price (dropping_point_id, category, price, created_by) 
      VALUES (${dropping_point_id}, ${category}, ${price}, ${created_by})
      RETURNING *
    `;
    
    return result[0];
  }

  async getTodayPricesByDroppingPoint(dropping_point_id) {
    return await sql`
      SELECT 
        dp.*, 
        dpp.location_name, 
        u.name as created_by_name
      FROM daily_price dp
      LEFT JOIN dropping_point dpp ON dp.dropping_point_id = dpp.id
      LEFT JOIN users u ON dp.created_by = u.user_id
      WHERE dp.dropping_point_id = ${dropping_point_id}
        AND dp.effective_date = CURRENT_DATE
      ORDER BY 
        CASE dp.category
          WHEN 'heavy' THEN 1
          WHEN 'light' THEN 2
          WHEN 'cast' THEN 3
        END
    `;
  }

  async getAllTodayPrices() {
    return await sql`
      SELECT dp.*, dpp.location_name, u.name as created_by_name
      FROM daily_price dp
      LEFT JOIN dropping_point dpp ON dp.dropping_point_id = dpp.id
      LEFT JOIN users u ON dp.created_by = u.user_id
      WHERE dp.effective_date = CURRENT_DATE
      ORDER BY dpp.location_name, dp.category
    `;
  }
}

export default new PriceService();