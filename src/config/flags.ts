export type ConnectorFlags = {
  INSTAGRAM_ENABLE: boolean;
  TIKTOK_ENABLE: boolean;
  YOUTUBE_ENABLE: boolean;
  SPOTIFY_ENABLE: boolean;
  SNAPCHAT_ENABLE: boolean;
};

function readBool(envVar: string | undefined, defaultValue = false): boolean {
  if (envVar === undefined) return defaultValue;
  return envVar.toLowerCase() === 'true' || envVar === '1' || envVar.toLowerCase() === 'yes';
}

export const flags = {
  BRANDVIEW_MVP: readBool(process.env.REACT_APP_BRANDVIEW_MVP, false),
  CONNECTORS: {
    INSTAGRAM_ENABLE: readBool(process.env.REACT_APP_INSTAGRAM_ENABLE, true),
    TIKTOK_ENABLE: readBool(process.env.REACT_APP_TIKTOK_ENABLE, true),
    YOUTUBE_ENABLE: readBool(process.env.REACT_APP_YOUTUBE_ENABLE, true),
    SPOTIFY_ENABLE: readBool(process.env.REACT_APP_SPOTIFY_ENABLE, true),
    SNAPCHAT_ENABLE: readBool(process.env.REACT_APP_SNAPCHAT_ENABLE, false),
  } as ConnectorFlags,
  MOCK_MODE_DEFAULT: readBool(process.env.REACT_APP_BRANDVIEW_MOCK_MODE, true),
};

export const docs = {
  howToEnable: 'Set REACT_APP_BRANDVIEW_MVP=true in your environment to enable BrandView routes and UI.',
};
