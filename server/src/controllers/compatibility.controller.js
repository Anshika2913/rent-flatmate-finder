import { generateCompatibility } from "../services/compatibility.service.js";

export const generate = async (req, res) => {
  try {
    const compatibility = await generateCompatibility(
      req.user.id,
      req.params.listingId
    );

    return res.status(200).json({
      success: true,
      message: "Compatibility generated successfully",
      data: compatibility,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};