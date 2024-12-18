// import

// // export const ovHelper = {
// //      /**
// //      * Adds platforms to all stations
// //      * @param {Database} db - SQLite database connection
// //      * @param {number} platformsPerStation - Number of platforms to add per station
// //      * @returns {Promise<void>}
// //      */
// //      addPlatformsToAllStations: async (
// //         platformsPerStation: number = 6
// //     ): Promise<void> => {
// //     try {
// //         const stations = await getAllStations();
        
// //         for (const station of stations) {
// //             for (let i = 1; i <= platformsPerStation; i++) {
// //                 await ovRepository.addPlatformToStation(
// //                     db,
// //                     station.id,
// //                     `Perron ${i}`
// //                 );
// //             }
// //         }
// //     } catch (error) {
// //         console.error('Error adding platforms to stations:', error);
// //         throw error;
// //     }
// }