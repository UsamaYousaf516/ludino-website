# -*- coding: utf-8 -*-
"""Local static server for the Ludino site.

Reads the port from the PORT environment variable so the harness can assign a
free one, falling back to 5173. `python -m http.server` only takes the port as
a CLI argument, which would hardcode it.

    python serve.py
    PORT=8080 python serve.py
"""
import http.server
import os

HERE = os.path.dirname(os.path.abspath(__file__))
PORT = int(os.environ.get("PORT") or 5173)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=HERE, **kw)

    def end_headers(self):
        # never cache during local development
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    # ThreadingHTTPServer, not socketserver.TCPServer: a browser opens several
    # keep-alive connections at once for the CSS, JS and images, and a
    # single-threaded server deadlocks holding the first one open.
    http.server.ThreadingHTTPServer.allow_reuse_address = True
    with http.server.ThreadingHTTPServer(("", PORT), Handler) as httpd:
        print("Ludino site -> http://localhost:%d/" % PORT, flush=True)
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass
