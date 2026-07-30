# oc-certificate

The PDF certificate-of-authenticity document for OwnerChip items, as a
`@react-pdf/renderer` component.

```tsx
import { Font, PDFViewer } from '@react-pdf/renderer';
import { CertificateDocument, getFonts } from 'oc-certificate';

for (const font of getFonts()) {
  Font.register(font);
}

<PDFViewer>
  <CertificateDocument title="…" traits={[]} draft={false} /* … */ />
</PDFViewer>
```

## Consuming it

`@react-pdf/renderer` and `react` are **peer** dependencies. The consuming app
owns the renderer instance: if this package pulled in its own copy, it would get
a second font registry and fonts registered by the app would not apply to the
document.

Installing from a git URL works because `prepare` builds `dist/` on install.

## Development

```bash
npm install
npm run build      # tsup -> dist/ (ESM + CJS + .d.ts)
npm run typecheck  # tsc --noEmit
npm test           # build, then render a real PDF and assert it is valid
```

`npm test` renders both the normal and draft layouts through
`@react-pdf/renderer` and checks the output is a PDF. That is the check that
matters here — the document is only ever exercised through the renderer, so a
renderer upgrade that breaks a primitive shows up there and nowhere else. It
fetches the Ubuntu webfonts, so it needs internet access.
