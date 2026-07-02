import { createListing, getAllListings,  getListingById, updateListing, findListingById, markListingFilled} from "../services/listing.service.js";

export const create = async (req, res) => {
  try {
    const listing = await createListing(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Listing created successfully",
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getAll = async (req, res) => {
  try {
    const listings = await getAllListings(req.query);

    return res.status(200).json({
      success: true,
      count: listings.length,
      data: listings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const listing = await getListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const listing = await findListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    // Ownership check
    if (listing.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this listing",
      });
    }

    const updatedListing = await updateListing(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Listing updated successfully",
      data: updatedListing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markFilled = async (req, res) => {
  try {
    const listing = await findListingById(req.params.id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    if (listing.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to modify this listing",
      });
    }

    const updatedListing = await markListingFilled(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Listing marked as filled",
      data: updatedListing,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};