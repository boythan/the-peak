export const APIKeyInterceptor = {
  addAPIKey: (config: any) => {
    const params = { ...(config?.params ?? {}), "api-key": "test" };
    return {
      ...config,
      params,
    };
  },
};
