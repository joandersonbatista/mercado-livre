export const mockFetch = <T>(mockResponse: { ok: boolean; data: T }) => {
  jest.spyOn(global, 'fetch').mockResolvedValueOnce(
    Promise.resolve({
      ok: mockResponse.ok,
      json: () => Promise.resolve(mockResponse.data),
    } as Response),
  );
};
