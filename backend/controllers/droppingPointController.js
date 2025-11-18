import droppingPointService from '../services/droppingPointService.js';

class DroppingPointController {
  async createDroppingPoint(req, res) {
    try {
      const { location_name, user_id } = req.body;

      if (!location_name || !user_id) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const newPoint = await droppingPointService.createDroppingPoint(location_name, user_id);
      
      res.status(201).json({
        message: "Dropping point created successfully",
        data: newPoint
      });
    } catch (error) {
      console.error("Error creating dropping point:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAllDroppingPoints(req, res) {
    try {
      const points = await droppingPointService.getAllDroppingPoints();
      
      res.status(200).json({
        message: "Dropping points fetched successfully",
        data: points
      });
    } catch (error) {
      console.error("Error fetching dropping points:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async getDroppingPointById(req, res) {
    try {
      const { id } = req.params;
      const point = await droppingPointService.getDroppingPointById(id);
      
      if (!point) {
        return res.status(404).json({ message: "Dropping point not found" });
      }

      res.status(200).json({
        message: "Dropping point found",
        data: point
      });
    } catch (error) {
      console.error("Error fetching dropping point:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async updateDroppingPoint(req, res) {
    try {
      const { id } = req.params;
      const { location_name } = req.body;

      if (!location_name) {
        return res.status(400).json({ message: "location_name is required" });
      }

      const updated = await droppingPointService.updateDroppingPoint(id, location_name);
      
      if (!updated) {
        return res.status(404).json({ message: "Dropping point not found" });
      }

      res.status(200).json({
        message: "Dropping point updated successfully",
        data: updated
      });
    } catch (error) {
      console.error("Error updating dropping point:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async deleteDroppingPoint(req, res) {
    try {
      const { id } = req.params;
      const removed = await droppingPointService.deleteDroppingPoint(id);
      
      if (!removed) {
        return res.status(404).json({ message: "Dropping point not found" });
      }

      res.status(200).json({
        message: "Dropping point deleted successfully"
      });
    } catch (error) {
      console.error("Error deleting dropping point:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new DroppingPointController();