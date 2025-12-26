<!-- 🔄 UPDATE ME: When files or subfolders in this folder change, update this document. -->

# bento/widgets

> **Specific card type implementations. Each Widget corresponds to a social platform or content type.**
> Extensible Widget registry pattern, adding new platforms only requires creating a new subfolder.

## Files

| File | Role | Purpose |
|------|------|---------|
| `index.tsx` | Entry | WidgetRenderer dynamic renderer |
| `types.ts` | Types | Widget common types (WidgetConfig, WidgetSize) |
| `registry.ts` | Registry | Platform registry (icons, colors, CTA detection) |
| `icons.tsx` | Icons | Generic icon components |

## Widget Subfolders

| Folder | Platform | Key Component |
|--------|----------|---------------|
| `link/` | Generic link | LinkWidget |
| `text/` | Text card | TextWidget |
| `image/` | Image card | ImageWidget |
| `map/` | Map card | MapWidget |
| `github/` | GitHub | GitHubWidget |
| `spotify/` | Spotify | SpotifyWidget |
| `section/` | Section title | SectionWidget |
