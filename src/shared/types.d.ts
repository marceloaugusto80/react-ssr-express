declare module "*.jpg";
declare module "*.png";
declare module "*.gif";
declare module "*.svg";

// Variables here are injected via webpack's DefinePlugin.

/** Indicates we are in a server (node) environment. */
declare const __SERVER__ : boolean;

/** Indicates we are in a production build */
declare const __PRODUCTION__ : boolean;
