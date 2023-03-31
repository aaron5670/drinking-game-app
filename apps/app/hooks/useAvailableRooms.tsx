import {useEffect, useState} from "react";
import * as Colyseus from "colyseus.js/dist/colyseus";

const useAvailableRooms = (client) => {
  const [allRooms, setAllRooms] = useState<Colyseus.RoomAvailable[]>([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const rooms = await client.getAvailableRooms("game_room");
        setAllRooms(rooms);
      } catch (err) {
        console.log("Error getting rooms", err);
      }
    };

    // initial fetch
    fetchRooms();

    // fetch every 500ms
    const timer = setInterval(fetchRooms, 500);

    // cleanup
    return () => {
      clearInterval(timer);
    };
  }, []);

  return allRooms;
}

export default useAvailableRooms;
