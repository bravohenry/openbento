<div align="center">

# 🍱 OpenBento

**The Open-Source Legacy of Bento Design**

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[**Explore Showcase**](https://github.com) • [**Documentation**](./docs) • [**View in 中文**](./README.zh.md)

</div>

---

## � Documentation Mandate

> **⚠️ CRITICAL: Any change to functionality, architecture, or implementation patterns MUST be followed by updating the relevant `ARCHITECTURE.md` in affected directories.**

This project uses a **fractal, self-referential documentation system** inspired by *Gödel, Escher, Bach*:

- **Every folder** contains an `ARCHITECTURE.md` describing its contents
- **Every file** contains header comments declaring `@input` / `@output` / `@pos`
- **Changes propagate upward**: file → folder → module → root

*Local affects global, global affects local.*

> 📖 **Detailed Documentation**: See [FRACTAL_DOCS.md](./FRACTAL_DOCS.md) for the complete fractal documentation system specification.

---

## �📖 The Story

> **"Preserving the aesthetic that Linktree sunsetted."**

OpenBento was born as a community response to the acquisition and sunset of **bento.me**. We believe the Bento design philosophy—modular, elegant, and personal—belongs to the open-source community. 

This project is a faithful recreation of that experience, built with modern web technologies for developers who want to own their corner of the internet.

---

## ✨ Design Philosophy

<table width="100%">
  <tr>
    <td width="50%" valign="top">
      <h3>🌸 Modularity</h3>
      <p>Each card is a self-contained universe. Like a traditional bento box, components are independent yet perfectly cohesive when combined.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🎯 Simplicity</h3>
      <p>High information density without the noise. We follow the <b>"Less is More"</b> principle, ensuring every pixel serves a purpose.</p>
    </td>
  </tr>
  <tr>
    <td width="50%" valign="top">
      <h3>🔄 Flexibility</h3>
      <p>From 1x1 to 2x2, our grid adapts to your content. Fully drag-and-drop enabled for ultimate creative freedom.</p>
    </td>
    <td width="50%" valign="top">
      <h3>🎭 Elegance</h3>
      <p>Signature 27px rounded corners, double-border highlights, and Inter-driven typography for that premium feel.</p>
    </td>
  </tr>
</table>

---

## 🚀 Quick Start

Get your Bento page up and running in seconds:

```bash
npm install && npm run dev
```

---

## 🏗️ Core Architecture

- **BentoCard** — The atomic unit of your layout. Supports 1x1, 1x2, 2x1, and 2x2 dimensions with a clean Compound Component pattern.
- **BentoGrid** — A robust CSS Grid implementation that handles complex layouts and responsive breakpoints automatically.
- **Drag & Drop** — Built-in interactive layout engine for effortless personalization.

---

## 🛠️ Tech Stack

<div align="center">

| Framework | UI Logic | Styling | Animation |
| :---: | :---: | :---: | :---: |
| **Next.js 16** | **React 19** | **Tailwind 4** | **Framer Motion** |

</div>

---

## 🌟 Why OpenBento?

- ✅ **Self-Hosted** — You own your data. No Linktree account required.
- ✅ **SEO Optimized** — Semantic HTML and fast loading for better ranking.
- ✅ **Legacy Preservation** — A replacement for bento.me that can't be sunsetted.
- ✅ **Premium Aesthetic** — Precise recreation of the beloved modular UI.

---

<div align="center">

**Made with ❤️ for the Bento community**

[GitHub](https://github.com) • [Showcase](./src/app/showcase) • [Twitter](https://twitter.com)

</div>
