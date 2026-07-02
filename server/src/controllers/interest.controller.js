import { sendInterest, getReceivedInterests, findInterestById,
  updateInterestStatus, createConversation } from "../services/interest.service.js";

export const create = async (req, res) => {
  try {

    const interest = await sendInterest(
      req.user.id,
      req.params.listingId
    );

    return res.status(201).json({
      success: true,
      message: "Interest sent successfully",
      data: interest,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message,
    });

  }
};

export const getReceived = async (req, res) => {
  try {
    const interests = await getReceivedInterests(req.user.id);

    return res.status(200).json({
      success: true,
      count: interests.length,
      data: interests,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changeStatus = async (req, res, status) => {
  try {
    const interest = await findInterestById(req.params.id);

    if (!interest) {
      return res.status(404).json({
        success: false,
        message: "Interest not found",
      });
    }

    if (interest.listing.ownerId !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    if (interest.status !== "PENDING") {
      return res.status(400).json({
        success: false,
        message: "Interest has already been processed",
      });
    }

    const updated = await updateInterestStatus(req.params.id, status);

    if (status === "ACCEPTED") {
      await createConversation(req.params.id);
    }

    return res.status(200).json({
      success: true,
      message: `Interest ${status.toLowerCase()} successfully`,
      data: updated,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const accept = (req, res) =>
  changeStatus(req, res, "ACCEPTED");

export const decline = (req, res) =>
  changeStatus(req, res, "DECLINED");