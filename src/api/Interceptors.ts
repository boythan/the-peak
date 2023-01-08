export const APIKeyInterceptor = {
  addAPIKey: (config: any) => {
    const params = { ...(config?.params ?? {}), "api-key": "test" };
    return {
      ...config,
      params,
    };
  },
};

export const ShowFieldInterceptor = {
  addShowField: (config: any) => {
    const params = {
      "show-fields": "thumbnail,trailText",
      ...(config?.params ?? {}),
    };
    return {
      ...config,
      params,
    };
  },
};
