import prisma from "../config/prisma.js";

export const generateCompatibility = async (tenantId, listingId) => {
  // Get tenant profile
  const profile = await prisma.tenantProfile.findUnique({
    where: {
      tenantId,
    },
  });

  if (!profile) {
    throw new Error("Tenant profile not found");
  }

  // Get listing
  const listing = await prisma.listing.findUnique({
    where: {
      id: listingId,
    },
  });

  if (!listing) {
    throw new Error("Listing not found");
  }

  let score = 0;
  const reasons = [];

  // City Match
  if (
    profile.preferredCity.toLowerCase() ===
    listing.city.toLowerCase()
  ) {
    score += 40;
    reasons.push("Preferred city matches.");
  }

  // State Match
  if (
    profile.preferredState.toLowerCase() ===
    listing.state.toLowerCase()
  ) {
    score += 20;
    reasons.push("Preferred state matches.");
  }

  // Budget Match
  if (
    listing.rent >= profile.budgetMin &&
    listing.rent <= profile.budgetMax
  ) {
    score += 30;
    reasons.push("Rent is within your budget.");
  }

  // Move-in Date
  if (listing.availableFrom <= profile.moveInDate) {
    score += 10;
    reasons.push("Move-in dates are compatible.");
  }

  const explanation =
    reasons.length > 0
      ? reasons.join(" ")
      : "Low compatibility.";

  const compatibility = await prisma.compatibility.upsert({
    where: {
      tenantId_listingId: {
        tenantId,
        listingId,
      },
    },
    update: {
      score,
      explanation,
      source: "FALLBACK",
    },
    create: {
      tenantId,
      listingId,
      score,
      explanation,
      source: "FALLBACK",
    },
  });

  return compatibility;
};