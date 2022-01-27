from collections import defaultdict
import datetime as dt

from aiohttp import web
import aiohttp_cors
import requests

db = defaultdict(lambda: defaultdict(dict))
hook = ""
emojis = {
    "absent": "⬛",
    "present": "🟨",
    "correct": "🟩",
}


async def status(request: web.BaseRequest) -> web.Response:
    return web.json_response({"status": "OK"})


async def score(request: web.BaseRequest) -> web.Response:
    body = await request.json()

    username = body["username"]
    row_guess = body["rowGuess"]
    evaluations = body["evaluations"]

    today = dt.datetime.utcnow().strftime("%Y-%m-%d")

    if row_guess not in db[username][today]:
        db[username][today][row_guess] = evaluations
        row = "".join(emojis[e] for e in evaluations)
        print(f"Set {row_guess=} to {evaluations=}")
        requests.post(
            hook,
            json={
                "text": f"{username} guessed row {row_guess}: {row}",
            },
        )

    return web.Response()


async def get_app(argv: list[str] = None) -> web.Application:
    app = web.Application()

    cors = aiohttp_cors.setup(
        app,
        defaults={
            "https://www.powerlanguage.co.uk": aiohttp_cors.ResourceOptions(
                allow_credentials=True,
                expose_headers="*",
                allow_headers="*",
            )
        },
    )

    # Add all resources to `CorsConfig`.
    resource = cors.add(app.router.add_resource("/score"))
    cors.add(resource.add_route("POST", score))

    return app
