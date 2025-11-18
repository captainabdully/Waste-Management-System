const orderService = require('../services/orderService');

class OrderController {
  async createPickupOrder(req, res) {
    try {
      const { vendor_id, dropping_point_id, category, price, phone_number, quantity, comment, image } = req.body;

      if (!vendor_id || !dropping_point_id || !category || price === undefined || !phone_number || !quantity) {
        return res.status(400).json({ message: "All required fields must be provided" });
      }

      await orderService.createPickupOrder(req.body);
      
      res.status(201).json({ message: "Pickup order created successfully" });
    } catch (error) {
      console.error("Error creating pickup order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getVendorOrders(req, res) {
    try {
      const { vendor_id } = req.params;

      if (!vendor_id) {
        return res.status(400).json({ message: "vendor_id is required" });
      }

      const orders = await orderService.getVendorOrders(vendor_id);
      
      res.status(200).json({ data: orders });
    } catch (error) {
      console.error("Error fetching pickup orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllOrders(req, res) {
    try {
      const orders = await orderService.getAllOrders();
      
      res.status(200).json({
        message: "Pickup orders fetched successfully",
        data: orders
      });
    } catch (error) {
      console.error("Error fetching pickup orders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, assigned_to } = req.body;

      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }

      const updated = await orderService.updateOrderStatus(id, status, assigned_to);
      
      if (!updated) {
        return res.status(404).json({ message: "Pickup order not found" });
      }

      res.status(200).json({ 
        message: "Pickup order updated successfully", 
        data: updated 
      });
    } catch (error) {
      console.error("Error updating pickup order:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async recordOrderCompletion(req, res) {
    try {
      const { order_id, completed_by, completion_notes } = req.body;

      if (!order_id || !completed_by) {
        return res.status(400).json({ message: "Order ID and completed_by are required" });
      }

      await orderService.recordOrderCompletion(req.body);
      
      res.status(201).json({ message: "Order completion recorded successfully" });
    } catch (error) {
      console.error("Error recording order completion:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = new OrderController();