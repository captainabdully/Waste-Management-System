const priceService = require('../services/priceService');

class PriceController {
  async createDailyPrice(req, res) {
    try {
      const { dropping_point_id, category, price, created_by } = req.body;
      
      if (!dropping_point_id || !category || price === undefined || !created_by) {
        return res.status(400).json({ message: "All fields are required" });
      }

      await priceService.createDailyPrice(req.body);
      
      res.status(201).json({ message: "Daily price created successfully" });
    } catch (error) {
      console.error("Error creating daily price:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getTodayPricesByDroppingPoint(req, res) {
    try {
      const { dropping_point_id } = req.params;
      
      if (!dropping_point_id) {
        return res.status(400).json({ message: "dropping_point_id is required" });
      }

      const prices = await priceService.getTodayPricesByDroppingPoint(dropping_point_id);
      
      res.status(200).json({ data: prices });
    } catch (error) {
      console.error("Error fetching today's prices:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllTodayPrices(req, res) {
    try {
      const prices = await priceService.getAllTodayPrices();
      
      res.status(200).json({ data: prices });
    } catch (error) {
      console.error("Error fetching today's prices:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new PriceController();