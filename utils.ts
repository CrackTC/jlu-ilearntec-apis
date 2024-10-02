import { DOMParser } from "jsr:@b-fuze/deno-dom";

const parser = new DOMParser();

export const getCookie = (resp: Promise<Response>, key: string) =>
    getHeaders(resp).then((h) =>
        h.getSetCookie()!.map((cookie) => cookie.split(";")[0])
            .filter((cookie) => cookie.includes(key))[0].split("=")[1]
    );

export const getElemValue = (resp: Promise<Response>, selector: string) =>
    getText(resp).then((html) =>
        parser.parseFromString(html, "text/html").querySelector(selector)!
            .getAttribute("value")!
    );

export const getJsonp = (resp: Promise<Response>) =>
    getText(resp).then((t) => t.match(/(?<=\().*(?=\))/)![0]).then(JSON.parse);

const getText = (resp: Promise<Response>) =>
    resp.then((res) => res.clone().text());

export const getRedirect = (resp: Promise<Response>) =>
    getHeaders(resp).then((h) => h.get("location")!);

const getHeaders = (resp: Promise<Response>) => resp.then((res) => res.headers);

export const get = (
    url: string,
    cookie: Record<string, string> = {},
) => fetch(url, {
    headers: {
        "Cookie": Object.entries(cookie).map(([key, value]) =>
            `${key}=${value}`
        ).join("; "),
    },
    redirect: "manual",
});

export const post = (
    url: string,
    body: Record<string, string>,
    cookie: Record<string, string> = {},
) => fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": Object.entries(cookie).map(([key, value]) =>
            `${key}=${value}`
        ).join("; "),
    },
    redirect: "manual",
    body: Object.entries(body).map(([key, value]) => `${key}=${value}`).join(
        "&",
    ),
});
