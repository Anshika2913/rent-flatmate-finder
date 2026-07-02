import { createListing, getAllListings} from "../services/listing.service.js";

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

import {getListingById} from "../services/listing.service.js";

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