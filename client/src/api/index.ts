const API_BASE_URL = 'http://localhost:5000/api'

const fetchWrapper = async (url: string, options: any) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const fetchAds = async () => {
  try {
    const response = await fetchWrapper(`${API_BASE_URL}/ads`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching ads:', error);
    throw error;
  }
};

export const fetchAdById = async (id: string) => {
  try {
    const response = await fetchWrapper(`${API_BASE_URL}/ads/${id}`, {
      method: 'GET',
    });
    return response;
  } catch (error) {
    console.error('Error fetching ad:', error);
    throw error;
  }
};

export const createAd = async (adData: any) => {
  console.log(adData);
  try {
    const response = await fetchWrapper(`${API_BASE_URL}/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adData),
    });
    return response;
  } catch (error) {
    console.error('Error creating ad:', error);
    throw error;
  }
};

export const updateAd = async (id: string, adData: any) => {
  console.log(adData, id)
  try {
    const response = await fetchWrapper(`${API_BASE_URL}/ads/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(adData),
    });
    return response;
  } catch (error) {
    console.error('Error updating ad:', error);
    throw error;
  }
};

export const deleteAd = async (id: string) => {
  try {
    const response = await fetchWrapper(`${API_BASE_URL}/ads/${id}`, {
      method: 'DELETE',
    });
    return response;
  } catch (error) {
    console.error('Error deleting ad:', error);
    throw error;
  }
};

export const getAllAds = async () => {
  const response = await fetchWrapper(`${API_BASE_URL}/ads`, {
    method: 'GET',
  });
  return response;
};

export const getAreas = async (input: string): Promise<any> => {
  const response = await fetchWrapper(`${API_BASE_URL}/autocomplete?input=${input}`, {
    method: 'GET',
  });
  return response;
};