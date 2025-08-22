
// og
async function injectHeader() {
  const header = document.getElementById("header");
  if (header) {
    try {
      const res = await fetch("components/header.html");
      const html = await res.text();
      header.innerHTML = html; // Question: what does all of that mean
    } catch (err) {
      console.error("Failed to load header:", err);
    }
  }
}

// my fuck ass version
async function inject(...elements) {
  elements.forEach(async element => {
    const el = document.getElementById(element)
    if (el) {
      try {
        const res = await fetch(`components/${element}.html`);
        const html = await res.text();
        el.innerHTML = html; // Question: what does all of that mean
      } catch (err) {
        console.error(`Failed to load ${element}:`, err);
      }
  } else {
    console.error(`[inject] Missing element #${id}`);
  }
  });
}

// with promise all If you want them to all load in parallel instead
//  of one-by-one, you could replace .forEach with Promise.all(...)
//  — that way if you have 10 components, the browser requests all 
// of them at the same time instead of waiting.

async function injectPromiseAll(...elements) {
  await Promise.all(
    elements.map(async element => {
      const el = document.getElementById(element);
      if (!el) return;

      try {
        const res = await fetch(`components/${element}.html`);
        el.innerHTML = await res.text();
      } catch (err) {
        console.error(`Failed to inject ${element}:`, err);
      }
    })
  );
}

// chat's version
// function inject(...ids) {
//   ids.forEach(async id => {
//     const el = document.getElementById(id);
//     if (el) {
//       try {
//         const res = await fetch(`/components/${id}.html`);
//         if (!res.ok) throw new Error(`Failed to fetch ${id}: ${res.status}`);
//         el.innerHTML = await res.text();
//       } catch (err) {
//         console.error(`Failed to inject ${id}:`, err);
//       }
//     }
//   });
// }

// // Usage:
// inject("header");                 // injects header.html into #header
// inject("header", "footer");       // injects header.html and footer.html
// inject("navbar", "sidebar", "ad"); // as many as you want

// document.addEventListener("DOMContentLoaded", injectHeader); // Question: what does this mean?

document.addEventListener("DOMContentLoaded", () => inject("header","footer"))