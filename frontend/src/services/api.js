const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8000/api/v1' : 'https://wastechakra.onrender.com/api/v1');

export async function processWasteImage(file, source = 'UPLOAD') {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('source', source);

  const response = await fetch(`${API_BASE_URL}/pipeline/process/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to process waste image');
  }

  return response.json();
}

export async function simulateWaste(simParams) {
  const response = await fetch(`${API_BASE_URL}/pipeline/simulate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(simParams),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to execute manual simulation');
  }

  return response.json();
}

export async function getWasteRecords(params = {}) {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE_URL}/records/${query ? `?${query}` : ''}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch waste records');
  }
  return response.json();
}

export async function getStatsSummary() {
  const response = await fetch(`${API_BASE_URL}/stats/summary/`);
  if (!response.ok) {
    throw new Error('Failed to fetch dashboard stats');
  }
  return response.json();
}

export async function getDecisionConfig() {
  const response = await fetch(`${API_BASE_URL}/config/decision-rules/`);
  if (!response.ok) {
    throw new Error('Failed to fetch decision rules configuration');
  }
  return response.json();
}

export async function updateDecisionConfig(updatedFields) {
  const response = await fetch(`${API_BASE_URL}/config/decision-rules/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedFields),
  });
  if (!response.ok) {
    throw new Error('Failed to update decision rules configuration');
  }
  return response.json();
}
