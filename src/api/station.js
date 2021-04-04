import { sessionStore } from '../utils/utils.js';
import { SESSION_STORAGE_KEY, URL } from '../constants.js';

export const requestStationRegistration = async stationName => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/stations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ name: stationName }),
  });
  
  const { id, name } = await response.json();

  if (!response.ok) {
    throw new Error('역 등록 실패');
  }

  return { id, name };
};

export const requestStationList = async () => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/stations`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('역 조회 실패');
  }

  const list = await response.json();
  return list;
};

export const requestStationDelete = async stationId => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/stations/${stationId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('역 삭제 실패');
  }
};

export const requestStationUpdate = async (stationId, stationName) => {
  const accessToken = sessionStore.getItem(SESSION_STORAGE_KEY.ACCESS_TOKEN);
  if (!accessToken) return;
  const response = await fetch(`${URL.BASE_URL}/stations/${stationId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({ name: stationName }),
  });

  if (!response.ok) {
    throw new Error('역 수정 실패');
  }
}