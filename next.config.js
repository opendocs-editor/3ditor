const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
let nextConfig = {
    reactStrictMode: true,
    distDir: "dist",
};

if (fs.existsSync(path.join(__dirname, ".env"))) {
    const buf = fs.readFileSync(path.join(__dirname, ".env"));
    const parsed = dotenv.parse(buf);
    nextConfig.env = parsed;
}

module.exports = Object.assign(
    withPWA(
        Object.assign(nextConfig, {
            pwa: {
                dest: "public",
                disable: false,
                register: true,
                scope: "/",
                sw: "sw.js",
                reloadOnOnline: true,
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
                        handler: "CacheFirst",
                        options: {
                            cacheName: "google-fonts-webfonts",
                            expiration: {
                                maxEntries: 4,
                                maxAgeSeconds: 365 * 24 * 60 * 60, // 365 days
                            },
                        },
                    },
                    {
                        urlPattern:
                            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "google-fonts-stylesheets",
                            expiration: {
                                maxEntries: 4,
                                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                            },
                        },
                    },
                    {
                        urlPattern:
                            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "static-font-assets",
                            expiration: {
                                maxEntries: 4,
                                maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "static-image-assets",
                            expiration: {
                                maxEntries: 64,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /\/_next\/image\?url=.+$/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "next-image",
                            expiration: {
                                maxEntries: 64,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:mp3|wav|ogg)$/i,
                        handler: "CacheFirst",
                        options: {
                            rangeRequests: true,
                            cacheName: "static-audio-assets",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:mp4)$/i,
                        handler: "CacheFirst",
                        options: {
                            rangeRequests: true,
                            cacheName: "static-video-assets",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:js)$/gim,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "static-js-assets",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:css|less)$/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "static-style-assets",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /\/_next\/data\/.+\/.+\.json$/i,
                        handler: "StaleWhileRevalidate",
                        options: {
                            cacheName: "next-data",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: /\.(?:json|xml|csv)$/i,
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "static-data-assets",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                        },
                    },
                    {
                        urlPattern: ({ url }) => {
                            const isSameOrigin = self.origin === url.origin;
                            if (!isSameOrigin) return false;
                            const pathname = url.pathname;
                            if (pathname.startsWith("/api/auth/")) return false;
                            if (pathname.startsWith("/api/")) return true;
                            return false;
                        },
                        handler: "NetworkFirst",
                        method: "GET",
                        options: {
                            cacheName: "apis",
                            expiration: {
                                maxEntries: 16,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                            networkTimeoutSeconds: 10,
                        },
                    },
                    {
                        urlPattern: ({ url }) => {
                            const isSameOrigin = self.origin === url.origin;
                            if (!isSameOrigin) return false;
                            const pathname = url.pathname;
                            if (pathname.startsWith("/api/")) return false;
                            return true;
                        },
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "others",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 24 * 60 * 60,
                            },
                            networkTimeoutSeconds: 10,
                        },
                    },
                    {
                        urlPattern: ({ url }) => {
                            const isSameOrigin = self.origin === url.origin;
                            return !isSameOrigin;
                        },
                        handler: "NetworkFirst",
                        options: {
                            cacheName: "cross-origin",
                            expiration: {
                                maxEntries: 32,
                                maxAgeSeconds: 60 * 60,
                            },
                            networkTimeoutSeconds: 10,
                        },
                    },
                ],
            },
        })
    ),
    {}
);
