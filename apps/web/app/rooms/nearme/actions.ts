"use server";
import {
  NearbyRoom,
  RoomsResponse,
  MessagesResponse,
  MembersResponse,
} from "./types";

const API_URL = process.env.INTERNAL_API_URL;

export async function roomsNearMe(
  lat: number,
  lng: number,
  cookieHeader: string,
): Promise<{ rooms: NearbyRoom[]; message: string; success: boolean }> {
  try {
    console.log("g", API_URL);
    const res = await fetch(`${API_URL}/api/v1/rooms?lat=${lat}&lng=${lng}`, {
      method: "GET",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok)
      return { rooms: [], message: "Failed to fetch rooms", success: false };
    const data: RoomsResponse = await res.json();
    return data;
  } catch (e) {
    console.error(e);
    return { rooms: [], message: "Failed to fetch rooms", success: false };
  }
}

export async function joinRoom(roomId: string, cookieHeader: string) {
  try {
    console.log("jjjg", API_URL);
    const res = await fetch(`${API_URL}/api/v1/rooms/${roomId}/join`, {
      method: "POST",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) console.error("joinRoom failed:", res.status);
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function leaveRoom(roomId: string, cookieHeader: string) {
  try {
    await fetch(`${API_URL}/api/v1/rooms/${roomId}/leave`, {
      method: "DELETE",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
    });
  } catch (e) {
    console.error(e);
  }
}

export async function deleteRoom(roomId: string, cookieHeader: string) {
  try {
    await fetch(`${API_URL}/api/v1/rooms/${roomId}`, {
      method: "DELETE",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
    });
  } catch (e) {
    console.error(e);
  }
}

export async function removeRoomMembers(
  roomId: string,
  userIds: string[],
  cookieHeader: string,
) {
  try {
    const res = await fetch(`${API_URL}/api/v1/rooms/${roomId}/members`, {
      method: "DELETE",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ userIds }),
    });
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function getRoomMembers(
  roomId: string,
  cookieHeader: string,
): Promise<MembersResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/rooms/${roomId}/members`, {
      method: "GET",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
    });
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function makeRoomAdmins(
  roomId: string,
  userId: string,
  cookieHeader: string,
) {
  try {
    const res = await fetch(
      `${API_URL}/api/v1/rooms/${roomId}/members/${userId}/promote`,
      {
        method: "PATCH",
        headers: { cookie: cookieHeader, "Content-Type": "application/json" },
        cache: "no-store",
      },
    );
    return res.json();
  } catch (e) {
    console.error(e);
  }
}

export async function degradeAdmin(
  roomId: string,
  userId: string,
  cookieHeader: string,
) {
  try {
    await fetch(`${API_URL}/api/v1/rooms/${roomId}/admins/${userId}/degrade`, {
      method: "PATCH",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
    });
  } catch (e) {
    console.error(e);
  }
}

export async function displayMessages(
  roomId: string,
  cookieHeader: string,
): Promise<MessagesResponse | null> {
  try {
    const res = await fetch(`${API_URL}/api/v1/rooms/${roomId}/messages`, {
      method: "GET",
      headers: { cookie: cookieHeader, "Content-Type": "application/json" },
      cache: "no-store",
    });
    return res.json();
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function reportUser(
  userId: string,
  reason: string,
  cookieHeader: string,
) {
  try {
    const res = await fetch(`${API_URL}/api/v1/users/${userId}/report`, {
      method: "POST",
      headers: {
        cookie: cookieHeader,
        "Content-type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function reportRoom(
  roomId: string,
  reason: string,
  cookieHeader: string,
) {
  try {
    const res = await fetch(`${API_URL}/api/v1/users/${roomId}/report`, {
      method: "POST",
      headers: {
        cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      body: JSON.stringify({ reason }),
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function generateName(cookieHeader: string) {
  try {
    const res = await fetch(`${API_URL}/api/v1/users/name`, {
      method: "PATCH",
      headers: {
        cookie: cookieHeader,
        "Content-Type": "application/json",
      },
      cache: "no-cache",
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error("error in name generating");
  }
}
