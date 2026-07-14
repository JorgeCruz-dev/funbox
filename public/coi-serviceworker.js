/*! coi-serviceworker v0.1.7 | MIT License | https://github.com/gzguidoti/coi-serviceworker */
if (typeof window === 'undefined') {
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.addEventListener("message", (ev) => {
        if (ev.data && ev.data.type === "deregister") {
            self.registration.unregister()
                .then(() => self.clients.matchAll())
                .then((clients) => {
                    clients.forEach((client) => client.navigate(client.url));
                });
        }
    });

    self.addEventListener("fetch", (event) => {
        const r = event.request;
        if (r.cache === "only-if-cached" && r.mode !== "same-origin") {
            return;
        }

        event.respondWith(
            fetch(r)
                .then((response) => {
                    if (response.status === 0) {
                        return response;
                    }

                    const newHeaders = new Headers(response.headers);
                    newHeaders.set("Cross-Origin-Embedder-Policy", "require-corp");
                    newHeaders.set("Cross-Origin-Opener-Policy", "same-origin");

                    return new Response(response.body, {
                        status: response.status,
                        statusText: response.statusText,
                        headers: newHeaders,
                    });
                })
                .catch((e) => console.error(e))
        );
    });
} else {
    (() => {
        const script = document.currentScript;
        const src = script ? script.src : "coi-serviceworker.js";
        
        let path = src;
        if (src.indexOf("://") !== -1) {
            const url = new URL(src);
            path = url.pathname;
        }
        
        if (path.indexOf("?") !== -1) {
            path = path.substring(0, path.indexOf("?"));
        }

        if (window.crossOriginIsolated === false) {
            navigator.serviceWorker.register(path)
                .then((registration) => {
                    console.log("coi-serviceworker: Registration succeeded", registration);

                    registration.addEventListener("updatefound", () => {
                        registration.installing.addEventListener("statechange", (ev) => {
                            if (ev.target.state === "activated") {
                                window.location.reload();
                            }
                        });
                    });

                    if (registration.active) {
                        window.location.reload();
                    }
                })
                .catch((err) => {
                    console.error("coi-serviceworker: Registration failed", err);
                });
        }
    })();
}
