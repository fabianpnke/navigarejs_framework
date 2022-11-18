# How it works

With Navigare you build apps just like you've always done with your server-side web framework of choice. You use your framework's existing functionality for routing, controllers, middleware, authentication, authorization, data fetching, and more.

The only thing that's different is your view layer. Instead of using server-side rendering (eg. Blade or ERB templates), the views are JavaScript page components. This allows you to build your entire front-end using Vue (and React or Svelte in the future).

But simply creating your front-end in JavaScript doesn't give you a single-page app experience. If you were to click a link, your browser would make a full page visit, which would then cause your client-side framework to reboot on the subsequent page load. This is where Navigare comes in.

At its core Navigare is essentially a client-side routing library. It allows you to make page visits without forcing a full page reload. This is done using the `<Link>` component, a light wrapper around a normal anchor link. When you click an Navigare link, Navigare intercepts the click and makes the visit via XHR instead. Worth noting, you can also make these visits programmatically in JavaScript using `router.visit()`.

When Navigare makes an XHR visit, the server detects that it's an Navigare visit, and instead of returning a full HTML response, it returns a JSON response with the JavaScript page component name and properties. Navigare then dynamically swaps out the previous page component with the new page component, and updates the history state.

**The end result is a silky smooth single-page experience. 🎉**
