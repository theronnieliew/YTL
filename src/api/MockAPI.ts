const BASE_URL = 'https://run.mocky.io/v3';

export class MockAPI {
  fetchTransactionData = async () => {
    const response = await fetch(
      `${BASE_URL}/4597de99-fa3f-46a7-bff8-df1cfe25a6e8`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch transaction data');
    }
    return response.json();
  };
}
