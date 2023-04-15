import getConfig from "next/config";

export function fixUrl(filename: string): string {
  const { publicRuntimeConfig } = getConfig() as {
    publicRuntimeConfig: { urlPrefix: string };
  };
  return publicRuntimeConfig.urlPrefix + filename;
}
