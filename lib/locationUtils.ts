// Radius of the Earth in km
const R = 6371;

/**
 * Calculates the distance between two latitude/longitude points in kilometers using the Haversine formula.
 */

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {

  console.log(lat1, lon1, lat2, lon2)
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

/**
 * Derives a rough estimated time of arrival (in minutes) based on distance.
 * Assumes an average travel speed through rural/sub-rural paths (e.g., 30 km/h).
 * 30 km/h = 0.5 km/min.
 */
export function calculateEstimatedTime(distanceKm: number, averageSpeedKmh: number = 30): number {
  const hours = distanceKm / averageSpeedKmh;
  const minutes = Math.round(hours * 60);
  // Ensure at least 1 min
  return Math.max(1, minutes);
}

/**
 * Returns a formatted string bridging distance and time (e.g., "2.3 km • ~5 min away")
 */
export function formatDistanceAndTime(distanceKm: number): string {
  if (distanceKm < 0.1) {
    return `Less than 100m • ~1 min away`;
  }

  const time = calculateEstimatedTime(distanceKm);
  const roundedKm = distanceKm.toFixed(1);

  if (time >= 60) {
    const hrs = Math.floor(time / 60);
    const mins = time % 60;
    return `${roundedKm} km • ~${hrs} hr ${mins} min away`;
  }

  return `${roundedKm} km • ~${time} min away`;
}
