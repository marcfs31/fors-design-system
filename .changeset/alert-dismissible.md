---
"@marcfs31/fors-design-system": minor
---

`Alert` accepts `onDismiss` and `dismissLabel`, rendering a close button for banners the user can clear. The alert stays controlled — it never hides itself, so the consumer owns the visibility state. The close button meets the 24px touch-target minimum, takes focus from the keyboard, and inherits the variant's colour; the glyph is inline SVG, so the component bundle still carries no dependency on the icons entry. Alerts without `onDismiss` render exactly the markup they did before.
