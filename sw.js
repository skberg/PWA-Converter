importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js");

if (workbox){
    console.log('yes! workbox is loding');
    workbox.precaching.precacheAndRoute([]);
    /* edit to other folders */
    /* configuering the sw-config.js file */

    workbox.routing.registerRoute(
        /(.*)others(.*)\.(?:png|gif|jpg)/,
        new workbox.strategies.CacheFirst({
            cacheName: 'images',
            plugins:[
                new workbox.expiration.Plugin({
                    maxEntries: 50,
                    maxAgeSeconds: 30 * 24 * 60 * 60, //30 Days
                })
            ]
        })
    );

/* geting the js and the Css  */

workbox.routing.registerRoute(
//cahing the css or pr-porsseied css
    /.*\.(?:css|js|scss|)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName:'assets',
    })

);


workbox.routing.registerRoute(
    new RegExp("https://fonts.(?:googleapis|gstatic).com/(.*)"),
    new workbox.strategies.CacheFirst({
        cacheName: "google-fonts",
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
        ],
    })
);
workbox.googleAnalytics.initialize()

workbox.core.skipWaiting();
workbox.core.clientsClaim();






}else{
    console.log('Oops! Workbox is not working')
}