/**
 * Renders a certificate end to end and asserts the result is a real PDF.
 *
 * This is the check that matters for this package: the document is only ever
 * exercised through @react-pdf/renderer, so a renderer upgrade that breaks a
 * primitive shows up here and nowhere else.
 *
 * Fonts are fetched over the network by the renderer, so this needs internet.
 */

import assert from "node:assert/strict";

import { Font, renderToBuffer } from "@react-pdf/renderer";
import React from "react";

import { CertificateDocument, getFonts } from "../dist/index.mjs";

const PIXEL_PNG =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

for (const font of getFonts()) {
    Font.register(font);
}

const props = {
    title: "Smoke Test Item",
    traits: [
        { trait_type: "Colour", value: "Black" },
        { trait_type: "Material", value: "Leather" },
    ],
    draft: false,
    creationDate: "January 1st 2024, 01:00:00",
    blockchainName: "Polygon Mainnet",
    collectionName: "Smoke Collection",
    certificateType: "NFT ERC-721",
    collectionAddress: "0x0000000000000000000000000000000000000001",
    tokenId: "0x2a",
    metadataHash: "QmSmokeTest0000000000000000000000000000000000",
    certifierName: "Test Certifier",
    certifierAffiliation: "Test Co",
    certifierAddress: "0x0000000000000000000000000000000000000002",
    currentTimestamp: "January 2nd 2024, 02:00:00",
    imageUrl: PIXEL_PNG,
    itemUri: "https://item.ownerchip.com/0x2a",
    itemQrCode: PIXEL_PNG,
    blockchainExplorerUrl: "https://polygonscan.com/token/0x1",
    blockchainQrCode: PIXEL_PNG,
    certificateBg: { src: PIXEL_PNG },
    description: "A certificate rendered by the smoke test.",
};

const buffer = await renderToBuffer(React.createElement(CertificateDocument, props));

assert.ok(buffer.length > 1000, `PDF is suspiciously small: ${buffer.length} bytes`);
assert.equal(buffer.subarray(0, 5).toString("latin1"), "%PDF-", "output is not a PDF");

console.log(`ok - rendered a ${buffer.length} byte PDF`);

// The draft variant takes a different layout path.
const draft = await renderToBuffer(
    React.createElement(CertificateDocument, { ...props, draft: true }),
);
assert.equal(draft.subarray(0, 5).toString("latin1"), "%PDF-", "draft output is not a PDF");

console.log(`ok - rendered a ${draft.length} byte draft PDF`);
